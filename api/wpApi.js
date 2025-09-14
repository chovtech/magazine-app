import { encode as btoa } from 'base-64';

const BASE_URL = "https://contemporaryworld.ipcr.gov.ng/wp-json/wp/v2";

// 🔑 Credentials
const USERNAME = "ipcrcontemporaryadmin";
const PASSWORD = "SRsd 35pE aQIA yNvZ cz5f aOQJ";
const AUTH_HEADER = "Basic " + btoa(`${USERNAME}:${PASSWORD}`);

async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(endpoint, {
      headers: { Authorization: AUTH_HEADER },
    });
    if (!response.ok) {
      throw new Error(`Failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}

export async function fetchPosts(limit = 10) {
  return fetchFromApi(`${BASE_URL}/posts?_embed&per_page=${limit}`);
}

export async function fetchSinglePost(id) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${id}?_embed`, {
      headers: { Authorization: AUTH_HEADER },
    });
    if (!response.ok) throw new Error(`Failed to fetch post ${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}

// 🔥 Trending = most viewed
export async function fetchTrendingPosts(limit = 5) {
  return fetchFromApi(
    `${BASE_URL}/posts?_embed&per_page=${limit}&orderby=views&order=desc`
  );
}

// 🔥 Latest = newest posts
export async function fetchLatestPosts(limit = 5) {
  return fetchFromApi(
    `${BASE_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
  );
}
