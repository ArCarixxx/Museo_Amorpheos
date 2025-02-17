import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

const placeholderImage = require('../assets/Gioconda.jpg');

const ObjetoMuseo = ({ route }) => {
  const id = "9pSn7APjIepGejEZWVHq";  // Asegura que el ID provenga de params
  const [obra, setObra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("No se proporcionó un ID de obra");
      setLoading(false);
      return;
    }

    const fetchObra = async () => {
      try {
        const obraRef = doc(db, "Objeto_museo", id);
        const obraSnap = await getDoc(obraRef);

        if (!obraSnap.exists()) {
          throw new Error('Obra no encontrada');
        }

        setObra(obraSnap.data());

        // Intentar actualizar visitas, pero manejar errores si no hay permisos
        try {
          await updateDoc(obraRef, { n_visitas: increment(1) });
        } catch (error) {
          console.warn("No se pudo actualizar el contador de visitas:", error);
        }

      } catch (error) {
        console.error("Error al obtener la obra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObra();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text style={styles.loadingText}>Cargando obra...</Text>
      </View>
    );
  }

  if (!obra) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la obra.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={obra?.imageUrl ? { uri: obra.imageUrl } : placeholderImage} 
        style={styles.image} 
        resizeMode="cover"
      />
      <Text style={styles.name}>{obra.nombre}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.details}>{obra.descripcion}</Text>
        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.details}>{obra.categoria}</Text>
        <Text style={styles.label}>Número de visitas:</Text>
        <Text style={styles.details}>{obra.n_visitas}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5dc', padding: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: '#8B4513', textAlign: 'center', marginBottom: 10 },
  infoContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, elevation: 3 },
  details: { fontSize: 18, color: '#6b4226', marginBottom: 10 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#8B4513' },
  errorText: { fontSize: 18, textAlign: 'center', color: 'red', marginTop: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f5dc" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#8B4513" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default ObjetoMuseo;