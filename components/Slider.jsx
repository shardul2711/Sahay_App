import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";

const Slider = () => {
  const { width } = Dimensions.get("window"); // Get device screen width
  const flatListRef = useRef(null); // Reference for the FlatList
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded slider images for UI demonstration
  const sliderList = [
    "https://curlytales.com/wp-content/uploads/2020/04/target-image1.jpg",
    "https://graciousquotes.com/wp-content/uploads/2021/10/Giving-is-not-just-about-making-a-donation.-It-is-about-making-a-difference.-Kathy-Calvin.jpg",
    "https://www.globalgiving.org/pfil/57898/ph_57898_245610.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % sliderList.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  // Render a single image
  const renderItem = ({ item }) => (
    <View className="justify-center items-center" style={{ width }}>
      <Image
        source={{ uri: item }}
        className="h-64 rounded-lg" // Increased height
        style={{ width: width * 0.9 }}
      />
    </View>
  );

  return (
    <View style={{ marginTop: 20 }}> 
      {/* Added margin from top to create space from Header */}
      <FlatList
        ref={flatListRef}
        data={sliderList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

export default Slider;
