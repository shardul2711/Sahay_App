import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FormField from "../../components/Cformfield";
import supabase from "../../supabase/supabaseConfig"; // Import Supabase client

const Complaint = () => {
  const router = useRouter();

  // State variables
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill all fields before submitting.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const { data, error } = await supabase.from("complaints").insert([
        {
          name: name.trim(),
          contact: contact.trim(),
          description: description.trim(),
        },
      ]);

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Your complaint has been registered successfully!");
      
      // Reset fields after submission
      setName("");
      setContact("");
      setDescription("");

      router.push("/"); // Navigate back after submission
    } catch (error) {
      console.error("Supabase Insert Error:", error.message);
      Alert.alert("Error", "Failed to submit the complaint.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
      {/* Header */}
      <Text style={{ color: "#1E3A8A", fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Register Complaint
      </Text>

      {/* Full Name Field */}
      <FormField
        label="Full Name"
        placeholder="Enter your name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
      />

      {/* Contact Number Field */}
      <FormField
        label="Contact Number"
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      {/* Complaint Description Field */}
      <FormField
        label="Complaint Description"
        placeholder="Describe your issue"
        keyboardType="default"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#1E3A8A",
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 8 }}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Complaint;
