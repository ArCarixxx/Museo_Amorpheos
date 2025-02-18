import React, { useState, useEffect, useRef } from "react";
import { View, Text, AppState, Platform, SafeAreaView, StatusBar, StyleSheet, Alert } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { useNavigation } from "@react-navigation/native";

export default function ScannerScreen() {
    const navigation = useNavigation();
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);
    const [scannedText, setScannedText] = useState(null);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                qrLock.current = false;
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        if (data && !qrLock.current) {
            qrLock.current = true;

            const obraId = data.trim(); 

            if (obraId.length > 5) { 
                setScannedText(`Redirigiendo a obra con ID: ${obraId}`);
                navigation.navigate("ObraInfo", { id: obraId }); 
            } else {
                Alert.alert("Error", "El código QR no contiene un ID de obra válido.");
            }

            setTimeout(() => {
                qrLock.current = false;
            }, 2000);
        }
    };

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={handleBarCodeScanned} 
            />

            <Overlay />

            {scannedText && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{scannedText}</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        position: "absolute",
        bottom: 50,
        backgroundColor: "rgba(0,0,0,0.7)",
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});