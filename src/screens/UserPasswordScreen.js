import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable"; // Import animation library
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";

export default function UserPasswordScreen({ route }) {
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  // Checkbox state
  const [isChecked, setChecked] = useState(false);

  const { profileImage, nome, username, dataDiNascita, gender, email, place } =
    route.params;

  const NextTwo = () => {
    // spinner activation

    if (!isChecked) {
      alert("Non dimenticare la casella di controllo");
      setIsLoading(false);
      return;
    }

    // Password validation
    if (Password !== ConfirmPassword) {
      alert("Le password non corrispondono");
      setIsLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(Password)) {
      setIsLoading(false);
      alert(
        "La password deve contenere almeno una maiuscola, una minuscola e un carattere speciale."
      );
      return;
    }

    try {
      // Assuming you want to navigate to the next screen and pass the selected place
      navigation.navigate("UserFavoriteMusic", {
        profileImage,
        nome,
        username,
        dataDiNascita,
        gender,
        email,
        place,
        password: Password, // Pass the selected place to the next screen
      });

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error navigating to the next screen:", error);
    }
  };

  return (
    <View className="items-center justify-start h-full bg-white">
      <View className="items-center mx-24">
        <Animatable.Image
          animation="bounceInLeft"
          source={require("../screens/assets/Passwordpageicon.png")}
          resizeMode="contain"
          className="h-[280px] w-[280px] mt-12 mb-4"
        />

        <Text className="text-center text-[18px] text-[#5E5E5E] font-custom">
          Anche se non te la ricoderai tra 5 minuti 🙂
        </Text>
      </View>

      <View className="w-full px-12 mt-4 ">
        <Animatable.View
          animation="bounceInLeft"
          className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-4"
        >
          <TextInput
            value={Password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Inserisci la password"
            className=" font-custom"
          />
        </Animatable.View>

        <Animatable.View
          animation="bounceInLeft"
          className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-6"
        >
          <TextInput
            value={ConfirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Conferma la password"
            className=" font-custom"
          />
        </Animatable.View>

        <Animatable.View
          animation="bounceInLeft"
          className="flex-row items-center justify-center mt-4 mb-2 d-flex"
        >
          <Checkbox
            className="m-0  rounded-[7px] border-black mx-2"
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text className="text-bold font-custom">Mantieni accesso</Text>
        </Animatable.View>
      </View>

      <View className="mt-12">
        <Animatable.View
          animation="bounceInLeft"
          className="items-center justify-center d-flex"
        >
          <TouchableOpacity
            onPress={NextTwo}
            className="bg-black  rounded-[24px] px-32 py-[22px] items-center justify-center"
          >
            <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
              Continua
            </Text>
            {isLoading && <ActivityIndicator size="small" color="white" />}
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}
