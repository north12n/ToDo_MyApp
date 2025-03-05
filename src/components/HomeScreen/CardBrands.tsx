// CardBrands.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  View, Text, Image, StyleSheet, FlatList, TouchableOpacity, 
  Dimensions, ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useLoadData } from "../../hooks/useLoadData";
import { Product } from "../../components/HomeScreen/CardProduct";

const { width } = Dimensions.get("window");

interface CardBrandsProps {
  brandId: string;
  onProductClick: (product: Product) => void;
}

const CardBrands: React.FC<CardBrandsProps> = ({ brandId, onProductClick }) => {
  const navigation = useNavigation();
  const { data, loading } = useLoadData<Product>("products");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const scrollRef = useRef<FlatList<Product> | null>(null);

  useEffect(() => {
    if (data?.length) {
      setFilteredProducts(data.filter((product) => String(product.brandId) === brandId));
    }
  }, [data, brandId]);

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => onProductClick(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} ฿</Text>
      </View>
    </TouchableOpacity>
  ), [onProductClick]);

  if (loading) {
    return <ActivityIndicator size="large" color="#2E4A33" style={{ marginTop: 20 }} />;
  }

  return (
    <FlatList
      ref={scrollRef}
      data={filteredProducts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default CardBrands;

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 10, paddingBottom: 20 },
  columnWrapper: { justifyContent: "space-between" },
  card: { width: (width - 50) / 2, backgroundColor: "#f9f9f9", borderRadius: 10, marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 10 },
  title: { fontSize: 14, fontWeight: "bold", color: "#333", textAlign: "center", marginTop: 5 },
  price: { fontSize: 14, color: "#777", textAlign: "center" },
});
