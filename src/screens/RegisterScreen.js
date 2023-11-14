import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { supabase } from "../../supabase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { s as tw } from "react-native-wind";

const RegisterScreen = () => {
  // Open modal window
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  // Checkbox state
  const [isChecked, setChecked] = useState(false);
  // Start a state
  const [email, setEmail] = useState("");
  // loading spinner state
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState("");

  // handle register link
  const Login = () => {
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    // control the checkbox state
    if (!isChecked) {
      alert("Si prega di accettare i termini e l'informativa sulla privacy");
      setIsLoading(true);
      return;
    }

    // control the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError("Inserisci una email valida");
      alert("Inserisci una email valida");
      return;
    }
    navigation.navigate("GeneralData", { email });
  };

  const handleTerm = () => {
    navigation.navigate("Terms");
  };

  // handle google sign in
  const handleLoginGoogle = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) {
        console.error("", error.message);
        setErrorModalVisible(true);
      } else {
        setIsLoading(true);
        console.log("successo con gogole", user);
        navigation.replace("Home", { email: user.email });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // handle Facebook sign in
  const handleLoginFacebook = async () => {};
  // handle Apple sign in
  const handleLoginApple = async () => {};

  return (
    <ScrollView className="h-full bg-white">
      <View className="flex flex-col items-center justify-center px-6  mt-[100px] md:h-screen lg:py-0 bg-white">
        <View className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <View className="p-6 space-y-4 md:space-y-2 sm:p-8">
            <View className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <Animatable.Image
                source={require("../../assets/images/iconlogin.png")}
                resizeMode="contain"
                className="h-[60px] w-[60px]"
              />
            </View>
            <Animatable.Text
              animation="bounceInLeft"
              className="mb-2 text-lg font-bold leading-tight tracking-tight text-center text-gray-900 font-custom2 md:text-2xl dark:text-white"
            >
              Registrati
            </Animatable.Text>
            <View className="space-y-4 md:space-y-4">
              <Animatable.View
                animation="bounceInLeft"
                className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
              >
                <View className="absolute left-4 top-[22px]">
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 57 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M3.71191 20.8086V41.1861C3.71191 43.0758 4.4513 44.888 5.76741 46.2242C7.08353 47.5604 8.86856 48.3111 10.7298 48.3111H45.8194C47.6807 48.3111 49.4657 47.5604 50.7818 46.2242C52.0979 44.888 52.8373 43.0758 52.8373 41.1861V20.8086L31.952 33.8545C30.8461 34.5452 29.5731 34.911 28.2746 34.911C26.9762 34.911 25.7031 34.5452 24.5972 33.8545L3.71191 20.8086Z"
                      fill="#6C6C6C"
                    />
                    <Path
                      d="M52.8373 16.6253V16.25C52.8373 14.3603 52.0979 12.5481 50.7818 11.2119C49.4657 9.87567 47.6807 9.125 45.8194 9.125H10.7298C8.86856 9.125 7.08353 9.87567 5.76741 11.2119C4.4513 12.5481 3.71191 14.3603 3.71191 16.25V16.6253L26.4359 30.823C26.9889 31.1684 27.6254 31.3513 28.2746 31.3513C28.9238 31.3513 29.5603 31.1684 30.1133 30.823L52.8373 16.6253Z"
                      fill="#6C6C6C"
                    />
                  </Svg>
                </View>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Inserisci la mail"
                  className="pl-10 font-custom"
                />
              </Animatable.View>

              <View className="items-center justify-center pt-12 mb-6">
                <View className="flex-row items-center">
                  <Checkbox
                    className="m-0 rounded-[7px] border-black mx-4"
                    value={isChecked}
                    onValueChange={setChecked}
                  />

                  <TouchableOpacity onPress={handleTerm}>
                    <Text className="text-black font-custom">
                      <Text>Accetta </Text>
                      <Text className="text-purple-500 underline font-custom">
                        Termini
                      </Text>
                      <Text> e </Text>
                      <Text className="text-purple-500 underline font-custom">
                        policy privacy
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Animatable.View
                animation="bounceInLeft"
                className="items-center justify-center d-flex"
              >
                <TouchableOpacity
                  onPress={handleRegister}
                  className="bg-black  rounded-[24px] px-28 py-[22px] items-center justify-center"
                >
                  <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
                    Registrati
                  </Text>
                  {isLoading && (
                    <ActivityIndicator size="small" color="white" />
                  )}
                </TouchableOpacity>
              </Animatable.View>

              <Animatable.View className="pt-4">
                <View className="flex-row items-center">
                  <View className="flex-1 h-px bg-[#CFCFCF] " />
                  <View className="items-center px-4 flex-2">
                    <Text className="text-center text-[#CFCFCF] font-custom">
                      oppure
                    </Text>
                  </View>
                  <View className="flex-1 h-px bg-[#CFCFCF]" />
                </View>
              </Animatable.View>

              <Animatable.View className="flex-row items-center justify-center pt-4 mt-12 d-flex">
                <TouchableOpacity
                  onPress={handleLoginFacebook}
                  className="bg-white border-2 border-[#CFCFCF] w-full rounded-[20px] px-4 py-4 mr-2 items-center"
                >
                  <Image
                    source={require("../../assets/images/facebookIcon.png")}
                    className="w-[30px] h-[30px] "
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLoginApple}
                  className="bg-white border-2 border-[#CFCFCF] w-full rounded-[20px] px-4 py-4 ml-2 items-center"
                >
                  <Image
                    source={require("../../assets/images/Apple.png")}
                    className="w-[27px] h-[30px]"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLoginGoogle}
                  className="bg-white border-2 border-[#CFCFCF] w-full rounded-[20px] px-4 py-4 ml-4 items-center"
                >
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="w-[30px] h-[30px]"
                  />
                </TouchableOpacity>
              </Animatable.View>

              <View className="items-center justify-center pt-12 mb-6 ">
                <TouchableOpacity
                  className="flex flex-row mx-1"
                  onPress={Login}
                >
                  <Text>Hai già un account?</Text>
                  <Text className="text-[#7C3AED] font-custom underline mx-1">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>

             
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
