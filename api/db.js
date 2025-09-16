import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("magazine.db");

// Initialize DB + Tables
export async function initDB() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT,
        slug TEXT,
        excerpt TEXT,
        image TEXT,
        category TEXT,
        author TEXT,
        authorImage TEXT,
        date TEXT,
        modified TEXT,
        content TEXT,
        views INTEGER DEFAULT 0
      );

      CREATE INDEX IF NOT EXISTS idx_posts_date ON posts (date DESC);
      CREATE INDEX IF NOT EXISTS idx_posts_modified ON posts (modified DESC);
      CREATE INDEX IF NOT EXISTS idx_posts_views ON posts (views DESC);
    `);
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("DB init error:", err);
  }
}

// Save posts (insert or update if modified)
export async function savePosts(posts) {
  for (const post of posts) {
    try {
      const existing = await db.getFirstAsync(
        "SELECT modified FROM posts WHERE id = ?",
        [post.id]
      );

      if (!existing || existing.modified < post.modified) {
        await db.runAsync(
          `INSERT OR REPLACE INTO posts 
            (id, title, slug, excerpt, image, category, author, authorImage, date, modified, content, views) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            post.id,
            post.title,
            post.slug,
            post.excerpt,
            post.image,
            post.category,
            post.author,
            post.authorImage,
            post.date,
            post.modified,
            post.content,
            post.views ?? 0,
          ]
        );
      }
    } catch (err) {
      console.error("Save post error:", err);
    }
  }
}

// Get most recent posts
export async function getPosts(limit = 10) {
  try {
    return await db.getAllAsync(
      `SELECT * FROM posts ORDER BY date DESC LIMIT ?`,
      [limit]
    );
  } catch (err) {
    console.error("getPosts error:", err);
    return [];
  }
}

// Get trending posts (by views)
export async function getTrendingPosts(limit = 5) {
  try {
    return await db.getAllAsync(
      `SELECT * FROM posts ORDER BY views DESC LIMIT ?`,
      [limit]
    );
  } catch (err) {
    console.error("getTrendingPosts error:", err);
    return [];
  }
}

// Get single post by ID
export async function getPostById(id) {
  try {
    return await db.getFirstAsync(
      `SELECT * FROM posts WHERE id = ?`,
      [id]
    );
  } catch (err) {
    console.error("getPostById error:", err);
    return null;
  }
}
