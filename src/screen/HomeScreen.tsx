import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../utils/fonts";
import { Banner, Trending, Brands, CardProduct } from "../components/HomeScreen";
import Header from "../components/Header";
import { Product } from "../components/HomeScreen/CardProduct";

type RootStackParamList = {
  ProductDetails: { id: string };
  Home: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={[]} // ✅ ไม่ต้องใช้ data เพราะใช้ HeaderComponent
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items available</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Banner />
            <Trending />
            <Brands />
            <Text style={styles.title}>ฟีดของคุณ</Text>
            <CardProduct
              onProductClick={(product) => {
                console.log("📌 Navigating to ProductDetails with ID:", product.id);
                navigation.navigate("ProductDetails", { id: product.id });
              }}
            />
          </>
        }
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // ✅ ขยาย SafeAreaView ให้เต็มจอ
    backgroundColor: "#f9f9f9",
  },
  content: {
    flexGrow: 1, // ✅ ให้ FlatList ขยายเต็มพื้นที่
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontFamily: fonts.boldItalic,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    paddingTop: 10,
    paddingLeft: 10,
  },
  emptyContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
