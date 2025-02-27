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
import supabase from "../../supabase/supabaseConfig"; // Ensure correct path
import { useNavigation } from "@react-navigation/native";

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
          secureTextEntry={title.includes("Password") && !showPassword}
          autoCapitalize={autoCapitalize}
          onChangeText={handleChangeText}
          value={value}
        />
        {title.includes("Password") && (
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
  const [panCardUrl, setPanCardUrl] = useState(null);
  const [identityCardUrl, setIdentityCardUrl] = useState(null);
  const [accNoBank, setAccNoBank] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  const uploadToSupabase = async (file, setUrl) => {
    if (!file) {
      Alert.alert("Error", "No document selected.");
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const filePath = `images/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(filePath, {
        uri: file.uri,
        contentType: file.mimeType,
        name: file.name,
      });

    setUploading(false);

    if (error) {
      Alert.alert("Upload Failed", error.message);
    } else {
      const publicUrl = `https://zsrhvbqsmlruustctgni.supabase.co/storage/v1/object/public/documents/${filePath}`;
      setUrl(publicUrl);
      Alert.alert("Success", "File uploaded successfully.");
      navigation.navigate("(shopkeeper)/home");
    }
  };

  const handleFilePick = async (setUrl) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled || result.assets.length === 0) return;

      const file = result.assets[0];
      await uploadToSupabase(file, setUrl);
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleSubmit = async () => {
    if (!panCardUrl || !identityCardUrl || !accNoBank || !ifscCode) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    // Submit data (e.g., send URLs and details to your backend)
    Alert.alert("Success", "KYC submitted successfully.");
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-6">Document Verification</Text>

      <TouchableOpacity onPress={() => handleFilePick(setPanCardUrl)} className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">Upload PAN Card</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">{panCardUrl ? "Uploaded ✅" : "Choose PDF file"}</Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleFilePick(setIdentityCardUrl)} className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">Upload Identity Card</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">{identityCardUrl ? "Uploaded ✅" : "Choose PDF file"}</Text>
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
        disabled={uploading}
      >
        <Text className="text-white text-center font-bold">
          {uploading ? "Uploading..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DocumentVerification;
