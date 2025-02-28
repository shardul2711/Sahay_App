import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
    return (
        <>
            <StatusBar style="dark" />
            <Stack>
                <Stack.Screen name='signUp' options={{ headerShown: false }} />
                <Stack.Screen name='signIn' options={{ headerShown: false }} />
                <Stack.Screen name='signUpVendor' options={{ headerShown: false }} />
            </Stack>
        </>
    );
}

export default AuthLayout;