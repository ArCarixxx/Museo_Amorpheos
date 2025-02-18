import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import Obra from './screens/ObraScreen';
import TutorialScreen from './screens/TutorialScreen';
import ScannerScreen from './screens/ScannerScreen';
import CameraScreen from './screens/CameraScreen';
import Home from './screens/Home';
import ListaObras from './screens/ListaObras';
import ObraDetalles from './screens/ObraDetalles';
import { UserProvider } from './contexts/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ObraInfo" component={Obra} />
          <Stack.Screen name="ListaObras" component={ListaObras} />
          <Stack.Screen name="ObraDetalles" component={ObraDetalles} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </UserProvider>
  );
}
