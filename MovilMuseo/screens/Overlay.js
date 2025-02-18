import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 250; 

export const Overlay = () => {
  return (
    <View style={styles.overlayContainer}>

      <View style={[styles.overlay, { height: (height - innerDimension) / 2, width }]} />

      <View style={{ flexDirection: "row" }}>

        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />

        <View style={styles.transparentArea} />

        <View style={[styles.overlay, { width: (width - innerDimension) / 2, height: innerDimension }]} />
      </View>

      <View style={[styles.overlay, { height: (height - innerDimension) / 2, width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, 
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  transparentArea: {
    width: innerDimension,
    height: innerDimension,
    backgroundColor: "transparent", 
    borderColor: "white", 
    borderWidth: 3,
    borderRadius: 10, 
  },
});

export default Overlay;