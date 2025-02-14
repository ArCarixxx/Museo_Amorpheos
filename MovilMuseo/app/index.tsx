import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Pantalla de inicio
function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenidos al Museo Amorpheos</Text>
      <Image
        source={{ uri: 'https://path/to/your/image.jpg' }} // Cambia esto por una URL o una imagen local
        style={styles.image}
      />
      <Text style={styles.description}>
        El Museo Amorpheos alberga una colección única de arte contemporáneo. Explora nuestras exhibiciones y descubre el arte que transforma.
      </Text>
      <Button
        title="Explorar Exhibiciones"
        onPress={() => navigation.navigate('Details')}
        color="#5F4B8B" // Un color atractivo que puedes personalizar
      />
    </ScrollView>
  );
}

// Pantalla de detalles
function DetailsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exhibiciones Destacadas</Text>
      <Text style={styles.description}>
        Descubre las colecciones más impactantes del Museo Amorpheos, una experiencia que cautivará tus sentidos.
      </Text>
      <Image
        source={{ uri: 'https://path/to/another/image.jpg' }} // Otra imagen relevante
        style={styles.image}
      />
    </ScrollView>
  );
}

// Crear el stack navigator
const Stack = createStackNavigator();

// Componente principal
export default function App() {
  return (
    <PaperProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </PaperProvider>
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
});
