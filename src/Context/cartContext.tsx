import React, { createContext, useContext, useReducer, ReactNode } from "react";

// 🛒 **โครงสร้างของสินค้าในตะกร้า**
export interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  size: string;
  storeName: string;
  quantity: number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItems: (ids: string[]) => void; // ✅ เปลี่ยนให้รับ id[]
}

// 🛒 **Reducer สำหรับจัดการตะกร้าสินค้า**
const cartReducer = (state: CartItem[], action: any) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case "REMOVE_ITEMS":
      return state.filter((item) => !action.payload.includes(item.id)); // ✅ ลบสินค้าตาม id

    default:
      return state;
  }
};

// 🛒 **สร้าง `CartProvider`**
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
        increaseQuantity: (id) => dispatch({ type: "INCREASE_QUANTITY", payload: id }),
        decreaseQuantity: (id) => dispatch({ type: "DECREASE_QUANTITY", payload: id }),
        removeItems: (ids) => dispatch({ type: "REMOVE_ITEMS", payload: ids }), // ✅ รับ id[] และลบออกจาก state
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🛒 **สร้าง Hook `useCart` สำหรับใช้ Context**
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart ต้องใช้ภายใน CartProvider");
  }
  return context;
};
