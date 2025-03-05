import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import CardBrands from "../components/HomeScreen/CardBrands";
import { RootStackParamList } from "../../App";
import { useLoadData } from "../hooks/useLoadData";
import { brandItems } from "../components/HomeScreen/Brands";

export interface RouteParams {
  brands: string;
  image: string;
}

const BrandsDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "BrandsDetail">>();
  const { data: brandItems, loading, error } = useLoadData<brandItems>("brands");

  // ✅ รับค่าจาก Route
  const { brands, image } = (route.params || {}) as RouteParams;
  const selectedBrand = brandItems?.find((item) => item.id === brands);

  return (
    <SafeAreaView style={styles.container}>
    
      <View>
        <Image source={{ uri: image }} style={styles.image} />

        {/* 🔹 ปุ่มย้อนกลับ */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>

        {/* 🔹 ปุ่มค้นหา */}
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("Search")}>
          <Ionicons name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* 🔹 ชื่อแบรนด์ */}
      <Text style={styles.brandName}>{selectedBrand?.name || "Loading..."}</Text>
   
      {/* 🔹 Loading Indicator */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E4A33" />
        </View>
      ) : (
        <CardBrands
          brandId={brands}
          onProductClick={(product) => navigation.navigate("ProductDetails", { id: product.id })}
        />
      )}
    </SafeAreaView>
  );
};

export default BrandsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20, // ✅ ดันสินค้าลงไปอีก
  },
  detailsContainer: { padding: 15, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -20 },

  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchButton: {
    position: "absolute",
    top: 20,
    right: 15,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // ✅ ชื่อไปทางด้านซ้าย
    marginLeft: 20, // ✅ เพิ่มระยะห่างจากขอบซ้าย
    marginTop: 10,
    marginBottom: 20, // ✅ ดันสินค้าลงไปอีก
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
