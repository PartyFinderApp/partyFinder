import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, ActivityIndicator } from "react-native";
import { supabase } from "../../supabase";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { s as tw } from "react-native-wind";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const GeneralDataScreen = ({ route }) => {
  // Open modal window
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  // Checkbox state
  const [isChecked, setChecked] = useState(false);
  // Start a state
  const { email } = route.params;
  const [DataDiNascita, setDataDiNascita] = useState("");
  const [Gender, setGender] = useState("");
  const [Nome, setNome] = useState("");
  const [Username, setUsername] = useState("");

  // loading spinner state
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);


  
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

 
 


  // handle register link
  const Login = () => {
    if (!profileImage) {     
      alert("Seleziona un'immagine del profilo");
      setIsLoading(true);
      return;
    }
    if (!Nome || !Username || !DataDiNascita || !Gender ) {
      alert('Please fill in all fields');
      setIsLoading(true);
      return;
    }
    // If all fields are filled, navigate to the next screen
    navigation.navigate('UserResidence', {
      profileImage: profileImage,
      nome: Nome,
      username: Username,
      dataDiNascita: DataDiNascita,
      gender: Gender,
      email: email,
    });
  };
  



  






  // handle google sign in
  const handleLoginGoogle = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) {
        console.error("Error signing in with Google:", error.message);
        setErrorModalVisible(true);
      } else {
        console.log("Signed in with Google successfully:", user);
        navigation.replace("Home", { email: user.email });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Request permission to access the device's camera roll
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const handleProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // Use assets[0] to get the selected asset
    }
  };

  // handle Facebook sign in
  const handleLoginFacebook = async () => {};
  // handle Apple sign in
  const handleLoginApple = async () => {};

  return (
    <ScrollView className="h-full bg-white">
      <View className="h-full bg-white">
      <View className="flex flex-col items-center justify-center px-6  mt-[100px] md:h-screen lg:py-0 bg-white">
        <View className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <View className="p-6 space-y-4 md:space-y-2 sm:p-8">
            <View className="space-y-4 md:space-y-4">
              <TouchableOpacity
                className="items-center"
                onPress={handleProfilePicture}
              >
                <View className="px-[40px]    bg-[#D9D9D9] rounded-[40px] itesm-center ">
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <View className="items-center justify-center">
                      <View className="pt-10 text-white font-customs">
                        <Svg
                          width="80"
                          height="80"
                          viewBox="0 0 277 277"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M86.5621 69.25C86.5621 55.4753 92.0341 42.2648 101.774 32.5246C111.514 22.7845 124.725 17.3125 138.5 17.3125C152.274 17.3125 165.485 22.7845 175.225 32.5246C184.965 42.2648 190.437 55.4753 190.437 69.25C190.437 83.0247 184.965 96.2352 175.225 105.975C165.485 115.716 152.274 121.188 138.5 121.188C124.725 121.188 111.514 115.716 101.774 105.975C92.0341 96.2352 86.5621 83.0247 86.5621 69.25ZM43.2924 232.045C43.6816 207.051 53.8835 183.213 71.696 165.676C89.5085 148.139 113.503 138.309 138.5 138.309C163.496 138.309 187.491 148.139 205.303 165.676C223.116 183.213 233.318 207.051 233.707 232.045C233.737 233.728 233.276 235.383 232.38 236.807C231.484 238.232 230.193 239.365 228.663 240.067C200.376 253.036 169.618 259.73 138.5 259.688C106.345 259.688 75.7937 252.67 48.3361 240.067C46.8067 239.365 45.515 238.232 44.6192 236.807C43.7235 235.383 43.2624 233.728 43.2924 232.045Z"
                            fill="white"
                          />
                        </Svg>
                      </View>

                      <View className=" w-[40px] h-[40px] bg-black rounded-[200px] items-center justify-center relative bottom-0 top-0 left-14">
                        <Feather name="plus" size={20} color="white" />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              <Animatable.View
                animation="bounceInLeft"
                className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
              >
                <TextInput
                  value={Nome}
                  onChangeText={(text) => setNome(text)}
                  placeholder="Nome cognome"
                  className=" font-custom"
                />
              </Animatable.View>

              <Animatable.View
                animation="bounceInLeft"
                className="bg-gray-50  border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
              >
                <TextInput
                  value={Username}
                  onChangeText={(text) => setUsername(text)}
                  placeholder="Nome utente"
                  className=" font-custom"
                />
              </Animatable.View>

                     
              <Animatable.View
                animation="bounceInLeft"
                className="bg-gray-50 border border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
              >
                <TextInput
                  value={DataDiNascita}
                  onChangeText={(text) => setDataDiNascita(text)}
                  placeholder="Data di nascita"
                  className="font-custom"
                />
              </Animatable.View>

             
          

              <Animatable.View
                animation="bounceInLeft"
                style="Your styles here"
              >
                <TouchableOpacity
                  className="bg-gray-50  border  border-[#CFCFCF] font-custom text-[#6C6C6C] sm:text-sm rounded-[16px] focus:ring-primary-600 focus:border-primary-600 block w-full p-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:border-2 focus:border-[#7C3AED] relative mb-2"
                  onPress={togglePicker}
                >
                  <View className="flex-row justify-between d-flex">
                  <TextInput
                    value={Gender}
                    placeholder="Gender"
                    style="Your styles here"
                    editable={false} // Disable manual input
                  />
                <Feather className="relative" name="arrow-down" size={20} color="#CFCFCF" />

                  </View>
                  
                </TouchableOpacity>

                {showPicker && (
                  <Picker
                    selectedValue={Gender}
                    onValueChange={(itemValue) => {
                      setGender(itemValue);
                      togglePicker(); // Close the Picker after selecting an option
                    }}
                  >
                    <Picker.Item label="Maschio" value="Male" />
                    <Picker.Item label="Femmina" value="Female" />
                  </Picker>
                )}
              </Animatable.View>

              <Animatable.View
                animation="bounceInLeft"
                className="items-center justify-center d-flex"
              >
                <TouchableOpacity
                  onPress={Login}
                  className="bg-black  rounded-[24px] px-32 py-[22px] items-center justify-center"
                >
                  <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
                    Continua
                  </Text>
                  {isLoading && (
                    <ActivityIndicator size="small" color="white" />
                  )}
                </TouchableOpacity>
              </Animatable.View>

              <View style={tw`p-12 space-y-4 md:space-y-6 sm:p-8`}>
                <Modal visible={errorModalVisible} animationType="slide">
                  <View style={tw`items-center justify-center flex-1 p-5`}>
                    <Text
                      className="font-custom"
                      style={tw`mb-4 text-xl font-semibold text-red-600`}
                    >
                      Utente non trovato. È necessario verificare la connessione
                      Internet o forse la tua password o la tua email sono
                      sbagliate
                    </Text>
                    <TouchableOpacity
                      style={tw`px-5 py-2 bg-black rounded-full hover:bg-blue-600`}
                      className="rounded-[24px] px-36 py-[26px]"
                      onPress={() => setErrorModalVisible(false)}
                    >
                      <Text
                        className="font-bold font-custom2"
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
    </ScrollView>
   
  );
};

export default GeneralDataScreen;
