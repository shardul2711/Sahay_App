import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const AddDonationCamp = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-white p-6"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    >
      <Text className="text-3xl font-bold text-black mb-6">
        Create New Donation Camp
      </Text>

      <Text className="text-lg font-semibold text-black mb-2">Title</Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter title"
      />

      <Text className="text-lg font-semibold text-black mb-2">City</Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter city"
      />

      <Text className="text-lg font-semibold text-black mb-2">
        Organization
      </Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter organization name"
      />

      <Text className="text-lg font-semibold text-black mb-2">Rating</Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter rating"
        keyboardType="numeric"
      />

      <Text className="text-lg font-semibold text-black mb-2">Category</Text>
      <Picker className="border border-black p-4 rounded-lg text-lg mb-4">
        <Picker.Item label="Environment" value="Environment" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Health" value="Health" />
      </Picker>

      <Text className="text-lg font-semibold text-black mb-2">Description</Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter description"
        multiline
      />

      <Text className="text-lg font-semibold text-black mb-2">Location</Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter location details"
      />

      <Text className="text-lg font-semibold text-black mb-2">
        Contact Number
      </Text>
      <TextInput
        className="border border-black p-4 rounded-lg text-lg mb-4"
        placeholder="Enter contact number"
        keyboardType="phone-pad"
      />

      <Text className="text-lg font-semibold text-black mb-2">
        Upload Poster
      </Text>
      <TouchableOpacity
        onPress={pickImage}
        className="border border-blue-900 p-4 rounded-lg text-lg mb-4 flex items-center justify-center"
      >
        <MaterialIcons name="add-photo-alternate" size={24} color="blue" />
        <Text className="text-blue-900 font-semibold">Choose from Gallery</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          className="w-full h-40 rounded-lg mt-2"
        />
      )}

      <TouchableOpacity className="bg-blue-900 p-4 rounded-lg text-lg items-center mt-6 mb-6">
        <Text className="text-white font-semibold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddDonationCamp;
