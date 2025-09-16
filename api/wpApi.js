// wpApi.js
import { savePosts } from "./db";
import { encode as btoa } from "base-64"; // only needed if you enable Basic Auth

const BASE_URL = "https://contemporaryworld.ipcr.gov.ng/wp-json/wp/v2";

// If your WP endpoint requires Basic Auth, uncomment and set these values.
const USERNAME = "ipcrcontemporaryadmin";
const PASSWORD = "SRsd 35pE aQIA yNvZ cz5f aOQJ";
const AUTH_HEADER = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

async function fetchFromApi(endpoint) {
  try {
    // If you need auth, uncomment the headers object below:
    // const response = await fetch(endpoint, { headers: { Authorization: AUTH_HEADER } });
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("fetchFromApi error:", error);
    return []; // keep callers safe by returning an empty array on failure
  }
}

function normalizePost(post) {
  return {
    id: post.id,
    title: post.title?.rendered || "",
    slug: post.slug,
    excerpt: post.excerpt?.rendered || "",
    content: post.content?.rendered || "",
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    category:
      post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    author: post._embedded?.author?.[0]?.name ?? "Unknown",
    authorImage:
      post._embedded?.author?.[0]?.avatar_urls?.["48"] ?? null,
    date: post.date,
    modified: post.modified,
    views: post.views ?? post.meta?.views ?? 0,
  };
}

/**
 * Fetch latest posts from WP and return normalized posts (array).
 * Does NOT write to DB — use syncPosts to save.
 */
export async function fetchPosts(limit = 10) {
  const raw = await fetchFromApi(
    `${BASE_URL}/posts?per_page=${limit}&_embed&orderby=date&order=desc`
  );
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizePost);
}

/**
 * Fetch posts from WP, normalize them, save into SQLite (awaits savePosts),
 * and returns the number of posts synced.
 */
export async function syncPosts(limit = 10) {
  try {
    const posts = await fetchPosts(limit);
    if (posts.length > 0) {
      await savePosts(posts); // <-- important: await so callers know DB is updated
      console.log(`✅ Synced ${posts.length} posts into SQLite`);
      return posts.length;
    }
    return 0;
  } catch (err) {
    console.error("syncPosts error:", err);
    return 0;
  }
}

/**
 * Background refresh helper used by screens. Returns number of posts synced.
 */
export async function refreshPostsInBackground(limit = 10) {
  try {
    return await syncPosts(limit);
  } catch (err) {
    console.error("refreshPostsInBackground error:", err);
    return 0;
  }
}

/**
 * Optional: fetch a single post (normalized)
 */
export async function fetchSinglePost(id) {
  try {
    const raw = await fetchFromApi(`${BASE_URL}/posts/${id}?_embed`);
    if (!raw) return null;
    return normalizePost(raw);
  } catch (err) {
    console.error("fetchSinglePost error:", err);
    return null;
  }
}
