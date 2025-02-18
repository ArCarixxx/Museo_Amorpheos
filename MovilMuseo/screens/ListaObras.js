import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const ListaObras = ({ navigation }) => {
    const [obras, setObras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchObras = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Objeto_museo"));
                const obrasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                
                const sortedObras = obrasData.sort((a, b) => (b.n_visitas || 0) - (a.n_visitas || 0));
                setObras(sortedObras);
            } catch (error) {
                console.error("Error al obtener obras:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchObras();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8B4513" />
                <Text style={styles.loadingText}>Cargando obras...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Obras (Ordenadas por visitas)</Text>
            <FlatList
                data={obras}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('ObraDetalles', { id: item.id })}
                    >
                        <Text style={styles.itemTitle}>{item.nombre} ({item.n_visitas || 0} visitas)</Text>
                        <Text style={styles.itemDesc}>{item.descripcion.substring(0, 50)}...</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F4D3', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#A44B3F', textAlign: 'center', marginBottom: 20 },
    item: { backgroundColor: '#A44B3F', padding: 15, borderRadius: 10, marginBottom: 10 },
    itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    itemDesc: { fontSize: 14, color: '#ddd' },
    loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F7F4D3" },
    loadingText: { marginTop: 10, fontSize: 16, color: "#A44B3F" }
});

export default ListaObras;