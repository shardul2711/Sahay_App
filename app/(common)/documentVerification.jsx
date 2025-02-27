import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const FormField = ({
  title,
  placeholder,
  keyboardType,
  value,
  handleChangeText,
  autoCapitalize,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="mb-6">
      <Text className="text-sm font-medium text-gray-700 mb-2">{title}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-lg px-4">
        <TextInput
          className="flex-1 h-12"
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={
            (title === "Password" || title === "Confirm Password") &&
            !showPassword
          }
          autoCapitalize={autoCapitalize}
          onChangeText={handleChangeText}
          value={value}
        />
        {(title === "Password" || title === "Confirm Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const DocumentVerification = () => {
  const [panCard, setPanCard] = useState(null);
  const [identityCard, setIdentityCard] = useState(null);
  const [accNoBank, setAccNoBank] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const handleFilePick = async (setFile) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled || result.assets.length === 0) return;

      const file = result.assets[0];
      setFile(file);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleSubmit = async () => {
    if (!panCard || !identityCard || !accNoBank || !ifscCode) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // Simulate form submission
    Alert.alert("Success", "Form submitted successfully (front-end only)");
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-6">Document Verification</Text>

      <TouchableOpacity
        onPress={() => handleFilePick(setPanCard)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload PAN Card
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {panCard ? panCard.name : "Choose PDF file"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleFilePick(setIdentityCard)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload Identity Card
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {identityCard ? identityCard.name : "Choose PDF file"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <FormField
        title="Bank Account Number"
        placeholder="Enter your bank account number"
        keyboardType="numeric"
        value={accNoBank}
        handleChangeText={setAccNoBank}
        autoCapitalize="none"
      />

      <FormField
        title="IFSC Code"
        placeholder="Enter your IFSC code"
        keyboardType="default"
        value={ifscCode}
        handleChangeText={setIfscCode}
        autoCapitalize="characters"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-black p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DocumentVerification;