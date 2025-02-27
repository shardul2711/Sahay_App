import { View, FlatList, Image, Dimensions } from "react-native";
import React, { useRef, useState, useEffect } from "react";

const SliderForProvider = () => {
  const { width } = Dimensions.get("window"); // Get device screen width
  const flatListRef = useRef(null); // Reference for the FlatList
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hardcoded slider images for UI demonstration
  const sliderList = [
    "https://image6.zibster.com/8933/3_20210304081705_24834925_large.jpg",
    "https://www.starnewsonline.com/gcdn/authoring/2015/06/29/NSTN/ghows-NC-797e2830-ea67-44d6-abac-e43759b3cedd-92845386.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp",
    "https://www.globalgiving.org/pfil/17590/ph_17590_217553.jpg",
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

export default SliderForProvider;
