// membershipService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://contemporaryworld.ipcr.gov.ng/wp-json/ipcr/v1/membership";

export async function fetchMembership() {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) return null;

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Membership fetch failed", response.status);
      return null;
    }

    const data = await response.json();
    // Store fresh membership info in local storage
    await AsyncStorage.setItem("membership", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Error fetching membership:", err);
    return null;
  }
}

export async function getStoredMembership() {
  const json = await AsyncStorage.getItem("membership");
  return json ? JSON.parse(json) : null;
}
