import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Button from "../../components/Button";
import FormField from '../../components/FormField';
import supabase from '../../supabase/supabaseConfig';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      await fetchUserData(data.user.id);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId) => {
    try {
      let { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("userid", userId)
        .single();

      if (data) {
        router.replace('/(NGO)/Home');
        return;
      }

      ({ data, error } = await supabase
        .from("provider")
        .select("*")
        .eq("providerid", userId)
        .single());

      if (data) {
        router.replace('/(shopkeeper)/home');
        return;
      }

      if (error) throw error;
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center bg-gray-100 p-6">
          <View className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <Text className="text-3xl text-center text-gray-800 mb-8 font-cormorantGaramondBold">
              Sign In
            </Text>

            {errorMessage ? (
              <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}

            <FormField
              title="Email"
              placeholder="Enter your email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              placeholder="Enter Your Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              secureTextEntry
            />

            <Button
              title={loading ? "Logging In..." : "Log In"}
              onPress={handleSignIn}
              buttonStyle="w-full mb-6"
              textStyle="text-lg"
              disabled={loading}
            />

            <View className="flex-column justify-center items-center mb-2">
              <Text className="text-gray-600">Don't have an account?</Text>
              <View className="flex-row">

                <Text className="text-gray-600"> Sign Up as </Text>
                <TouchableOpacity onPress={() => router.push('/signUp')}>
                  <Text className="text-primary font-semibold underline">Donator </Text>
                </TouchableOpacity>
                <Text className="text-gray-600">or </Text>
                <TouchableOpacity onPress={() => router.push('/signUpVendor')}>
                  <Text className="text-primary font-semibold underline">Provider</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SignIn;