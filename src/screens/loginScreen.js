import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, ActivityIndicator } from "react-native";
import { supabase } from "../../supabase";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { s as tw } from "react-native-wind";

const LoginScreen = () => {
  // Open modal
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  // Checkbox state
  const [isChecked, setChecked] = useState(false);
  // Start a state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // loading spinner state
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // handle register link
  const register = () => {
    navigation.navigate("Register");
  };

  // handle navigation and login
  const handleLogin = async () => {
    if (!isChecked) {
      alert("Non dimenticare la casella di controllo");
      return;
    }
    try {
      setIsLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorModalVisible(true);
      } else {
        console.log("Signed in successfully:", user);
        navigation.replace("Home", { email });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // handle google sign in
  const handleLoginGoogle = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) {
        console.error("Errore", error.message);
        setErrorModalVisible(true);
      } else {
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
    <View className="h-full bg-white">
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
              className="text-lg font-custom2 text-center text-[35px] font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2"
            >
              Effettua il login
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

              <Animatable.View
                animation="bounceInRight"
                className="bg-gray-50 border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative"
              >
                <View className="absolute left-4 top-[22px]">
                  <Feather name="lock" size={20} color="#6C6C6C" />
                </View>
                <TextInput
                  placeholder="Inserisci la password"
                  className="pl-10 font-custom"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </Animatable.View>

              <Animatable.View
                animation="bounceInLeft"
                className="flex-row items-center justify-center mb-4 d-flex"
              >
                <Checkbox
                  className="m-0  rounded-[7px] border-black mx-2"
                  value={isChecked}
                  onValueChange={setChecked}
                />
                <Text className="text-bold font-custom">Mantieni accesso</Text>
              </Animatable.View>

              <Animatable.View
                animation="bounceInLeft"
                className="items-center justify-center d-flex"
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-black  rounded-[24px] px-32 py-[22px] items-center justify-center"
                >
                  <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
                    Login
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

              <View className="items-center justify-center pt-12 mb-6">
                <TouchableOpacity
                  className="flex flex-row mx-1"
                  onPress={register}
                >
                  <Text>Non hai un account?</Text>
                  <Text className="text-[#7C3AED] font-custom underline mx-1">
                    Registrati
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={tw`p-12 space-y-4 md:space-y-6 sm:p-8`}>
                <Modal visible={errorModalVisible} animationType="slide">
                  <View style={tw`items-center justify-center flex-1 p-5`}>
                  <Animatable.Image
                    source={require("../../assets/images/iconlogin.png")}
                    resizeMode="contain"
                    className="h-[60px] w-[60px] mb-4"
                  />
                  
                        <Text
                      className="font-custom"
                      style={tw`mb-4 text-lg font-semibold text-black`}
                    >
                      Utente non trovato. È necessario verificare la connessione
                      Internet o forse la tua password o la tua email sono
                      sbagliate
                    </Text>
                    <TouchableOpacity
                      style={tw`px-5 py-2 rounded-full bg-purple hover:bg-blue-600`}
                      className="rounded-[24px] px-36 py-[26px] bg-purple"
                      onPress={() => setErrorModalVisible(false)}
                    >
                      <Text
                        className="font-bold font-custom2 "
                        style={tw`text-sm font-medium text-white`}
                      >
                        Ritorna
                      </Text>
                      {isLoading && (
                        <ActivityIndicator size="small" color="white" />
                      )}
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
