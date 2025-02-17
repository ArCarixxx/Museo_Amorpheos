import React, { useContext, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { useCameraPermissions } from "expo-camera";

const Home = ({ navigation }) => {
    const [permission, requestPermission] = useCameraPermissions();

    // Función para solicitar permisos y navegar solo si se conceden
    const handleScanPress = async () => {
        if (!permission?.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
                Alert.alert("Permiso Denegado", "Necesitas otorgar acceso a la cámara para escanear códigos QR.");
                return; // No navegar si no se concede el permiso
            }
        }
        navigation.navigate('Scanner'); // Navegar solo si los permisos están concedidos
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Museo Amorpheos</Text>
            <Image source={require('../assets/LogoMuseo.png')} style={styles.image} />
            
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ObraInfo', { id: 1 })}
            >
                <Text style={styles.buttonText}>Información Obra</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleScanPress} // Se ejecuta la función que maneja permisos
            >
                <Text style={styles.buttonText}>Escanear QR</Text>
            </TouchableOpacity>

            <Text style={styles.description}>
                ¡Descubre el arte que transforma!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F4D3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#A44B3F',
        marginBottom: 20,
        textAlign: 'center',
    },
    image: {
        width: 179,
        height: 205,
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A44B3F',
    },
    button: {
        backgroundColor: '#A44B3F',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
        lineHeight: 22,
    },
});

export default Home;
