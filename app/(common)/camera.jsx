import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";

export default function CameraScreen() {
    const [facing, setFacing] = useState("back");
    const [photo, setPhoto] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null); // Reference to CameraView

    console.log("Camera Permission:", permission); // Debugging

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ textAlign: "center", paddingBottom: 10 }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    async function takePicture() {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync(); // Capture the image
            setPhoto(photo.uri); // Store image URI
        }
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    function retakePicture() {
        setPhoto(null); // Reset photo state to take a new picture
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {photo ? (
                // Preview the clicked image
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={{ uri: photo }} style={{ width: "90%", height: "80%", borderRadius: 10 }} />
                    <TouchableOpacity
                        onPress={retakePicture}
                        style={{
                            marginTop: 20,
                            backgroundColor: "red",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text style={{ color: "white" }}>Retake Picture</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <CameraView
                        style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "black" }}
                        facing={facing}
                        ref={cameraRef}
                    />
                    <View
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: 0,
                            right: 0,
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={takePicture}
                            style={{
                                backgroundColor: "white",
                                padding: 15,
                                borderRadius: 50,
                            }}
                        >
                            <Text>📸</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleCameraFacing}
                            style={{
                                marginTop: 10,
                                backgroundColor: "gray",
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Flip Camera</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}
