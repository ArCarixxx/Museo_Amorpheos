import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
//import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScannerScreen({ navigation }: { navigation: any }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      //const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    Alert.alert('Código Escaneado', `Dato: ${data}`, [
      { text: 'OK', onPress: () => navigateToScreen(data) },
    ]);
  };

  const navigateToScreen = (data: string) => {
    if (data === 'exhibition') {
      navigation.navigate('Exhibition');
    } else if (data === 'details') {
      navigation.navigate('Details');
    } else {
      Alert.alert('Código no reconocido', 'No se encontró una ruta válida.');
    }
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se concedió el permiso para usar la cámara.</Text>;
  }

  /*return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title="Escanear de nuevo" onPress={() => setScanned(false)} />
      )}
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
