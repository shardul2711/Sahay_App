import { Text, SafeAreaView, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const FormField = ({ title, placeholder, keyboardType, value, handleChangeText, autoCapitalize }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <SafeAreaView className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">{title}</Text>
            <View className="flex-row">
                <TextInput
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={(title == "Password" || title == "Confirm Password") && !showPassword}
                    autoCapitalize={autoCapitalize}
                    onChangeText={handleChangeText}
                    value={value}

                />
                {(title === 'Password' || title === "Confirm Password") && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons
                      name={showPassword ? 'visibility' : 'visibility-off'} // Toggle icon based on state
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

export default FormField