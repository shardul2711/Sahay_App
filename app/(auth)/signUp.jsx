import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import supabase from '../../supabase/supabaseConfig';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!form.email || !form.password || !form.confirmPassword || !form.name || !form.phoneNumber || !form.gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      const userId = data.user?.id;

      const { error: dbError } = await supabase.from('user').insert([
        {
          userid: userId,
          name: form.name,
          email: form.email,
          gender: form.gender,
          phoneNumber: form.phoneNumber,
        },
      ]);

      if (dbError) throw dbError;

      Alert.alert('Success', 'Account created successfully!');
      router.push('/(NGO)/home');
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
          <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <Text className="text-3xl text-center text-gray-800 mb-8 font-cormorantGaramondBold">
              Sign Up
            </Text>

            <FormField
              title="Name"
              placeholder="Enter your full name"
              value={form.name}
              handleChangeText={(e) => setForm({ ...form, name: e })}
            />

            <FormField
              title="Email"
              placeholder="Enter your email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
            />

            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">Gender</Text>
              <View className="w-full h-12 px-3 py-1 border border-gray-300 rounded-lg bg-white">
                <Picker
                  selectedValue={form.gender}
                  onValueChange={(itemValue) => setForm({ ...form, gender: itemValue })}
                  style={{ color: "black" }}
                >
                  <Picker.Item label="Select Gender" value="" enabled={false} color="gray" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <FormField
              title="Phone Number"
              placeholder="Enter your phone number"
              value={form.phoneNumber}
              handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
              keyboardType="phone-pad"
            />

            <FormField
              title="Password"
              placeholder="Enter your password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              secureTextEntry={true}
            />

            <FormField
              title="Confirm Password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
              secureTextEntry={true}
            />

            <Button
              title="Get Current Location"
              onPress={handleGetLocation}
              buttonStyle="w-full mb-4"
              textStyle="text-lg"
            />

            {location && (
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">Your Location:</Text>
                <Text className="text-gray-600">
                  Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
              </View>
            )}

            {errorMsg && (
              <View className="mb-6">
                <Text className="text-sm font-medium text-red-500">{errorMsg}</Text>
              </View>
            )}

            <Button
              title={loading ? "Signing Up..." : "Sign Up"}
              onPress={handleSignUp}
              buttonStyle="w-full mb-6 ml-1"
              textStyle="text-lg"
              disabled={loading}
            />

            <View className="flex-row justify-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/signIn')}>
                <Text className="text-primary font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SignUp;