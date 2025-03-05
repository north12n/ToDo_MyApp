import { Platform } from "react-native";

// ✅ ใช้ BASE_URL ที่รองรับทั้ง iOS และ Android
const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:3000/"
    : "http://10.0.2.2:3000/";

export const fetchProductById = async (id: string) => {
  try {
    console.log(`🔍 Fetching product: ${BASE_URL}products/${id}`); // ✅ Debug URL
    const response = await fetch(`${BASE_URL}products/${id}`);
    if (!response.ok) {
      throw new Error("❌ Failed to fetch product details");
    }
    return await response.json();
  } catch (error) {
    console.error("🚨 Error fetching product by ID:", error);
    throw error;
  }
};

export const updateProductLikeStatus = async (id: string, isLiked: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liked: isLiked }),
    });

    if (!response.ok) {
      throw new Error("❌ Failed to update like status");
    }
  } catch (error) {
    console.error("🚨 Error updating like status:", error);
    throw error;
  }
};
