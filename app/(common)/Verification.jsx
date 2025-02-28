import {
  View, Text, Image, ScrollView, Button, ActivityIndicator, Alert, SafeAreaView
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import supabase from "../../supabase/supabaseConfig";

const Verification = () => {
  const { id, title, city, organization, category, description, poster } = useLocalSearchParams();

  const [image, setImage] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [md5Hash, setMd5Hash] = useState("");
  const [aiGenerated, setAiGenerated] = useState("No");
  const [personCount, setPersonCount] = useState("0");
  const [storedMd5Hash, setStoredMd5Hash] = useState("");
  const [requiredPersonCount, setRequiredPersonCount] = useState("0");
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const { data: md5HashData, error } = await supabase
          .from("campaigns")
          .select("md5hash");

        if (error) throw error;
        if (md5HashData) {
          const hashList = md5HashData.map((item) => item.md5hash);
          setStoredMd5Hash(hashList);
        }

        const { data: personCountData, error: personCountError } = await supabase
          .from("campaigns")
          .select("requiredpersonCount")
          .eq("id", id)
          .single();

        if (personCountError) throw personCountError;
        if (personCountData) {
          setRequiredPersonCount(personCountData.requiredpersonCount || "0");
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoredData();
  }, [id]);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image.");
      console.error("Image selection error:", error);
    }
  };

  const uploadImage = useCallback(async () => {
    if (!image) {
      Alert.alert("No Image", "Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: image.uri,
      name: image.name,
      type: "image/jpeg",
    });

    setUploading(true);
    try {
      const response = await fetch("http://192.168.16.176:8080/analyze-image/", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const responseData = await response.json();
      console.log("Server Response:", responseData);

      const newMd5Hash = responseData.md5_hash || "N/A";
      const newPersonCount = responseData.person_count?.toString() || "0";
      const isAiGenerated = responseData.ai_generated ? "Yes" : "No";

      setMd5Hash(newMd5Hash);
      setPersonCount(newPersonCount);
      setAiGenerated(isAiGenerated);

      setShowSubmit(
        !storedMd5Hash.includes(newMd5Hash) && parseInt(newPersonCount) >= parseInt(requiredPersonCount)
      );

      Alert.alert("Success", "Image uploaded and analyzed!");
    } catch (error) {
      Alert.alert("Upload Failed", "Error uploading image.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  }, [image, storedMd5Hash, requiredPersonCount]);

  const handleSubmit = async () => {
    try {
      const filePath = `validation/campaign_images/${id}_${image.name}`;

      const { data, error: uploadationError } = await supabase.storage.from("documents").upload(filePath, {
        uri: image.uri,
        contentType: image.mimeType,
        name: image.name,
      });

      if (uploadationError) {
        Alert.alert("Upload Failed", uploadationError.message);
        return;
      }

      const uploadedImageLink = `https://zsrhvbqsmlruustctgni.supabase.co/storage/v1/object/public/documents/${filePath}`;


      const { error } = await supabase
        .from("campaigns")
        .update({
          md5hash: md5Hash,
          validationImage: uploadedImageLink,
        })
        .eq("id", id);

      if (error) throw error;

      setImageLink(uploadedImageLink);
      Alert.alert("Success", "Data updated successfully.");
      setShowSubmit(false);
    } catch (error) {
      Alert.alert("Submission Failed", "Error updating campaign data.");
      console.error("Submit error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full">
      <ScrollView className="p-4 mb-1 h-full">
        {loading ? (
          <ActivityIndicator size="large" color="#1E3A8A" />
        ) : (
          <>
            <Image source={{ uri: poster }} className="w-full h-60 rounded-lg mb-4" />
            {[
              { label: "Title", value: title },
              { label: "City", value: city },
              { label: "Organization", value: organization },
              { label: "Category", value: category },
              { label: "Description", value: description },
            ].map((item, index) => (
              <View key={index} className="border-b pb-2 mb-4 border-gray-300">
                <Text className="text-xl font-bold text-black">{item.label}</Text>
                <Text className="text-lg text-gray-700">{item.value}</Text>
              </View>
            ))}
            <Button title="Select Image" color="#1E3A8A" onPress={pickImage} />
            {image && (
              <View className="mt-4">
                <Text className="text-gray-700">Name: {image.name}</Text>
                <Button title="Upload Image" color="#1E3A8A" onPress={uploadImage} disabled={uploading} />
                {uploading && <ActivityIndicator size="small" color="#1E3A8A" className="mt-2" />}
              </View>
            )}
            {md5Hash && (
              <View className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <Text className="text-green-600 font-bold">Analysis Results:</Text>
                <Text className="text-black">MD5 Hash: {md5Hash}</Text>
                <Text className="text-black">AI Generated: {aiGenerated}</Text>
                <Text className="text-black">Person Count: {personCount}</Text>
              </View>
            )}
            {!showSubmit && <Text className="text-red-600 mt-2">Warning: Submission criteria not met.</Text>}
            {showSubmit && <Button title="Submit Changes" color="#D97706" onPress={handleSubmit} className="mt-4" />}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification;
