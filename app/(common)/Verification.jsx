import { View, Text, Image, ScrollView, Button, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import supabase from "../../supabase/supabaseConfig";
import { Alert } from "react-native";

const Verification = () => {
  const { id, title, city, organization, rating, category, description, poster } = useLocalSearchParams();
  const [accepted, setAccepted] = useState(false);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [audioLink, setAudioLink] = useState("");

  // Function to select an image
  const pickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Function to select an audio file
  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setAudio(result.assets[0]);
    }
  };

  // Function to upload file to Supabase
  const uploadFile = async (selectedFile, fileType) => {
    if (!selectedFile) {
      Alert.alert(`No ${fileType} selected`, `Please select a ${fileType} first.`);
      return;
    }

    setUploading(true);
    const fileExt = selectedFile.name.split(".").pop();
    const filePath = `${fileType}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from("documents").upload(filePath, {
      uri: selectedFile.uri,
      contentType: selectedFile.mimeType,
      name: selectedFile.name,
    });

    setUploading(false);

    if (error) {
      Alert.alert("Upload Failed", error.message);
    } else {
      Alert.alert("Upload Successful", `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully!`);

      if (fileType === "image") {
        setImageLink(`https://zsrhvbqsmlruustctgni.supabase.co/storage/v1/object/public/documents/${filePath}`);
      } else if (fileType === "audio") {
        setAudioLink(`https://zsrhvbqsmlruustctgni.supabase.co/storage/v1/object/public/documents/${filePath}`);
      }
    }
  };

  return (
    <ScrollView className="p-4">
      {/* Poster Image */}
      <Image source={{ uri: poster }} className="w-full h-60 rounded-lg mb-4" />

      {/* Details Section */}
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

      {/* Accept Button */}
      <View className="mb-6">
        {accepted ? (
          <Text className="text-green-600 text-lg font-bold text-center">Accepted</Text>
        ) : (
          <Button title="Accept" color="#1E3A8A" onPress={() => setAccepted(true)} />
        )}
      </View>

      {/* Upload Proof Section (Only Visible After Acceptance) */}
      {accepted && (
        <View className="p-4 border border-gray-300 rounded-lg bg-gray-100 mb-6">
          <Text className="text-lg font-bold text-black mb-4">Upload Proof</Text>

          {/* Image Upload */}
          <Button title="Select Image" color="#1E3A8A" onPress={pickImage} />
          {image && (
            <View className="mt-4">
              <Text className="text-gray-700">Name: {image.name}</Text>
              <Text className="text-gray-700">Size: {image.size} bytes</Text>
              <Button title="Upload Image" color="#1E3A8A" onPress={() => uploadFile(image, "image")} disabled={uploading} />
              {uploading && <ActivityIndicator size="small" color="#1E3A8A" className="mt-2" />}
            </View>
          )}

          {/* Display Uploaded Image Link */}
          {imageLink !== "" && (
            <View className="mt-4">
              <Text className="text-green-600 font-bold">Image Upload Successful!</Text>
              <Text className="text-blue-600 break-words">{imageLink}</Text>
            </View>
          )}

          {/* Add Space Between Image and Audio Upload */}
          <View className="mt-6" />

          {/* Audio Upload */}
          <Button title="Select Audio" color="#1E3A8A" onPress={pickAudio} />
          {audio && (
            <View className="mt-4">
              <Text className="text-gray-700">Name: {audio.name}</Text>
              <Text className="text-gray-700">Size: {audio.size} bytes</Text>
              <Button title="Upload Audio" color="#1E3A8A" onPress={() => uploadFile(audio, "audio")} disabled={uploading} />
              {uploading && <ActivityIndicator size="small" color="#1E3A8A" className="mt-2" />}
            </View>
          )}

          {/* Display Uploaded Audio Link */}
          {audioLink !== "" && (
            <View className="mt-4">
              <Text className="text-green-600 font-bold">Audio Upload Successful!</Text>
              <Text className="text-blue-600 break-words">{audioLink}</Text>
            </View>
          )}
        </View>
      )}

      {/* Submit Button with Bottom Margin */}
      {accepted && (
        <View className="mb-10">
          <Button title="Submit" color="#1E3A8A" onPress={() => Alert.alert("Submitted", "Your response has been recorded!")} />
        </View>
      )}
    </ScrollView>
  );
};

export default Verification;
