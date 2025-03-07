import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Linking , } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import supabase from '../../supabase/supabaseConfig';
import Button from '../../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [location, setLocation] = useState('');
  const [user, setUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        Alert.alert('Error', 'User not logged in');
        router.replace('/signIn');
        return;
      }
      const userId = sessionData.session.user.id;
      const { data, error } = await supabase.from('user').select('*').eq('userid', userId).single();
      if (error) {
        Alert.alert('Error', 'Failed to fetch user details');
      } else {
        setUser(data);
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  // Convert Latitude/Longitude to Address
  const getReadableAddress = async (latitude, longitude) => {
    let location = await Location.reverseGeocodeAsync({ latitude, longitude });
    return location.length ? `${location[0].city}, ${location[0].region}` : 'Unknown location';
  };

  // Get Current Location
  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Allow location access to update location.');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    const readableLocation = await getReadableAddress(loc.coords.latitude, loc.coords.longitude);
    setLocation(readableLocation);
  };

  // Save Updated Location to Supabase
  const handleSaveLocation = async () => {
    if (!location || !user) {
      Alert.alert('Error', 'Please enter or fetch a location first.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('user').update({ location: location }).eq('userid', user.userid);
    if (error) {
      Alert.alert('Error', 'Failed to update location.');
    } else {
      Alert.alert('Success', 'Location updated successfully.');
    }
    setSaving(false);
  };

  // Open MetaMask Wallet
  const openMetaMask = async () => {
    const url = 'metamask://';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('MetaMask not installed', 'Please install MetaMask first.');
      Linking.openURL('https://metamask.io/download/');
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/signIn');
  };

  if (loading) return <ActivityIndicator size="large" color="blue" className="flex-1 justify-center" />;
  if (!user) return <Text className="text-center text-red-500">User not found</Text>;

  return (
   

    <View className="flex-1 bg-white p-6">
      {/* Header with Logout */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-blue-900">Profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <View className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <Text className="text-xl font-semibold mb-4 text-black">User Details</Text>
        <Text className="text-gray-700">Name</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" value={user.name} editable={false} />
        <Text className="text-gray-700">Email</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" value={user.email} editable={false} />
        <Text className="text-gray-700">Gender</Text>
        <Picker selectedValue={user.gender} enabled={false} style={{ backgroundColor: '#f1f1f1', marginBottom: 16 }}>
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Text className="text-gray-700">Phone Number</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" value={user.phoneNumber} editable={false} />
        <Text className="text-gray-700">User Type</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" value={user.userType} editable={false} />
        <Text className="text-gray-700">Impact Score</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" value={user.impactScore.toString()} editable={false} />

        {/* Editable Location Field */}
        <Text className="text-gray-700">Location</Text>
        <TextInput className="border p-2 rounded mb-4 text-black" placeholder="Enter new location" value={location} onChangeText={setLocation} />

        {/* Get Location Button */}
        <TouchableOpacity className="bg-blue-900 p-3 rounded mb-4" onPress={handleGetLocation}>
          <Text className="text-white text-center">Get Current Location</Text>
        </TouchableOpacity>

        {/* Save Button */}
        <TouchableOpacity className={`p-3 rounded ${saving ? 'bg-gray-400' : 'bg-black'}`} onPress={handleSaveLocation} disabled={saving}>
          <Text className="text-white text-center">{saving ? 'Saving...' : 'Save Location'}</Text>
        </TouchableOpacity>

        {/* Buy Token Button */}
        <View className="items-center mt-4">
          <Button title="Buy Token" onPress={openMetaMask} buttonStyle='bg-purple-700' textStyle="text-black font-bold" />
        </View>
      </View>
    </View>
  );
};

export default Profile;