import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";

type Product = {
  id: string;
  title: string;
  price: string;
  size: string;
  seller: string;
  image: string;
};

type FeedProps = {
  data: Product[];
  sectionTitle: string;
};

const Feed: React.FC<FeedProps> = ({ data, sectionTitle }) => {
  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <TouchableOpacity style={styles.favoriteButton}>
        <Text style={styles.favoriteIcon}>❤️</Text>
      </TouchableOpacity>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text style={styles.size}>Size: {item.size}</Text>
        <Text style={styles.seller}>by {item.seller}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{sectionTitle}</Text>
      <FlatList
        data={data}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 16,
    color: "red",
  },
  info: {
    padding: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  size: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  seller: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 2,
  },
});
