import { View, Text, TextInput } from "react-native";

const FormField = ({ label, placeholder, keyboardType, multiline, value, onChangeText }) => (
  <View className="mb-4">
    <Text className="text-lg font-semibold text-black mb-2">{label}</Text>
    <TextInput
      className="border border-black p-4 rounded-lg text-lg"
      placeholder={placeholder}
      keyboardType={keyboardType}
      multiline={multiline}
      value={value}  // Ensure the input value is controlled
      onChangeText={onChangeText} // Pass user input back to the state
    />
  </View>
);

export default FormField;
