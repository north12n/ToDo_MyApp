import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../Context/cartContext";

const CartScreen: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 ตะกร้าสินค้า</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.title}</Text>
            <Text>{item.quantity} ชิ้น</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>ไม่มีสินค้าในตะกร้า</Text>}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  productContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10, backgroundColor: "#fff", padding: 10, borderRadius: 8 },
  productImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: "bold" },
  productPrice: { fontSize: 14, color: "#888" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: { fontSize: 18, fontWeight: "bold", marginHorizontal: 10 },
  quantityText: { fontSize: 16, fontWeight: "bold" },
  emptyText: { textAlign: "center", fontSize: 16, marginTop: 20 },
});

export default CartScreen;
