import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const placeholderImage = require('../assets/Gioconda.jpg')

const ObjetoMuseo = () => {
  const [obra, setObra] = useState({
    nombre: 'La Gioconda',
    descripcion: 'Una de las pinturas más famosas del mundo, obra de Leonardo da Vinci.',
    categoria: 'Pintura',
    n_visitas: 1500000,
    latitude: 48.860611,
    longitude: 2.337644,
    imageUrl: null,
  });
  return (
    <View style={styles.container}>
      <Image 
        source={obra.imageUrl ? { uri: obra.imageUrl } : placeholderImage} 
        style={styles.image} 
      />
      <Text style={styles.name}>{obra.nombre}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.details}>{obra.descripcion}</Text>
      <Text style={styles.label}>Categoría:</Text>
      <Text style={styles.details}>{obra.categoria}</Text>
      <Text style={styles.label}>Número de visitas:</Text>
      <Text style={styles.details}>{obra.n_visitas}</Text>
      <Text style={styles.label}>Ubicación:</Text>
      <Text style={styles.details}>Latitud: {obra.latitude}, Longitud: {obra.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5dc',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  details: {
    fontSize: 18,
    color: '#6b4226',
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
});


export default ObjetoMuseo;
