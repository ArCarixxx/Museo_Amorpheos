import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from "expo-router"; // Importa router para navegación manual
import { useCameraPermissions } from "expo-camera";

export default function ExhibitionScreen() {
    const router = useRouter(); // Hook para manejar navegación
    const [permission, requestPermission] = useCameraPermissions();
    const isPermissionGranted = Boolean(permission?.granted);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Especial</Text>
            <Image
                source={{ uri: 'https://path/to/exhibition/image.jpg' }}
                style={styles.image}
            />
            <Text style={styles.description}>
                Explora nuestra exhibición más reciente, con obras maestras de arte contemporáneo que desafían los límites de la imaginación.
            </Text>
            
            <View style={{ gap: 20 }}>
                {/* Botón para solicitar permisos de cámara */}
                <Pressable onPress={requestPermission}>
                    <Text style={styles.buttonStyle}>Solicitar Permisos</Text>
                </Pressable>

                {/* Botón para escanear QR */}
                <Pressable 
                    onPress={() => {
                        if (isPermissionGranted) {
                            router.push("../scanner"); // ✅ Usa "/" al inicio
                        } else {
                            alert("Necesitas conceder permisos de cámara.");
                        }
                    }}
                    disabled={!isPermissionGranted}
                >
                    <Text
                        style={[
                            styles.buttonStyle,
                            { opacity: !isPermissionGranted ? 0.5 : 1 },
                        ]}
                    >
                        Escanear Código
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#5F4B8B',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 22,
    },
    image: {
        width: 300,
        height: 200,
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    buttonStyle: {
        color: "#0E7AFE",
        fontSize: 20,
        textAlign: "center",
    },
});
