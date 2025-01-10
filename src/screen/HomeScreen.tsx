import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

// ประเภทของข้อมูลที่ใช้ใน FlatList
interface Item {
  id: number;
  title: string;
}

const HomeScreen: React.FC = () => {
  // ข้อมูลใน FlatList
  const data: Item[] = []; // ข้อมูลตัวอย่างเป็น array เปล่า

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <TouchableOpacity>
            <Text style={[styles.tabText, styles.activeTab]}>งาน</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabText}>ส่วนบุคคล</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabText}>สิ่งที่ปรารถนา</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <AntDesign name="search1" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {data.length === 0 ? (
          <View style={styles.emptyState}>
            
            <Image
              style={styles.illustration}
            />
            <Text style={styles.emptyText}>
              ไม่มีงานในหมวดหมู่นี้{"\n"}คลิก + เพื่อสร้างงานของคุณ
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tabContainer: {
    flexDirection: "row",
  },
  tabText: {
    fontSize: 16,
    color: "#aaa",
    marginHorizontal: 10,
  },
  activeTab: {
    color: "#007bff",
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
