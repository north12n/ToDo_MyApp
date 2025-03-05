import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";
import { BlurView } from "expo-blur";

const PaymentScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const animationRef = useRef<LottieView>(null);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/sound/cash.mp3"));
    await sound.playAsync();
  };
  const handlePayment = async () => {
    setModalVisible(true);
    playSound();
  
    if (animationRef.current) {
      animationRef.current.reset(); 
      animationRef.current.play();
    }

    setTimeout(() => {
      setModalVisible(false);
    }, 2550);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>💳 จ่ายเงิน</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <BlurView intensity={30} tint="dark" style={styles.blurBackground} />

          <LottieView
            ref={animationRef} // ✅ ใช้ ref เพื่อควบคุม LottieView
            source={require("../../assets/lottie/cash_Animations.json")}
            autoPlay
            loop={false}
            style={styles.fullScreenAnimation}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  payText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  fullScreenAnimation: {
    width: "110%",
    height: "110%",
  },
});