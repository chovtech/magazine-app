// wpApi.js
import { savePosts } from "./db";
import { encode as btoa } from "base-64"; // ✅ use base-64 for React Native

const BASE_URL = "https://contemporaryworld.ipcr.gov.ng/wp-json/wp/v2";

// 🔑 Basic Auth credentials (replace with env vars for security)
const USERNAME = "ipcrcontemporaryadmin";
const PASSWORD = "SRsd 35pE aQIA yNvZ cz5f aOQJ";

// Encode username:password → base64
const AUTH_HEADER = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

/**
 * Fetch from WP REST API using Basic Auth
 */
async function fetchFromApi(endpoint) {
  try {
    console.log("➡️ Fetching:", endpoint);

    const response = await fetch(endpoint, {
      headers: {
        Authorization: AUTH_HEADER,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "ReactNativeApp/1.0",
      },
    });

    console.log("⬅️ Status:", response.status, response.url);

    const rawText = await response.clone().text();

    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    return JSON.parse(rawText);
  } catch (error) {
    console.error("fetchFromApi error:", error);
    return [];
  }
}

/**
 * Normalize post object from WP
 */
function normalizePost(post) {
  return {
    id: post.id,
    title: post.title?.rendered || "",
    slug: post.slug,
    excerpt: post.excerpt?.rendered || "",
    content: post.content?.rendered || "",
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name ?? "Uncategorized",
    author: post._embedded?.author?.[0]?.name ?? "Unknown",
    authorImage: post._embedded?.author?.[0]?.avatar_urls?.["48"] ?? null,
    date: post.date,
    modified: post.modified,
    views: post.views ?? post.meta?.views ?? 0,
  };
}

/**
 * Fetch latest posts from WP
 */
export async function fetchPosts(limit = 10) {
  const raw = await fetchFromApi(
    `${BASE_URL}/posts?per_page=${limit}&_embed&orderby=date&order=desc`
  );
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizePost);
}

/**
 * Fetch posts, save to SQLite, return count
 */
export async function syncPosts(limit = 10) {
  try {
    const posts = await fetchPosts(limit);
    if (posts.length > 0) {
      await savePosts(posts);
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
 * Background refresh helper
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
 * Fetch single post by ID
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
