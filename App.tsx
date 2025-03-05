import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from "expo-font";

// Import Components
import HomeScreen from "./src/screen/HomeScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import CartScreen from "./src/screen/CartScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import TestScreen from "./src/screen/TestScreen";
import { store } from "./src/store/store";
import LottieView from "lottie-react-native";
import useAppLoading from "./src/hooks/useAppLoading"; // Import Custom Hook
import SearchScreen from "./src/screen/SearchScreen";
import TrendingDetailsScreen from "./src/screen/TrendingDetailsScreen";
import BrandsDetailScreen from "./src/screen/BrandsDetailScreen";
import { CartProvider } from "./src/Context/cartContext";

// ประเภทของ Stack Navigator
type TabParamList = {
  หน้าหลัก: undefined;
  Cart: undefined;
  แดชบอด: undefined;
  ตั้งค่า: undefined;
};

export type RootStackParamList = {
  หน้าหลัก: undefined;
  ProductDetails: { id: string };
  Search: undefined;
  TrendingDetails: { trending: string };
  BrandsDetail: { brands: string, image: string };
  Cart: undefined; 
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack Navigator for Home and Product Details
const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="หน้าหลัก"
    >
      <Stack.Screen name="หน้าหลัก" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} /> 
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="TrendingDetails" component={TrendingDetailsScreen} />
      <Stack.Screen name="BrandsDetail" component={BrandsDetailScreen} />
    </Stack.Navigator>
  );
};




const App: React.FC = () => {
  const { isLoading, fontsLoaded, fontError } = useAppLoading();

  if (isLoading || (!fontsLoaded && !fontError)) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require("./assets/lottie/Loading_Animations.json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }


  // // แสดงหน้า Loading ถ้าข้อมูลยังโหลดไม่เสร็จ หรือฟอนต์ยังโหลดไม่เสร็จ
  // if (isLoading || (!fontsLoaded && !fontError)) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#00b598" />
  //       <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
  //     </View>
  //   );
  // }

  // ถ้าข้อมูลโหลดเสร็จแล้ว แสดง Navigation หลัก
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <CartProvider>  
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#00b598",
                tabBarStyle: {
                  backgroundColor: "white",
                  height: Platform.OS === "ios" ? 100 : 80,
                  paddingBottom: Platform.OS === "ios" ? 20 : 10,
                  paddingTop: 10,
                  paddingLeft: 40,
                  paddingRight: 40,
                },
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: "bold",
                },
              }}
            >
              {/* Tab สำหรับ "หน้าหลัก" */}
              <Tab.Screen
                name="หน้าหลัก"
                component={HomeStack}
                options={{
                  tabBarIcon: ({ size, color }) => (
                    <Feather name="home" size={size} color={color} />
                  ),
                }}
              />
              {/* Tab สำหรับ "ตะกร้า" */}
              <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  tabBarIcon: ({ size, color }) => (
                    // <Entypo name="cup" size={size} color={color} />
                    // <Entypo name="leaf" size={24} color="black" />
                    <MaterialCommunityIcons name="leaf" size={size} color={color} />
                  ),
                }}
              />
              {/* Tab สำหรับ "แดชบอด" */}
              <Tab.Screen
                name="แดชบอด"
                component={TestScreen} // คุณสามารถเปลี่ยนเป็นหน้าที่เหมาะสม
                options={{
                  tabBarIcon: ({ size, color }) => (
                    <Entypo name="circular-graph" size={size} color={color} />
                  ),
                }}
              />
              {/* Tab สำหรับ "โปรไฟล์" */}
              <Tab.Screen
                name="ตั้งค่า"
                component={ProfileScreen}
                options={{
                  tabBarIcon: ({ size, color }) => (
                    <AntDesign name="user" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </CartProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottieAnimation: {
    width: 400,
    height: 400,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
