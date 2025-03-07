import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useCart } from "../Context/cartContext";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItem } from "../Context/cartContext";
import { Checkbox } from "react-native-paper";


const CartScreen: React.FC = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItems } = useCart();

  // ✅ สร้าง State สำหรับ Checkbox ที่เลือก
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});

  // ✅ ฟังก์ชันเลือก/ยกเลิกเลือกสินค้ารายชิ้น
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // ✅ ฟังก์ชันเลือก/ยกเลิกเลือกสินค้าทั้งร้าน
  const toggleStoreSelection = (storeName: string, storeItems: CartItem[]) => {
    const allSelected = storeItems.every((item) => selectedItems[item.id]);
    const updatedSelections = { ...selectedItems };

    storeItems.forEach((item) => {
      updatedSelections[item.id] = !allSelected;
    });

    setSelectedItems(updatedSelections);
  };

  // ✅ ตรวจสอบว่ามีสินค้าที่ถูกเลือกอยู่หรือไม่
  const hasSelectedItems = Object.values(selectedItems).some((isSelected) => isSelected);

  // ✅ ฟังก์ชันลบสินค้าที่เลือก
  const handleDeleteSelectedItems = () => {
    const itemsToRemove = Object.keys(selectedItems).filter((itemId) => selectedItems[itemId]);
    removeItems(itemsToRemove);
    setSelectedItems({});
  };

  // ✅ จัดกลุ่มสินค้าในตะกร้าตามร้านค้า
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.storeName]) {
      acc[item.storeName] = [];
    }
    acc[item.storeName].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  // ✅ คำนวณราคารวม
  const totalPrice = cart.reduce(
    (total, item) => total + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  // ✅ กำหนดสีของปุ่มชำระเงินตามเงื่อนไข
  const checkoutButtonStyle = {
    ...styles.checkoutButton,
    backgroundColor: cart.length === 0 ? "#d1d1d1" : "#ff6f00",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Header พร้อมปุ่ม "ลบ" ที่แสดงเมื่อเลือกสินค้า */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🛒 กระเป๋าสินค้า</Text>
        {hasSelectedItems && (
          <TouchableOpacity onPress={handleDeleteSelectedItems}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={Object.entries(groupedCart)}
        keyExtractor={([storeName]) => storeName}
        renderItem={({ item }) => {
          const [storeName, items] = item;
          return (
            <View style={styles.storeSection}>
              <View style={styles.storeContainer}>
                {/* ✅ Checkbox สำหรับเลือกร้านค้า */}
                <Checkbox
                  status={items.every((i) => selectedItems[i.id]) ? "checked" : "unchecked"}
                  onPress={() => toggleStoreSelection(storeName, items)}
                />
                <Text style={styles.storeText}>@{storeName}</Text>
              </View>

              <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.productContainer}>
                    {/* ✅ Checkbox สำหรับเลือกสินค้ารายชิ้น */}
                    <Checkbox
                      status={selectedItems[item.id] ? "checked" : "unchecked"}
                      onPress={() => toggleItemSelection(item.id)}
                    />
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.title}</Text>
                      <Text style={styles.productSize}>ขนาด {item.size}</Text>
                      <Text style={styles.productPrice}>{item.price}฿</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                        <Ionicons name="remove-circle-outline" size={24} color="gray" />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                        <Ionicons name="add-circle-outline" size={24} color="gray" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>ไม่มีสินค้าในตะกร้า</Text>}
      />

      {/* ✅ ย้ายขึ้นข้างบนและเพิ่ม marginBottom */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>ยอดรวมสินค้า</Text>
          <Text style={styles.totalValue}>{totalPrice.toFixed(2)} ฿</Text>
        </View>
      </View>

      {/* ✅ ใช้ style ที่กำหนดไว้ข้างบน */}
      <View style={styles.fixedBottomContainer}>
        <TouchableOpacity style={checkoutButtonStyle} disabled={cart.length === 0}>
          <Text style={styles.checkoutText}>ชำระเงิน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: Platform.OS === "android" ? 25 : 0, // ✅ รองรับ Android
  },
  storeSection: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  storeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF6A5",
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#d1d1d1",
    marginRight: 10,
  },
  storeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productSize: {
    fontSize: 14,
    color: "#666",
  },
  productPrice: {
    fontSize: 16,
    color: "#222",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  summaryContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: Platform.OS === "ios" ? 35 : 75
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fixedBottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: Platform.OS === "ios" ? 15 : 15,
  },
  checkoutButton: {
   padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});
