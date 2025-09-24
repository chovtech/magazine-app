// storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://contemporaryworld.ipcr.gov.ng/wp-json/ipcr/v1/settings";
const STORAGE_KEY = "ipcr_settings";

// Clean up API HTML (remove \r\n and unescape quotes)
function cleanHTML(raw) {
  if (!raw) return "";
  return raw
    .replace(/\\r\\n/g, "")   // remove escaped line breaks
    .replace(/\\"/g, '"');    // unescape double quotes
}

// Clean all keys inside API response
function normalizeData(json) {
  if (!json?.data) return json;
  const cleaned = {};
  for (const key in json.data) {
    cleaned[key] = cleanHTML(json.data[key]);
  }
  return {
    ...json,
    data: cleaned,
  };
}

export async function syncSettings() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const normalized = normalizeData(json);

    if (normalized?.data && normalized?.last_updated) {
      // Check existing storage
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      let existingData = existing ? JSON.parse(existing) : null;

      if (!existingData || normalized.last_updated > existingData.last_updated) {
        // Newer data, update local storage
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        return normalized;
      }

      // Return existing if it's the latest
      return existingData;
    }
  } catch (error) {
    console.log("Error syncing settings:", error);
  }

  // fallback: return whatever is in storage
  const fallback = await AsyncStorage.getItem(STORAGE_KEY);
  return fallback ? JSON.parse(fallback) : null;
}

export async function getSettings() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}
