import React from "react";
import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLoadData } from "../../hooks/useLoadData";
import { fonts } from "../../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App"; // ✅ นำเข้า RootStackParamList

export interface TrendingItem {
  id: string;
  name: string;
  image: string;
}

const Trending: React.FC = () => {
  const { data: trendingItems, loading, error } = useLoadData<TrendingItem>("Trending");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "TrendingDetails">>();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056f6" />
        <Text>Loading trending items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.trendingContainer}>
      <Text style={styles.sectionTitle}>Trending😍</Text>
      <Text style={styles.sectionSubtitle}>คอลเล็กชันพิเศษที่ Sale รวบรวมมาให้คุณ</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trendingItemContainer}
            onPress={() => navigation.navigate("TrendingDetails", { trending: item.id })} 
          >
            <Image source={{ uri: item.image }} style={styles.trendingItem} />
            <Text style={styles.trendingItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  trendingContainer: {
    padding: 20,
    backgroundColor: "#FFF89A",
    paddingBottom: 30,
  },
  sectionTitle: {
    fontFamily: fonts.boldItalic,
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 0,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  trendingItemContainer: {
    marginRight: 16,
    alignItems: "center",
  },
  trendingItem: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  trendingItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
