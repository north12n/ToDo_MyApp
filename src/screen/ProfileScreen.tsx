import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const [isAllowAddById, setIsAllowAddById] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cover Image Section */}
      <View style={styles.coverContainer}>
        <Image
          source={{
            uri: "https://via.placeholder.com/300x100", 
          }}
          style={styles.coverImage}
        />
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://via.placeholder.com/100", 
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon}>
            <AntDesign name="camerao" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ชื่อ</Text>
          <Text style={styles.value}>North Nattakit</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>อีเมล</Text>
          <Text style={styles.value}>66123250112@kru.ac.th</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>หมายเลขโทรศัพท์</Text>
          <Text style={styles.value}>095 396 2087</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ที่อยู๋</Text>
          <Text style={styles.value}>ยังไม่ได้ตั้งค่า</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>วันเกิด</Text>
          <Text style={styles.value}>ยังไม่ได้ตั้งค่า</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>ตั้งค่าโปรไฟล์</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  coverContainer: {
    height: 150,
    backgroundColor: "#333",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    position: "absolute",
    bottom: -40,
    left: "50%",
    transform: [{ translateX: -50 }],
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00B598",
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  infoContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#888",
  },
  
  footer: {
    paddingVertical: 20,
    borderTopColor: "#333",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#00B598",
  },
});


// borderTopWidth: 1,

   {/* <View style={styles.infoRow}>
          <Text style={styles.label}>LINE ID</Text>
          <Text style={styles.value}>0953962087</Text>
        </View> */}
        {/* <View style={styles.switchRow}>
          <Text style={styles.label}>อนุญาตให้เพิ่มเพื่อนด้วย ID</Text>
          <Switch
            value={isAllowAddById}
            onValueChange={() => setIsAllowAddById(!isAllowAddById)}
            thumbColor={isAllowAddById ? "#0097ff" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#B3D8FF" }}
          />
        </View> */}