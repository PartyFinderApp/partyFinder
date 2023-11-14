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
import { useNavigation } from "@react-navigation/native";

export default function UserResidenceScreen({ route }) {
  const [Place, setPlace] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const { profileImage, nome, username, dataDiNascita, gender, email } =
    route.params;

  const Next = () => {
    // Assuming you want to navigate to the next screen and pass the selected place
    navigation.navigate("UserPassword", {
      profileImage,
      nome,
      username,
      dataDiNascita,
      gender,
      email,
      place: Place, // Pass the selected place to the next screen
    });

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View className="items-center justify-start h-full bg-white">
      <View className="items-center mx-24">
        <Animatable.Image
          animation="bounceInLeft"
          source={require("../screens/assets/BigMap.png")}
          resizeMode="contain"
          className="h-[280px] w-[280px] mt-12"
        />

        <Text className="text-center text-[#5E5E5E] font-custom">
          Sapere da che parte del mondo arrivi ci aiuta a consigliarti eventi
          pertinenti
        </Text>
        <Text className="text-center text-[#5E5E5E] font-custom pt-2">
          Se ti posizioni in Alaska ti ritroverai solo Igloo tra i consigliati
          🥶
        </Text>
      </View>

      <View className="w-full px-12 mt-4 ">
        <Animatable.View animation="bounceInLeft" style="Your styles here">
          <TouchableOpacity
            className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
            onPress={togglePicker}
          >
            <View className="flex-row justify-between d-flex">
              <TextInput
                value={Place}
                placeholder="Dove abiti"
                editable={false} // Disable manual input
              />
              <Feather
                className="relative"
                name="map-pin"
                size={20}
                color="#6C6C6C"
              />
            </View>
          </TouchableOpacity>

          {showPicker && (
            <Picker
              selectedValue={Place}
              onValueChange={(itemValue) => {
                setPlace(itemValue);
                togglePicker(); // Close the Picker after selecting an option
              }}
            >
              <Picker.Item label="Roma" value="Roma" />
              <Picker.Item label="Milano" value="Milano" />
              <Picker.Item label="Firenze" value="Firenze" />
              <Picker.Item label="Napoli" value="Napoli" />
              <Picker.Item label="Venezia" value="Venezia" />
              <Picker.Item label="Torino" value="Torino" />
              <Picker.Item label="Bologna" value="Bologna" />
              <Picker.Item label="Genova" value="Genova" />
              <Picker.Item label="Palermo" value="Palermo" />
              <Picker.Item label="Siena" value="Siena" />
              <Picker.Item label="Verona" value="Verona" />
              <Picker.Item label="Bari" value="Bari" />
              <Picker.Item label="Catania" value="Catania" />
              <Picker.Item label="Florenz" value="Florenz" />
              <Picker.Item label="Napoli" value="Napoli" />
              <Picker.Item label="Ravenna" value="Ravenna" />
              <Picker.Item label="Pisa" value="Pisa" />
              <Picker.Item label="Lecce" value="Lecce" />
              <Picker.Item label="Perugia" value="Perugia" />
              <Picker.Item label="Cagliari" value="Cagliari" />
            </Picker>
          )}
        </Animatable.View>
      </View>

      <View className="mt-12">
        <Animatable.View
          animation="bounceInLeft"
          className="items-center justify-center d-flex"
        >
          <TouchableOpacity
            onPress={Next}
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
