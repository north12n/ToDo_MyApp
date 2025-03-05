import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLoadData, updateProductLikeStatus } from "../../hooks/useLoadData";
// import { 1 } from "../../../assets/img/Trending/1.jpeg";
import { getImagePath } from "../../hooks/imagePath"; 


const { width } = Dimensions.get("window");

// ✅ BASE_URL รองรับทั้ง iOS และ Android
// const BASE_URL = Platform.OS === "ios" ? "http://localhost:3000/" : "http://10.0.2.2:3000/";

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  size: string;
  brandId: string;
  liked?: boolean;
  storeName: string;
  trendingId: string;
  rating: string;
  reviews: string;
  stock: string;
  quantity: string;
  description: string;
}

interface CardProductProps {
  onProductClick: (product: Product) => void;
}

const CardProduct: React.FC<CardProductProps> = ({ onProductClick }) => {
  const { data, loading } = useLoadData<Product>("products"); // ✅ โหลดข้อมูลจาก API
  
  const [products, setProducts] = useState<Product[]>([]); // ✅ กำหนดค่าเริ่มต้นเป็น array เปล่า
  const scrollRef = useRef<FlatList<Product> | null>(null); // ✅ สร้าง ref สำหรับ FlatList

  useEffect(() => {
    if (data?.length) setProducts(data); // ✅ ตรวจสอบก่อนอัปเดต state
  }, [data]);

  // ✅ ฟังก์ชันกดหัวใจและอัปเดต UI (ไม่ reloadData)
  const toggleLike = async (product: Product) => {
    try {
      const newLikedStatus = !product.liked;

      // ✅ อัปเดต UI ทันทีโดยไม่ reloadData()
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, liked: newLikedStatus } : p
        )
      );

      // ✅ เรียก API ไปอัปเดตฐานข้อมูล
      await updateProductLikeStatus(product.id, newLikedStatus);

      // ✅ เลื่อน FlatList ไปด้านบน (ถ้ามีการกดปุ่ม)
      scrollRef.current?.scrollToOffset({ offset: 0, animated: true });

    } catch (error) {
      console.error("🚨 Failed to update like status:", error);
    }
  };

  // ✅ ใช้ useCallback เพื่อป้องกันการ render ใหม่ที่ไม่จำเป็น
  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity onPress={() => onProductClick(item)}>
        <View style={styles.card}>
          {/* ✅ แสดงรูปสินค้า */}
          <Image source={{ uri: item.image }} style={styles.image} />
          {/* <Image source={{ uri: getImagePath(item.image) }} style={styles.image} /> */}
          {/* ✅ ปุ่มกดหัวใจ */}
          <TouchableOpacity onPress={() => toggleLike(item)} style={styles.favoriteButton}>
            <Ionicons
              name={item.liked ? "heart" : "heart-outline"}
              size={24}
              color={item.liked ? "red" : "gray"}
            />
          </TouchableOpacity>
  
          {/* ✅ ข้อมูลสินค้า */}
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} ฿</Text>
            <Text style={styles.size}>Size: {item.size}</Text>
            
            {/* <Text style={styles.size}>Trending: {item.trendingId}</Text> */}
  
            <Text style={styles.brands}>by {item.brandId}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [onProductClick]
  );
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef} // ✅ ใช้ ref กับ FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  trending: {
    fontSize: 14,
    // color: "#FF5733", // 🔥 ใช้สีแดงส้มให้ดูเด่น
    fontWeight: "bold",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    padding: 6,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    width: (width - 50) / 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#777",
  },
  size: {
    fontSize: 12,
    color: "#aaa",
  },
  brands: {
    fontSize: 12,
    color: "#aaa",
    fontStyle: "italic",
  },
});
