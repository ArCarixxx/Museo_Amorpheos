import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

const Tutorial = () => {
  const videoRef = React.useRef(null);
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../assets/Tutorial.mp4") }
        style={styles.video}
        useNativeControls
        resizeMode="cover"
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default Tutorial;
