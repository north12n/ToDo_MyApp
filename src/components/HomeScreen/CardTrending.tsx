import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLoadData, updateProductLikeStatus } from "../../hooks/useLoadData";
import { Product } from "../../components/HomeScreen/CardProduct"; // ✅ Import Product

const { width } = Dimensions.get("window");

interface CardTrendingProps {
  name: string;
  onProductClick: (product: Product) => void;
}

const CardTrending: React.FC<CardTrendingProps> = ({ name, onProductClick }) => {
  const { data, loading } = useLoadData<Product>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<FlatList<Product> | null>(null);

  useEffect(() => {
    if (data?.length) {
      setProducts(data.filter((product) => product.trendingId === name));
    }
  }, [data, name]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity onPress={() => onProductClick(item)}>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price} ฿</Text>
        </View>
      </TouchableOpacity>
    ),
    [onProductClick]
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
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

export default CardTrending;

const styles = StyleSheet.create({
  
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
    seller: {
      fontSize: 12,
      color: "#aaa",
      fontStyle: "italic",
    },
  });