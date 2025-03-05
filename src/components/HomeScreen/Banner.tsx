import React from "react";
import { StyleSheet, View, Image } from "react-native";

const Banner: React.FC = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={require("../../../assets/img/Banner/banner.gif")} // ใช้ require ตรงนี้
        style={styles.banner}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: 16, // ระยะห่างด้านบนและล่าง
    borderRadius: 12, // ทำให้มุมแบนเนอร์โค้งมน
    overflow: "hidden", // ป้องกันภาพล้นขอบ
    backgroundColor: "#fff", // เพิ่มสีพื้นหลัง (ช่วยให้ดูสวยงามขึ้น)
    shadowColor: "#000", // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 2 }, // เงาสำหรับ iOS
    shadowOpacity: 0.2, // ความเข้มของเงา (iOS)
    shadowRadius: 4, // ขนาดเงา (iOS)
    elevation: 5, // เงาสำหรับ Android
  },
  banner: {
    width: "100%", // ให้แบนเนอร์เต็มความกว้างของ container
    height: 240, // กำหนดความสูงของแบนเนอร์
  },
});

export default Banner;
