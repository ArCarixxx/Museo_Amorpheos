import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 250; // 📌 Tamaño del área transparente en el centro

export const Overlay = () => {
  return (
    <View style={styles.overlayContainer}>
      {/* 📌 Capa superior */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2, width }]} />

      <View style={{ flexDirection: "row" }}>
        {/* 📌 Capa izquierda */}
        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />

        {/* 📌 Área de escaneo con borde */}
        <View style={styles.transparentArea} />

        {/* 📌 Capa derecha */}
        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />
      </View>

      {/* 📌 Capa inferior */}
      <View style={[styles.overlay, { height: (height - innerDimension) / 2, width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // 📌 Asegura que cubre toda la pantalla
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // 📌 Sombra oscura semitransparente
  },
  transparentArea: {
    width: innerDimension,
    height: innerDimension,
    backgroundColor: "transparent", // 📌 Espacio vacío en el centro
    borderColor: "white", // 📌 Borde blanco para visualizar mejor el área
    borderWidth: 3,
    borderRadius: 10, // 📌 Esquinas redondeadas
  },
});

export default Overlay;
