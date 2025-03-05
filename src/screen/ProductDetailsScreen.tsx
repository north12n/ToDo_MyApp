import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchProductById, updateProductLikeStatus } from "../Service/productService";
import { useCart } from "../Context/cartContext"; // ✅ ใช้ CartContext ที่แก้ไขแล้ว

// 🔹 ประกาศประเภทของ Stack
type RootStackParamList = {
  ProductDetails: { id: string };
  Cart: undefined;
};

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, "ProductDetails">;
type ProductDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProductDetails">;

interface ProductDetailsScreenProps {
  route: ProductDetailsScreenRouteProp;
  navigation: ProductDetailsScreenNavigationProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<any>(null); // ✅ ใช้ `any` ชั่วคราวเพื่อรองรับทุกโครงสร้าง
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { addToCart } = useCart(); // ✅ ใช้ useCart() เพื่อให้แชร์ข้อมูลกับ `CartScreen.tsx`

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setIsLiked(data.liked || false);
      } catch (error) {
        console.error("🚨 Failed to load product details:", error);
      }
    };

    loadProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: product.size,
        storeName: product.storeName,
        quantity: 1, 
      });

      navigation.navigate("Cart"); // ✅ ไปที่หน้า Cart
    }
  };
  
  

  const toggleLike = async () => {
    try {
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
      await updateProductLikeStatus(id, newLikeStatus);
    } catch (error) {
      console.error("🚨 Failed to update like status:", error);
    }
  };

  if (!product) { 
    return (
      <View style={styles.loadingContainer}>
        <Text>กำลังโหลดข้อมูลสินค้า...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: product.image }} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{Number(product.price)} ฿</Text>
        <Text style={styles.size}>ขนาด: {product.size}</Text>
        <Text style={styles.storeName}>ร้าน: {product.storeName || "ไม่ระบุ"}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating || "N/A"} | {product.reviews || 0} รีวิว
        </Text>
        <Text
          style={[
            styles.stock,
            { color: Number(product.stock) > 0 ? "#4caf50" : "#f44336" },
          ]}
        >
          {Number(product.stock) > 0
            ? `เหลือ ${product.stock} ชิ้นในสต็อก`
            : "สินค้าหมด"}
        </Text>
        <Text style={styles.description}>
          รายละเอียดสินค้า: {product.description || "ไม่มีข้อมูลเพิ่มเติม"}
        </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.chatButton}>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
            <Text style={styles.buttonText}>แชท</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color="white" />
          <Text style={styles.buttonText}>เพิ่มลงในตะกร้า</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// 🔹 เพิ่มสไตล์
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 400 },
  backButton: { position: "absolute", top: 40, left: 10, backgroundColor: "#00000050", borderRadius: 20, padding: 5 },
  likeButton: { position: "absolute", top: 40, right: 10, backgroundColor: "#00000050", borderRadius: 20, padding: 5 },
  detailsContainer: { padding: 15, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  price: { fontSize: 24, fontWeight: "bold", color: "#FF5A5F", marginBottom: 20 },
  size: { fontSize: 16, color: "#666", marginBottom: 10 },
  storeName: { fontSize: 16, fontWeight: "bold", color: "#333", marginVertical: 5 },
  rating: { fontSize: 14, color: "#777", marginBottom: 10 },
  stock: { fontSize: 14, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 14, color: "#666", marginTop: 10, lineHeight: 20 },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  chatButton: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#007AFF", padding: 10, borderRadius: 20, marginRight: 10 },
  addToCartButton: { flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#ff9500", padding: 10, borderRadius: 20 },
  buttonText: { color: "white", marginLeft: 5, fontWeight: "bold" },
});

export default ProductDetailsScreen;
