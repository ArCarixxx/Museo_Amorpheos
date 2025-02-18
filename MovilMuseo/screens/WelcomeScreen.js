import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Museo Amorpheos</Text>
      <Image source={require('../assets/museoBolivia.jpg')} style={styles.image} />
      <Text style={styles.description}>
        ¡Bienvenidos al Museo Amorpheos, un lugar único en Bolivia donde el arte contemporáneo cobra vida! 
        Lo innovador de nuestra propuesta es que cada pintura, escultura y pieza de arte tiene un código QR debajo de ella. 
        Al escanearlo con nuestra aplicación móvil, podrás acceder a información relevante y detallada sobre la obra, 
        su creador y el mensaje que transmite. 
        ¡Ven y descubre el arte que transforma!
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  button: {
    padding: 15,
    backgroundColor: "#A44B3F",
    borderRadius: 30,
    shadowColor: "#1F41BB",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
});
