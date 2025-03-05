import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // ✅ Import RootStackParamList
import { fonts } from "../utils/fonts";

// 📌 บอก Type ของ Navigation
type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Search">;

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProps>(); // ✅ ใช้ Type ที่ถูกต้อง

  return (
    <View style={styles.container}>
      {/* ไอคอนเมนู */}
      <TouchableOpacity>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* ป้าย "PRO" */}
      <View style={styles.proBadge}>
        <Text style={styles.proText}>PLANTNEST</Text>
      </View>

      {/* ไอคอนค้นหา */}
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Ionicons name="search" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 5,
    backgroundColor: "#F7F7F7",
  },
  proBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 1,
  },
  proText: {
    fontFamily: fonts.extraBold,
    fontSize: 30,
    color: "black",
  },
});
