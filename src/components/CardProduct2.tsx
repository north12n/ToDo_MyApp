import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';

// import AntDesign from "react-native-vector-icons/AntDesign";
// import { fonts } from "../utils/fonts";

// ประกาศประเภทของ props
type CardProductProps = {
  item: {
    image: string;
    title: string;
    price: number;
    isFavorite: boolean;
  };
  toggleFavorite: (item: { image: string; title: string; price: number; isFavorite: boolean }) => void;
  handleProductClick: (item: { image: string; title: string; price: number; isFavorite: boolean }) => void;
};

const CardProduct: React.FC<CardProductProps> = ({ item, toggleFavorite, handleProductClick }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        style={styles.likeContainer}
      >
        {item?.isFavorite ? (
          <Feather name="heart" color={"red"} size={15} />

        ) : (
          <Feather name="heart" color={"red"} size={15} />
       
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: 256,
    width: "100%",
    borderRadius: 20,
  },
  title: {
    // fontFamily: fonts.BlackItalic,
    fontSize: 18,
    color: "#444444",
  },
  price: {
    fontSize: 18,
    // fontFamily: fonts.BlackItalic,
  },
  contentContainer: {
    padding: 10,
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
});
