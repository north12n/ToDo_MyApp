import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ ใช้ Navigation
import { StackNavigationProp } from "@react-navigation/stack";
import { useLoadData } from "../../hooks/useLoadData";
import { RootStackParamList } from "../../../App"; // ✅ นำเข้า RootStackParamList
import { fonts } from "../../utils/fonts";

export interface brandItems {
  id: string;
  name: string;
  image: string;
}

const Brands: React.FC = () => {
  const { data: brands, loading } = useLoadData<brandItems>("brands");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "BrandsDetail">>(); // ✅ ใช้ StackNavigationProp

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056f6" />
        <Text>Loading brands...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>แบรนด์แนะนำ</Text>
      <FlatList
        horizontal
        data={brands}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("BrandsDetail", { brands: item.id, image: item.image})} 
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontFamily: fonts.boldItalic,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  card: {
    marginRight: 10,
    alignItems: "center",
    width: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  cardText: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
