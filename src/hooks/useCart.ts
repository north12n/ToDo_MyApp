import { useState } from "react";
import { Product } from "../components/HomeScreen/CardProduct";

export const useCart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: String(Number(item.quantity) + 1) }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: "1" }];
      }
    });
  };

  const increaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: String(Number(item.quantity) + 1) }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && Number(item.quantity) > 1
          ? { ...item, quantity: String(Number(item.quantity) - 1) }
          : item
      )
    );
  };

  return { cart, addToCart, increaseQuantity, decreaseQuantity };
};


// import { useCart } from "../Context/cartContext";

// export const useCartStore = () => {
//   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
//   return { cart, addToCart, increaseQuantity, decreaseQuantity };
// };
