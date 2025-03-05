import { Platform } from "react-native";

// ✅ กำหนด BASE_URL รองรับทั้ง iOS และ Android
export const BASE_URL =
  Platform.OS === "ios"
    ? "http://localhost:3000/"
    : "http://10.0.2.2:3000/";

// ✅ ฟังก์ชันสำหรับสร้างพาธรูปภาพ
export const getImagePath = (relativePath: string) => {
  if (!relativePath) return "";
  return `${BASE_URL}${relativePath.replace(/^\.\.\//, "")}`;
};
