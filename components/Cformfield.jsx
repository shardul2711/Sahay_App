import { View, Text, TextInput } from "react-native";

const FormField = ({ label, placeholder, keyboardType, multiline, value, onChangeText }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "black", marginBottom: 8 }}>
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 12,
          borderRadius: 8,
          fontSize: 16,
          color: "black",
        }}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType={keyboardType}
        multiline={multiline}
        value={value} // Make sure this is correctly controlled
        onChangeText={onChangeText} // Handle user input properly
      />
    </View>
  );
};

export default FormField;
