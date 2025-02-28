import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import FormField from "../../components/Form_Field";
import supabase from "../../supabase/supabaseConfig";

const AddDonationCamp = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    organization: "",
    category: "Environment",
    description: "",
    contact: "",
    imageLink: "",
    deadline: new Date(),
  });

  const [user, setUser] = useState(null);
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch logged-in user details
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData?.session) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const userId = sessionData.session.user.id;

      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("userid", userId)
        .single();

      if (error) {
        Alert.alert("Error", "Failed to fetch user details");
      } else {
        setUser(data);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setDocument(result.assets[0]);
    }
  };

  // ✅ Image Upload (Kept Same)
  const uploadDocument = async () => {
    if (!document) {
      Alert.alert("No document selected", "Please select an image first.");
      return;
    }

    setUploading(true);
    const fileExt = document.name.split(".").pop();
    const filePath = `images/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from("documents").upload(filePath, {
      uri: document.uri,
      contentType: document.mimeType,
      name: document.name,
    });

    setUploading(false);

    if (error) {
      Alert.alert("Upload Failed", error.message);
    } else {
      const imageLink = `https://zsrhvbqsmlruustctgni.supabase.co/storage/v1/object/public/documents/${filePath}`;
      setFormData({ ...formData, imageLink });
      Alert.alert("Upload Successful", "Image uploaded successfully!");
    }
  };

  // ✅ Upload Campaign with `useridofcampaigncreator` & `nameofcampaigncreator`
  const uploadCampaign = async () => {
    if (!formData.title.trim() || !formData.city.trim() || !formData.organization.trim() || !formData.contact.trim()) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User data not found. Please log in again.");
      return;
    }

    try {
      const { data, error } = await supabase.from("campaigns").insert([
        { 
          ...formData, 
          useridofcampaigncreator: user.userid, 
          nameofcampaigncreator: user.name 
        },
      ]);
      if (error) throw error;
      Alert.alert("Success", "Campaign added successfully!");
      setFormData({
        title: "",
        city: "",
        organization: "",
        category: "Environment",
        description: "",
        contact: "",
        imageLink: "",
        deadline: new Date(),
      });
      setDocument(null);
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-semibold text-blue-900 mb-6">Create New Donation Camp</Text>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
        <>
          <FormField label="Title" placeholder="Enter title" value={formData.title} onChangeText={(text) => handleInputChange("title", text)} />
          <FormField label="City" placeholder="Enter city" value={formData.city} onChangeText={(text) => handleInputChange("city", text)} />
          <FormField label="Organization" placeholder="Enter organization name" value={formData.organization} onChangeText={(text) => handleInputChange("organization", text)} />
          
          <Text className="text-lg font-semibold text-black mb-2">Category</Text>
          <Picker selectedValue={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
            <Picker.Item label="Environment" value="Environment" />
            <Picker.Item label="Education" value="Education" />
            <Picker.Item label="Health" value="Health" />
          </Picker>

          <FormField label="Description" placeholder="Enter description" multiline value={formData.description} onChangeText={(text) => handleInputChange("description", text)} />
          <FormField label="Contact Number" placeholder="Enter contact number" keyboardType="phone-pad" value={formData.contact} onChangeText={(text) => handleInputChange("contact", text)} />
          
          <Text className="text-lg font-semibold text-black mb-2">Select Deadline</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-gray-300 p-4 rounded-lg items-center">
            <Text className="text-black font-semibold">{formData.deadline.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker value={formData.deadline} mode="date" display="default" onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) handleInputChange("deadline", date);
            }} />
          )}

          <Text className="text-lg font-semibold text-black mb-2">Upload Image</Text>
          <TouchableOpacity onPress={pickDocument} className="bg-blue-900 p-4 rounded-lg items-center flex-row justify-center">
            <MaterialIcons name="photo-camera" size={24} color="white" className="mr-2" />
            <Text className="text-white font-semibold">Select Image</Text>
          </TouchableOpacity>

          {document && (
            <TouchableOpacity onPress={uploadDocument} disabled={uploading} className="bg-blue-900 p-4 rounded-lg items-center mt-4">
              <Text className="text-white font-semibold">Upload Image</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={uploadCampaign} className="bg-blue-900 p-4 rounded-lg items-center mt-6 mb-6">
            <Text className="text-white font-semibold">Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default AddDonationCamp;
