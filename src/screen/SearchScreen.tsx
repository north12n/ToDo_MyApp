import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, 
  Platform, StatusBar, SafeAreaView, FlatList, Animated 
} from "react-native";
import { useLoadData } from "../hooks/useLoadData"; // ✅ Hook โหลดข้อมูล

const trendingKeywords = ["เสื้อครอป", "รองเท้า", "เดรส pomelo", "กางเกงเอวสูง", "lookbook", "mitr", "ชุดว่ายน้ำ", "กระโปรง"];

const SearchScreen = () => {
  const [query, setQuery] = useState(""); // 🔹 คำที่พิมพ์ในช่องค้นหา
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 คำที่ใช้ค้นหาเมื่อกดปุ่ม
  const { data: products } = useLoadData<any>("products"); // ✅ โหลดสินค้าจาก API
  const [filteredProducts, setFilteredProducts] = useState(products);
  const fadeAnim = new Animated.Value(0); // ✅ ใช้ Animated สำหรับแอนิเมชัน

  // ✅ ฟังก์ชันค้นหาข้อมูลเมื่อกดปุ่ม
  const handleSearch = () => {
    setSearchQuery(query); // ✅ ตั้งค่า searchQuery ให้ตรงกับที่พิมพ์
    if (!query) {
      setFilteredProducts([]);
      return;
    }
    
    const lowerText = query.toLowerCase();
    const filtered = (products ?? []).filter((item: any) => 
        item?.name && item.name.toLowerCase().includes(lowerText) // 🔹 ตรวจสอบก่อนใช้
      );
    setFilteredProducts(filtered);

    // ✅ แสดงผลลัพธ์ด้วยแอนิเมชัน
    Animated.timing(fadeAnim, {
      toValue: 40,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ✅ ช่องค้นหา */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหาสินค้าหรือแบรนด์ที่คุณต้องการ"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ แท็บเลือกประเภท */}
        {/* <View style={styles.tabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>สินค้า</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>ผู้ขาย</Text>
          </TouchableOpacity>
        </View> */}

        {/* ✅ เทรนด์กำลังมา */}
        {/* <Text style={styles.trendingTitle}>เทรนด์กำลังมา</Text>
        <ScrollView contentContainerStyle={styles.trendingContainer} horizontal>
          {trendingKeywords.map((keyword, index) => (
            <TouchableOpacity key={index} style={styles.trendingTag} onPress={() => setQuery(keyword)}>
              <Text style={styles.trendingText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* ✅ แสดงผลลัพธ์เมื่อกดค้นหา */}
        {searchQuery.length > 0 && (
          <Animated.View style={[styles.resultsContainer, { opacity: fadeAnim }]}>
            {filteredProducts.length > 0 ? (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.productItem}>
                    <Text style={styles.productName}>{item.name}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noResults}>❌ ไม่พบสินค้าที่คุณค้นหา</Text>
            )}
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, 
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    searchContainer: { 
        backgroundColor: "#F5F5F5", 
        borderRadius: 10, 
        paddingHorizontal: 10,
        flexDirection: "row", 
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 10 : 0, 
    },
    searchInput: { 
        flex: 1, 
        fontSize: Platform.OS === "ios" ? 17 : 16, 
        height: Platform.OS === "ios" ? 30 : 40,  
        paddingLeft: 8 
    },
    searchButton: {
        backgroundColor: "#2ECC71",
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    searchButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    tabs: { 
        flexDirection: "row", 
        marginTop: 16 
    },
    activeTab: { 
        flex: 1, 
        borderBottomWidth: 2,
        borderBottomColor: "#2ECC71",
        paddingVertical: 8 
    },
    inactiveTab: { 
        flex: 1, 
        borderBottomWidth: 2,
        borderBottomColor: "#ccc", 
        paddingVertical: 8 
    },
    activeTabText: { 
        textAlign: "center",
        fontSize: 16, 
        fontWeight: "bold", 
        color: "#2ECC71" 
    },
    inactiveTabText: { 
        textAlign: "center", 
        fontSize: 16, 
        color: "#666" 
    },
    trendingTitle: { 
        // fontSize: 18, 
        // fontWeight: "bold", 
        // marginTop: 20 
    },
    trendingContainer: { 
        // flexDirection: "row", 
        // flexWrap: "wrap", 
        // marginTop: 10 
    },
    trendingTag: { 
        // backgroundColor: "#DFFFE0", 
        // borderRadius: 20, 
        // paddingHorizontal: 16, 
        // paddingVertical: 8, 
        // margin: 5 
    },
    trendingText: { 
        fontSize: 14, 
        color: "#333" 
    },
    resultsContainer: { 
        marginTop: 20, 
    },
    productItem: { 
        padding: 10, 
        borderBottomWidth: 1, 
        borderColor: "#ccc" 
    },
    productName: { 
        fontSize: 16, 
        fontWeight: "bold" 
    },
    noResults: {
        textAlign: "center",
        fontSize: 16,
        color: "red",
        marginTop: 10,
    },
});

export default SearchScreen;
