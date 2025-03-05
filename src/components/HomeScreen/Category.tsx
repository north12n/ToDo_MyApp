import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ประเภทข้อมูล
type Category = {
  id: string;
  name: string;
  count: string;
  icon: string; // Assumed to map to valid Ionicons icon names
};

// Map valid Ionicons names
const validIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "home",
  settings: "settings",
  search: "search",
  // Add all potential mappings here
};

const CategoryScreen: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // เก็บข้อมูลหมวดหมู่
  const [loading, setLoading] = useState<boolean>(true); // สถานะโหลดข้อมูล
  const [selected, setSelected] = useState<string>(""); // เก็บ ID หมวดหมู่ที่เลือก

  // ฟังก์ชันดึงข้อมูลจาก data.json
  const fetchCategories = async () => {
    try {
      setLoading(true);
      // โหลดข้อมูลจากไฟล์ data.json
      const json = require("../../data/data.json"); // เปลี่ยน path ให้ตรงกับตำแหน่งไฟล์
      setCategories(json.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลเมื่อ component ถูก mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // แสดงสถานะโหลด
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>หมวดหมู่ยอดนิยม 👀</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selected === item.id && styles.selectedCategory,
            ]}
            onPress={() => setSelected(item.id)} // กำหนด ID ที่เลือก
          >
            {validIcons[item.icon] ? (
              <Ionicons name={validIcons[item.icon]} size={32} color="#0056f6" />
            ) : (
              <Text>⚠️</Text> // Fallback for invalid icon names
            )}
            <Text style={styles.categoryText}>{item.name}</Text>
            <Text style={styles.categoryCount}>{item.count} ชิ้น</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default CategoryScreen;

// สไตล์
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatListContainer: {
    paddingHorizontal: 0,
  },
  categoryItem: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: 120,
  },
  selectedCategory: {
    backgroundColor: "#e8f3ff",
    borderColor: "#0056f6",
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
