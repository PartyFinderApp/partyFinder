import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable"; // Import animation library
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../supabase";

export default function UserFavoriteMusicScreen({ route }) {
  const {
    profileImage,
    nome,
    username,
    dataDiNascita,
    gender,
    email,
    place,
    password,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const navigation = useNavigation();
  // Function to handle selection and update the state
  const handleSelect = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(
        selectedValues.filter((selectedValue) => selectedValue !== value)
      );
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  // Function to upload profile image to Supabase Storage
  const uploadProfileImage = async (profileImageBlob) => {
    try {
      const { data, error } = await supabase.storage
        .from("profilephotos") // Replace with your actual bucket name
        .upload(
          "profile-images/" + generateUniqueFileName(),
          profileImageBlob,
          {
            contentType: "image/png", // Set the correct content type for PNG images
          }
        );

      if (error) {
        console.error("Error uploading profile image:", error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  };

  // Generate a unique filename to avoid conflicts
  const generateUniqueFileName = () => {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2);
    return `profile_image_${timestamp}_${randomString}.png`;
  };

  const publish = async () => {
    try {
      // Check if the email is already registered
      const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("email")
        .eq("email", email);

      if (existingUserError) {
        alert("Errore durante il controllo dell'utente esistente:");
        console.error(
          "Error checking existing user:",
          existingUserError.message
        );
        return;
      }

      if (existingUser && existingUser.length > 0) {
        // User with the same email already exists
        console.error("User with this email is already registered.");
        // You can show a message to the user or handle it as needed
        return;
      }

      // If the email is not already registered, proceed with sign up

      // Upload the profile image and get the URL
      const profileImageBlob = route.params.profileImageBlob;
      const profileImageURL = await uploadProfileImage(profileImageBlob);
      setIsLoading(true);
      if (!profileImageURL) {
        return;
      }

      // Sign up the user in Supabase authentication
      const {
        user,
        session,
        error: signUpError,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        console.error("Error signing up user:", signUpError.message);
        return;
      }

      // Insert user data into the 'users' table
      const { data, error: insertError } = await supabase.from("users").insert([
        {
          profileImage: profileImageURL,
          nome,
          username,
          dataDiNascita,
          gender,
          email,
          place,
          password, // Note: You might not need to store the password in the 'users' table.
          categorie: selectedValues,
        },
      ]);

      if (insertError) {
        console.error("Error inserting user data:", insertError.message);
      } else {
        console.log("User added to Supabase:", data);
        navigation.navigate("Home", { email });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to use the selected values
  const handleUseSelectedValues = () => {
    // Access the selected values here
    console.log("Selected Values:", selectedValues);
    // You can now use the selectedValues array as needed
  };

  return (
    <View className="items-center justify-start h-full bg-white">
      <View className="w-full mt-[125px] mb-[16px]">
        <View className="mx-4">
          <View className="mb-4">
            <Text className="text-[24px] text-black font-custom2">
              Generi preferiti
            </Text>
          </View>

          <View>
            <Text className="text-[18px] text-[#A0A0A0] font-custom">
              Seleziona i generi che più ti piacciono
            </Text>
          </View>
        </View>
      </View>

      <ScrollView className="mt-2 mb-4">
        <View className="flex flex-row flex-wrap">
          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Trap")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Trap")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Trap") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Trap")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Trap") ? "#672DC6" : "black",
                }}
              >
                Trap
              </Text>

              <Image
                source={require("../screens/assets/man1.png")}
                className="w-[130px] h-[160px] relative top-4 "
              />
            </TouchableOpacity>
          </View>
          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Rap")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Rap")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Rap") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Rap")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Rap") ? "#672DC6" : "black",
                }}
              >
                Rap
              </Text>
              <Image
                source={require("../screens/assets/man2.png")}
                className="w-[130px] h-[160px] relative top-4"
              />
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Commerciale")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Commerciale")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Commerciale") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Commerciale")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Commerciale")
                    ? "#672DC6"
                    : "black",
                }}
              >
                Commerciale
              </Text>

              <Image
                source={require("../screens/assets/man3.png")}
                className="w-[130px] h-[160px] relative top-3"
              />
            </TouchableOpacity>
          </View>
          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Raggaeton")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Raggaeton")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Raggaeton") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Raggaeton")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Raggaeton")
                    ? "#672DC6"
                    : "black",
                }}
              >
                Raggaeton
              </Text>

              <Image
                source={require("../screens/assets/man4.png")}
                className="w-[130px] h-[160px] relative top-3"
              />
            </TouchableOpacity>
          </View>

          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Elettronica")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Elettronica")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Elettronica") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Elettronica")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Elettronica")
                    ? "#672DC6"
                    : "black",
                }}
              >
                Elettronica
              </Text>

              <Image
                source={require("../screens/assets/man5.png")}
                className="w-[130px] h-[160px] relative top-3"
              />
            </TouchableOpacity>
          </View>

          <View className="w-1/2 p-4">
            <TouchableOpacity
              className="rounded-[32px]"
              style={{
                backgroundColor: selectedValues.includes("Urban")
                  ? "#F2EBFD"
                  : "#F6F6F6",
                borderColor: selectedValues.includes("Urban")
                  ? "#672DC6"
                  : "#F6F6F6",
                borderWidth: selectedValues.includes("Urban") ? 2 : 1,
                borderRadius: 12,
                padding: 12,
              }}
              onPress={() => handleSelect("Urban")}
            >
              <Text
                className="justify-center mx-auto font-custom2 text-[20px]"
                style={{
                  color: selectedValues.includes("Urban") ? "#672DC6" : "black",
                }}
              >
                Urban
              </Text>
              <Image
                source={require("../screens/assets/man6.png")}
                className="w-[160px] h-[160px] relative top-3"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Animatable.View
        animation="bounceInLeft"
        className="items-center justify-center mt-4 mb-12 d-flex"
      >
        <TouchableOpacity
          onPress={publish}
          className="bg-black  rounded-[24px] px-32 py-[22px] items-center justify-center"
        >
          <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
            Continua
          </Text>
          {isLoading && <ActivityIndicator size="small" color="white" />}
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
