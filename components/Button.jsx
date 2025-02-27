import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-black p-2.5 rounded-[15px] border-2 border-dark items-center justify-center w-[80%] ${buttonStyle}`} // NativeWind classes
    >
      <Text className={`text-white text-base font-outfitBold ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;