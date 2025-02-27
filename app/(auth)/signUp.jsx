import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location'; // Import expo-location
import Button from '../../components/Button'; // Import your custom Button component
import FormField from '../../components/FormField'; // Import your custom FormField component

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: 'male', // Default gender value
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [location, setLocation] = useState(null); // State to store location
  const [errorMsg, setErrorMsg] = useState(null); // State to store error messages
  const router = useRouter();

  const handleSignUp = () => {
    // Add your sign-up logic here (e.g., API call, validation, etc.)
    // For now, just redirect to the home page
    router.push('/home'); // Replace '/home' with your home page route
  };

  const handleGetLocation = async () => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // Fetch the current location
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords); // Save the coordinates in state
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      {/* Sign Up Form Container */}
      <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Title */}
        <Text className="text-3xl text-center text-gray-800 mb-8 font-cormorantGaramondBold">
          Sign Up
        </Text>

        {/* Name Input */}
        <FormField
          title="Name"
          placeholder="Enter your full name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />

        {/* Email Input */}
        <FormField
          title="Email"
          placeholder="Enter your email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />

        {/* Gender Picker */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-gray-700 mb-2">Gender</Text>
          <View className="w-full h-12 px-3 py-2 border border-gray-300 rounded-lg bg-white flex justify-center">
            <Picker
              selectedValue={form.gender}
              onValueChange={(itemValue) => setForm({ ...form, gender: itemValue })}
              style={{ flex: 1, color: form.gender ? "#000" : "#9CA3AF" }} // Ensures text is visible
            >
              <Picker.Item label="Select Gender" value="" enabled={false} />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>

        {/* Phone Number Input */}
        <FormField
          title="Phone Number"
          placeholder="Enter your phone number"
          value={form.phoneNumber}
          handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
          keyboardType="phone-pad"
        />

        {/* Password Input */}
        <FormField
          title="Password"
          placeholder="Enter your password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry={true}
        />

        {/* Confirm Password Input */}
        <FormField
          title="Confirm Password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
          secureTextEntry={true}
        />

        {/* Get Location Button */}
        <Button
          title="Get Current Location"
          onPress={handleGetLocation}
          buttonStyle="w-full mb-4" // Additional styles for the button
          textStyle="text-lg"
        />

        {/* Display Location */}
        {location && (
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Your Location:</Text>
            <Text className="text-gray-600">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          </View>
        )}

        {/* Display Error Message */}
        {errorMsg && (
          <View className="mb-6">
            <Text className="text-sm font-medium text-red-500">{errorMsg}</Text>
          </View>
        )}

        {/* Sign Up Button */}
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          buttonStyle="w-full mb-6 ml-1" // Additional styles for the button
          textStyle="text-lg"
        />

        {/* Already have an account? Sign In Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signIn')}>
            <Text className="text-primary font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;