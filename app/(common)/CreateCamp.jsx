import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import FormField from "../../components/Form_Field";
import supabase from "../../supabase/supabaseConfig";

const AddDonationCamp = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    organization: "",
    rating: "",
    category: "Environment",
    description: "",
    location: "",
    contact: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const uploadCampaign = async () => {
    console.log("Form Data:", formData); // Debugging: Log the form data
  
    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.city.trim() ||
      !formData.organization.trim() ||
      !formData.contact.trim()
    ) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
  
    try {
      // Insert campaign data into Supabase
      const { data, error } = await supabase.from("campaigns").insert([
        { ...formData },
      ]);
  
      if (error) throw error;
  
      Alert.alert("Success", "Campaign added successfully!");
      setFormData({
        title: "",
        city: "",
        organization: "",
        rating: "",
        category: "Environment",
        description: "",
        location: "",
        contact: "",
      });
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    }
  };
  
  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-semibold text-blue-900 mb-6">Create New Donation Camp</Text>

      <FormField label="Title" placeholder="Enter title" value={formData.title} onChangeText={(text) => handleInputChange("title", text)} />
      <FormField label="City" placeholder="Enter city" value={formData.city} onChangeText={(text) => handleInputChange("city", text)} />
      <FormField label="Organization" placeholder="Enter organization name" value={formData.organization} onChangeText={(text) => handleInputChange("organization", text)} />
      <FormField label="Rating" placeholder="Enter rating" keyboardType="numeric" value={formData.rating} onChangeText={(text) => handleInputChange("rating", text)} />
      
      <Text className="text-lg font-semibold text-black mb-2">Category</Text>
      <Picker selectedValue={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
        <Picker.Item label="Environment" value="Environment" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Health" value="Health" />
      </Picker>
      
      <FormField label="Description" placeholder="Enter description" multiline value={formData.description} onChangeText={(text) => handleInputChange("description", text)} />
      <FormField label="Location" placeholder="Enter location details" value={formData.location} onChangeText={(text) => handleInputChange("location", text)} />
      <FormField label="Contact Number" placeholder="Enter contact number" keyboardType="phone-pad" value={formData.contact} onChangeText={(text) => handleInputChange("contact", text)} />
      
      <TouchableOpacity onPress={uploadCampaign} className="bg-blue-900 p-4 rounded-lg items-center mt-6 mb-6">
        <Text className="text-white font-semibold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddDonationCamp;
