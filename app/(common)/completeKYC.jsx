import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import supabase from "../../supabase/supabaseConfig"; // Ensure correct path
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

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

const CompleteKYC = () => {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [adharno, setAdharno] = useState("");
  const [govregno, setGovregno] = useState("");
  const [address, setAddress] = useState("");
  const [addressproof, setAddressproof] = useState(null);
  const [consent, setConsent] = useState(null);
  const [tandc, setTandc] = useState(null);
  const [aml, setAml] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  // const handleImagePick = async (setImage) => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setImage(result.assets[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error picking image:", error);
  //   }
  // };

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
    }
  };

  const handleImagePick = async (setUrl) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (result.canceled || result.assets.length === 0) return;

      const file = result.assets[0];
      await uploadToSupabase(file, setUrl);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };


  const handleSubmit = async () => {
    if (
      !fname ||
      !email ||
      !mobile ||
      !adharno ||
      !govregno ||
      !address ||
      !addressproof ||
      !consent ||
      !tandc ||
      !aml
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setUploading(true);

    // Insert data into Supabase table
    const { data, error } = await supabase
      .from("kyc")
      .insert([
        {
          providerId: user?.providerid,
          providerName: user?.name,
          fname,
          email,
          mobile,
          adharno,
          govregno,
          address,
          addressproof: addressproof,
          consent: consent,
          tandc: tandc,
          aml: aml,
        },
      ]);

    setUploading(false);

    if (error) {
      Alert.alert("Submission Failed", error.message);
    } else {
      Alert.alert("Success", "KYC submitted successfully.");
      router.push("(shopkeeper)/home");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 pb-10">
      <Text className="text-2xl font-bold mb-6">Complete KYC</Text>

      <FormField
        title="Full Name"
        placeholder="Enter your full name"
        keyboardType="default"
        value={fname}
        handleChangeText={setFname}
        autoCapitalize="words"
      />

      <FormField
        title="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        handleChangeText={setEmail}
        autoCapitalize="none"
      />

      <FormField
        title="Mobile Number"
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={mobile}
        handleChangeText={setMobile}
        autoCapitalize="none"
      />

      <FormField
        title="Aadhar Number"
        placeholder="Enter your Aadhar number"
        keyboardType="numeric"
        value={adharno}
        handleChangeText={setAdharno}
        autoCapitalize="none"
      />

      <FormField
        title="Government Registration Number"
        placeholder="Enter your government registration number"
        keyboardType="default"
        value={govregno}
        handleChangeText={setGovregno}
        autoCapitalize="characters"
      />

      <FormField
        title="Address"
        placeholder="Enter your address"
        keyboardType="default"
        value={address}
        handleChangeText={setAddress}
        autoCapitalize="sentences"
      />

      <TouchableOpacity
        onPress={() => handleImagePick(setAddressproof)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload Address Proof
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {addressproof ? "Image Selected" : "Choose Image"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
        {addressproof && (
          <Image
            source={{ uri: addressproof }}
            className="w-24 h-24 mt-2"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleImagePick(setConsent)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload Consent
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {consent ? "Image Selected" : "Choose Image"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
        {consent && (
          <Image source={{ uri: consent }} className="w-24 h-24 mt-2" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleImagePick(setTandc)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload Terms and Conditions
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {tandc ? "Image Selected" : "Choose Image"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
        {tandc && (
          <Image source={{ uri: tandc }} className="w-24 h-24 mt-2" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleImagePick(setAml)}
        className="mb-6"
      >
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Upload AML Document
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-2">
          <Text className="flex-1">
            {aml ? "Image Selected" : "Choose Image"}
          </Text>
          <MaterialIcons name="attach-file" size={24} color="black" />
        </View>
        {aml && <Image source={{ uri: aml }} className="w-24 h-24 mt-2" />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-black p-4 rounded-lg"
        disabled={uploading}
      >
        <Text className="text-white text-center font-bold p-2">
          {uploading ? "Uploading..." : "Submit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CompleteKYC;