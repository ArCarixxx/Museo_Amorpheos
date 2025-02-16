import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 250; // Tamaño del área transparente

export const Overlay = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Área superior */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />
      
      <View style={{ flexDirection: "row" }}>
        {/* Área izquierda */}
        <View style={[styles.overlay, { width: (width - innerDimension) / 2 }]} />
        
        {/* Área central transparente */}
        <View style={styles.transparentArea} />
        
        {/* Área derecha */}
        <View style={[styles.overlay, { width: (width - innerDimension) / 2 }]} />
      </View>

      {/* Área inferior */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Sombra oscura semitransparente
  },
  transparentArea: {
    width: innerDimension,
    height: innerDimension,
    backgroundColor: "transparent", // Espacio vacío en el centro
  },
});
