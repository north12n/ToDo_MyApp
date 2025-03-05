import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CardTrending from "../components/HomeScreen/CardTrending";
import { RootStackParamList } from "../../App";
import { useLoadData } from "../hooks/useLoadData";
import { TrendingItem } from "../components/HomeScreen/Trending"

export interface RouteParams {
  trending: string;
  image: string; // เพิ่มพารามิเตอร์สำหรับรูปภาพสินค้า
}

const TrendingDetailsScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TrendingDetails">>();
    const { data: trendingItems, loading, error } = useLoadData<TrendingItem>("Trending");
  
  const { trending, image } = route.params as RouteParams;

  const selectedItem = trendingItems?.find(item => item.id === trending);



  return (
    <View style={styles.container}>
      {/* 🔹 ภาพสินค้า */}
      <View>
        <Image source={{ uri: image }} style={styles.image} />

        {/* 🔹 ปุ่มย้อนกลับ */}
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.trendTitleContainer}>
          <Text style={styles.trendTitle}>{selectedItem?.name || "Loading..."}</Text>
        </View>


        {/* 🔹 เปลี่ยนปุ่มหัวใจเป็นปุ่มค้นหา */}
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <CardTrending name={trending} onProductClick={(product) => navigation.navigate("ProductDetails", { id: product.id })} />
    </View>
  );
};

export default TrendingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "20%",
    height: 100,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // ปรับความเข้มของสี
    borderRadius: 30, // ปรับขอบให้กลม
    width: 40, // กำหนดขนาดปุ่ม
    height: 40, // กำหนดขนาดปุ่ม
    alignItems: "center", // จัดให้อยู่ตรงกลาง
    justifyContent: "center",
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // ปรับความเข้มของสี
    borderRadius: 30, // ปรับขอบให้กลม
    width: 40, // กำหนดขนาดปุ่ม
    height: 40, // กำหนดขนาดปุ่ม
    alignItems: "center", // จัดให้อยู่ตรงกลาง
    justifyContent: "center",
  },
  trendTitleContainer: {
    position: "absolute",
    top: 25,
    left: "51.53%",
    transform: [{ translateX: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  trendTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

