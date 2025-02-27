import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Button from "../../components/Button";
import FormField from '../../components/FormField';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const router = useRouter();

  const handleSignIn = () => {
    // Add your sign-in logic here (e.g., API call, validation, etc.)
    // For now, just redirect to the home page
    router.push('/home'); // Replace '/home' with your home page route
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      {/* Sign In Form Container */}
      <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Title */}
        <Text className="text-3xl text-center text-gray-800 mb-8 font-cormorantGaramondBold">
          Sign In
        </Text>

        {/* Email Input */}

        <FormField
          title="Email "
          placeholder="Enter your email"
          value={form.email} handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />

        {/* Password Input */}

        <FormField 
          title="Password"
          placeholder="Enter Your Password"
          value={form.password} handleChangeText={(e) => setForm({ ...form, password: e })}
        />

        {/* Sign In Button */}
        <Button
          title="LogIn"
          onPress={() => router.push("/home")}
          buttonStyle="w-full mb-6" // Additional styles for the button
          textStyle="text-lg"
        // No need to pass buttonStyle or textStyle unless overriding defaults
        />

        {/* Donator SignUp Link */}
        <View className="flex-row justify-center mb-2">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signUp')}>
            <Text className="text-primary font-semibold">SignUp as Donator</Text>
          </TouchableOpacity>
        </View>

        {/* Provider SignUp Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signUpVendor')}>
            <Text className="text-primary font-semibold">SignUp as Provider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;