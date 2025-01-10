import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


// Import Components
import HomeScreen from "./src/screen/HomeScreen";

// ประเภทของ Stack Navigator
type TabParamList = {
  งาน: undefined;
  แดชบอด: undefined;
  โปรไฟล์: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "red",
          tabBarStyle: {
            backgroundColor: "white", // พื้นหลังสีขาว
            height: Platform.OS === "ios" ? 100 : 80, // ปรับความสูงตามแพลตฟอร์ม
            paddingBottom: Platform.OS === "ios" ? 20 : 10, // Safe Area iOS
            paddingTop: 10, // Padding ด้านบน
          },
          tabBarLabelStyle: {
            fontSize: 12, // ปรับขนาดข้อความ
            fontWeight: "bold", // ทำให้ข้อความ Bold
          },
          
        }}
      >
        <Tab.Screen
          name="งาน"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, focused, color }: { size: number; focused: boolean; color: string }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="แดชบอด"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }: { size: number; color: string }) => (
           
              <FontAwesome name="reorder" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="โปรไฟล์"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, color }: { size: number; color: string }) => (
              
              <AntDesign name="user" size={size} color={color}  />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
