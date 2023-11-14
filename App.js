import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, Image } from "react-native"; // Import View, Text, and Animated from 'react-native'
import { useFonts } from "expo-font"; // Import Expo Font
import * as Animatable from "react-native-animatable"; // Import animation library
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg"; // using svg becuase the quality of the icon is better
import { useNavigation } from "@react-navigation/native"; // use navigation
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LottieView from "lottie-react-native";
import loginScreen from "./src/screens/loginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import GeneralDataScreen from "./src/screens/UserGeneralDataScreen";
import UserResidenceScreen from "./src/screens/UserResidenceScreen";
import TermsScreen from "./src/screens/TermsScreen";
import UserPasswordScreen from "./src/screens/UserPasswordScreen";
import UserFavoriteMusicScreen from "./src/screens/UserFavoriteMusicSceen";

const Stack = createStackNavigator();
// ininitialized the top navigation
const Tab = createMaterialTopTabNavigator();

const TopBarNavigation = () => (
  <View className="h-full px-4 bg-white">
    <Tab.Navigator
      className="mt-12"
      screenOptions={({ route }) => ({
        tabBarLabel: "", // Hide the tab label
        tabBarStyle: {
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#CFCFCF",
        }, // Set the background color and border of the tab bar
        tabBarIndicatorStyle: {
          backgroundColor:
            route.name === "OnboardingScreen" ? "#000000" : "#000000", // Set different colors for different tabs
          height: 3,
          padding: 2,
          borderRadius: 100, // Adjust the height of the indicator line
          marginBottom: 4, // Add margin at the bottom of the indicator line
        },
      })}
    >
      <Tab.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Tab.Screen name="OnboardingScreenTwo" component={OnboardingScreenTwo} />
      <Tab.Screen
        name="OnboardingScreenThree"
        component={OnboardingScreenThree}
      />
    </Tab.Navigator>
  </View>
);

//building the first screen of the app
const OnboardingScreen = ({ route }) => {
  const animation = useRef(null);
  useEffect(() => {}, []);
  // initialize the navigation
  const navigation = useNavigation();
  // navigate from first to the second screen of the app
  const handle = () => {
    navigation.navigate("OnboardingScreenTwo");
  };
  return (
    <Animatable.View animation="bounceInLeft" className="flex-1 bg-white">
      <Animatable.View
        className="items-center justify-center flex-1"
        animation="bounceInLeft"
      >
        <Animatable.Text className="text-[35px] font-bold font-custom2">
          Tutto in una sola app
        </Animatable.Text>
        <Animatable.View
          className="items-center px-10"
          animation="bounceInLeft"
        >
          <Animatable.Text className="text-[#A0A0A0] text-[20px] font-custom text-center mt-4 font-bold">
            Cerca eventi, artisti, format o discoteche comodamente da una sola
            app senza troppi sbatti
          </Animatable.Text>

          <Animatable.Image
            animation="bounceInLeft"
            source={require("./assets/images/Emoji.png")}
            resizeMode="contain"
            className="h-[350px] w-[350px]"
          />
        </Animatable.View>
      </Animatable.View>

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={handle}
          className="border border-2 border-black px-4 py-4 rounded-[20px]"
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 45 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6 59.3516L38.7129 32.3392"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M6.29688 5L39.0008 32.122"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

//building the first screen of the app
const OnboardingScreenTwo = ({ route }) => {
  const animation = useRef(null);
  useEffect(() => {}, []);
  // initialize the navigation
  const navigation = useNavigation();
  // navigate from first to the second screen of the app
  const handleTwo = () => {
    navigation.navigate("OnboardingScreenThree");
  };
  return (
    <Animatable.View animation="bounceInLeft" className="flex-1 bg-white">
      <Animatable.View
        className="items-center justify-center flex-1"
        animation="bounceInLeft"
      >
        <Animatable.Text className="text-[35px] font-bold font-custom2">
          Rimani aggiornato
        </Animatable.Text>
        <Animatable.View
          className="items-center px-10"
          animation="bounceInLeft"
        >
          <Animatable.Text className="text-[#A0A0A0] text-[20px] font-custom text-center mt-4 font-bold">
            Tu pensa ad aggiungere i tuoi artisti, locali o format preferiti Ci
            penseremo noi ad aggiornarti tramite le notifiche
          </Animatable.Text>

          <Animatable.Image
            animation="bounceInLeft"
            source={require("./assets/images/heart.png")}
            resizeMode="contain"
            className="h-[320px] w-[320px]"
          />
        </Animatable.View>
      </Animatable.View>

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={handleTwo}
          className="border border-2 border-black px-4 py-4 rounded-[20px]"
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 45 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6 59.3516L38.7129 32.3392"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M6.29688 5L39.0008 32.122"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

//building the first screen of the app
const OnboardingScreenThree = ({ route }) => {
  const animation = useRef(null);
  useEffect(() => {}, []);
  // initialize the navigation
  const navigation = useNavigation();
  // navigate from first to the second screen of the app
  const handleThree = () => {
    navigation.navigate("Login");
  };
  return (
    <Animatable.View animation="bounceInLeft" className="flex-1 bg-white">
      <Animatable.View
        className="items-center justify-center flex-1"
        animation="bounceInLeft"
      >
        <Animatable.Text className="text-[35px] font-bold font-custom2">
          Vinci numerosi premi
        </Animatable.Text>
        <Animatable.View
          className="items-center px-10"
          animation="bounceInLeft"
        >
          <Animatable.Text className="text-[#A0A0A0] text-[20px] font-custom text-center mt-4 font-bold">
            Più ci aiuterai e maggiori saranno le possibilita’ di ricevere una
            ricompensa
          </Animatable.Text>

          <Animatable.Image
            animation="bounceInLeft"
            source={require("./assets/images/earth.png")}
            resizeMode="contain"
            className="h-[350px] w-[350px]"
          />
        </Animatable.View>
      </Animatable.View>

      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          onPress={handleThree}
          className="border border-2 border-black px-4 py-4 rounded-[20px]"
        >
          <Svg
            width={25}
            height={25}
            viewBox="0 0 45 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6 59.3516L38.7129 32.3392"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
            <Path
              d="M6.29688 5L39.0008 32.122"
              stroke="black"
              strokeWidth={10}
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

//Start my App
export default function App() {
  //Loading the font
  const [fontsLoaded] = useFonts({
    AppFont: require("./assets/fonts/SofiaProRegular.ttf"),
    AppFontBold: require("./assets/fonts/SofiaProBold.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (!fontsLoaded || isLoading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TopNav">
        <Stack.Screen
          options={{ headerShown: false }}
          name="TopNav"
          component={TopBarNavigation}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={loginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="GeneralData"
          component={GeneralDataScreen}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity className="ml-4" onPress={onPress}>
                <Feather name="arrow-left" size={33} color="black" />
              </TouchableOpacity>
            ),
            title: "Dati Utente",
            headerTitleStyle: {
              fontFamily: "AppFontBold",
              fontSize: 24, // Set your custom font family here
            },
          }}
        />

        <Stack.Screen
          name="UserResidence"
          component={UserResidenceScreen}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity className="ml-4" onPress={onPress}>
                <Feather name="arrow-left" size={33} color="black" />
              </TouchableOpacity>
            ),
            title: "Dove abiti",
            headerTitleStyle: {
              fontFamily: "AppFontBold",
              fontSize: 24, // Set your custom font family here
            },
          }}
        />

        <Stack.Screen
          name="UserPassword"
          component={UserPasswordScreen}
          options={{
            headerLeft: ({ onPress }) => (
              <TouchableOpacity className="ml-4" onPress={onPress}>
                <Feather name="arrow-left" size={33} color="black" />
              </TouchableOpacity>
            ),
            title: "Crea una password",
            headerTitleStyle: {
              fontFamily: "AppFontBold",
              fontSize: 24, // Set your custom font family here
            },
          }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="UserFavoriteMusic"
          component={UserFavoriteMusicScreen}
        />

        <Stack.Screen
          options={{ headerShown: true }}
          name="Terms"
          component={TermsScreen}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
