import { Text, SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const FormField = ({ title, placeholder, keyboardType, value, handleChangeText, autoCapitalize }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">{title}</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg px-4">
                <TextInput
                    className="flex-1 h-12"
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
                    autoCapitalize={autoCapitalize}
                    onChangeText={handleChangeText}
                    value={value}
                />
                {(title === 'Password' || title === "Confirm Password") && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default FormField;
