import React, { useContext } from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import { UserContext } from '../contexts/UserContext';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Museo Amorpheos</Text>
            <Image source={require('../assets/LogoMuseo.png')} style={styles.image} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ObraInfo', { id: 1 })}
            >
                <Text style={styles.buttonText}>informacion Obra</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Camera')}
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
        backgroundColor: '#F7F4D3', // Fondo con el color deseado
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
        elevation: 5, // Sombra en Android
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
