import { useEffect, useState } from "react";
import { Platform } from "react-native";

// ✅ กำหนด BASE_URL รองรับทั้ง iOS และ Android
const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:3000/"
    : "http://10.0.2.2:3000/";

// ✅ Hook สำหรับโหลดข้อมูล
export const useLoadData = <T,>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // ✅ เพิ่ม state error

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null); // ✅ รีเซ็ต error ก่อนโหลดข้อมูลใหม่
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);

      const result: T[] = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, reloadData: fetchData };
};

// ✅ ฟังก์ชันดึงข้อมูลสินค้าจาก `id`
export const fetchProductById = async (id: string) => {
  try {
    console.log(`🔍 Fetching product: ${BASE_URL}products/${id}`);
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

// ✅ ฟังก์ชันอัปเดตสถานะ Like ของสินค้า
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
