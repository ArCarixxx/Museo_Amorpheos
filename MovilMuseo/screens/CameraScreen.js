import {
    Image,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    StatusBar,
    SafeAreaView,
    Alert,
  } from "react-native";
  import * as MediaLibrary from "expo-media-library";
  import React, { useState, useRef, useContext } from "react";
  
  import { Camera, CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
  import { Audio } from "expo-av";
  import * as FileSystem from 'expo-file-system';
  import { API_URL } from '@env';
import { UserContext } from "../contexts/UserContext";
  
  function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [videoPath, setVideoPath] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [type, setType] = React.useState("back");
    const { user } = useContext(UserContext);
    function toggleCameraFacing() {
      setType((current) => (current === "back" ? "front" : "back"));
    }
    const cameraRef = React.useRef(null); // Using React.useRef to create a ref
    const [isRecording, setIsRecording] = React.useState(false);
    const timerRef = useRef(null);
  
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
  
    const sendVideoToApi = async (uri) => {
      const timeout = 600000; 
      const controller = new AbortController(); 
      const signal = controller.signal;
    
      const timeoutId = setTimeout(() => controller.abort(), timeout);
    
      try {
        const videoBase64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
    
        console.log("Archivo leído como base64");
        const now = new Date();
        const formattedDate = now.toISOString().replace(/[-:T]/g, '').slice(0, 15) + now.toISOString().slice(17, 19);
    
        const payload = {
          nombre: `video${formattedDate}.mov`, 
          descripcion: "descripcion",
          video_base64: videoBase64, 
          persona_idPersona: user.idPersona,
        };
    
        const response = await fetchWithTimeout(`${API_URL}/videos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal, 
        });
    
        clearTimeout(timeoutId); 
    
        if (!response.ok) {
          console.log(response)
          console.log(response.statusText)
          throw new Error(`Error en la API: ${response.statusText}`);
        }
    
        console.log("Video enviado con éxito:", await response.json());
        Alert.alert("Video subido Correctamente");
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("La solicitud fue cancelada por el tiempo de espera.");
          Alert.alert("Error", "La solicitud excedió el tiempo de espera.");
        } else {
          console.error("Error al enviar el video a la API:", error);
        }
      }
    };
    const fetchWithTimeout = (url, options = {}, timeout = 60000) => {
      const controller = new AbortController(); 
      const signal = controller.signal;
    
      const timeoutId = setTimeout(() => controller.abort(), timeout);
    
      const fetchOptions = { ...options, signal };
    
      return fetch(url, fetchOptions)
        .then(response => {
          clearTimeout(timeoutId); 
          return response;
        })
        .catch(error => {
          clearTimeout(timeoutId); 
          throw error; 
        });
    };
    
  
    const startRecording = async () => {
      setVideoPath(null);
      if (cameraRef.current) {
        try {
          setRecordingTime(0);
          timerRef.current = setInterval(() => {
            setRecordingTime((prevTime) => prevTime + 1);
          }, 1000);
  
          setIsRecording(true);
          const data = await cameraRef.current.recordAsync({ quality: '480p' });
          console.log("Video grabado en:", data.uri);
  
          sendVideoToApi(data.uri);
  
        } catch (error) {
          console.error("Error recording video:", error);
        }
      }
    };
  
    const stopRecording = async () => {
      if (cameraRef.current && isRecording) {
        try {
          clearInterval(timerRef.current);
          await cameraRef.current.stopRecording();
          setIsRecording(false);
        } catch (error) {
          console.error('Error al pausar:', error);
        }
      }
    };
  
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View
          style={{
            backgroundColor: "black",
            flex: 1,
            alignContent: "center",
            alignItems: "center",
  
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              alignSelf: "center",
              color: "white",
              fontWeight: "600",
            }}
          >
            We need your permission to show the camera
          </Text>
          <TouchableOpacity
            onPress={() => {
              Audio.requestPermissionsAsync();
              MediaLibrary.requestPermissionsAsync();
              requestPermission();
              requestMicrophonePermission();
            }}
            style={{
              textAlign: "center",
              alignSelf: "center",
              backgroundColor: "white",
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 23,
              paddingRight: 23,
              marginTop: 10,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              grant permission
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          mode="video"
          style={{ flex: 1 }}
          facing={type}
          ref={cameraRef}
  
        >
          <StatusBar animated={true} backgroundColor="transparent" />
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                stopRecording();
              }}
              style={{
                height: 26,
                width: 60,
                paddingLeft: 30,
                backgroundColor: "transparent",
              }}
            >
              <Image
                source={require("../assets/arrow.png")}
                style={{
                  height: "100%",
                  width: "100%",
  
                  borderRadius: 18,
                }}
              />
            </TouchableOpacity>
  
            <View
              style={{
                alignSelf: "flex-end",
                alignContent: "flex-end",
                height: "95%",
  
                alignItems: "baseline",
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={toggleCameraFacing}>
                <Image
                  source={require("../assets/turn.png")}
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    right: 25,
                    height: 50,
                    width: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                height: "20%",
                backgroundColor: "transparent",
                zIndex: 4,
              }}
            >
              <Pressable
                onPress={isRecording ? stopRecording : startRecording}
                style={{
                  height: 72,
                  width: 72,
                  alignSelf: "center",
                  top: -70,
                }}
              >
                <Image
                  source={
                    isRecording
                      ? require("../assets/reccircle.png")
                      : require("../assets/circle.png")
                  }
                  style={{
                    alignSelf: "center",
                    alignItems: "baseline",
                    padding: 10,
  
                    height: 72,
                    width: 72,
                  }}
                ></Image>
  
                {(isRecording) && (
                  <View >
                    <Text>{formatTime(recordingTime)}</Text>
                  </View>
                )}
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    top: -100,
                    alignSelf: "center",
                  }}
                ></Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </CameraView>
      </View>
    );
  }
  export default CameraScreen;
  