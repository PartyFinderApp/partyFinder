import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { supabase } from "../../supabase";
import * as Animatable from "react-native-animatable"; // Import animation library
import { useNavigation } from "@react-navigation/native";

const TermsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState([]);
  const navigation = useNavigation();
  const press = () => {
    navigation.navigate("Register");
  };
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        // Query to terms table
        const { data: term, error } = await supabase.from("term").select("*");
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setTermsData(term);
          console.log("Fetched Data:", term); // Log the fetched data to the console
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    // Call the function to fetch data
    fetchTermsData();
  }, []);

  return (
    <View className="items-start items-center h-full pt-12 bg-white">
      {termsData.map((term, index) => (
        <View key={index} className="items-center mx-4">
          <Animatable.Image
            animation="bounceInLeft"
            source={require("../screens/assets/Passwordpageicon.png")}
            resizeMode="contain"
            className="h-[120px] w-[120px] mt-12 mb-4"
          />

          <Text className="text-lg text-black font-custom2">{term.title}</Text>

          <Text className="font-custom text-[#777070] text-md mt-[12px] text-justify mx-6">
            {term.paragraph}
          </Text>

          <Animatable.View
            animation="bounceInLeft"
            className="items-center justify-center mt-12 d-flex"
          >
            <TouchableOpacity
              onPress={press}
              className="bg-purple  rounded-[24px] px-32 py-[22px] items-center justify-center"
            >
              <Text className="text-white w-full  text-center font-custom2 font-bold text-[16px]">
                Continua
              </Text>
              {isLoading && <ActivityIndicator size="small" color="white" />}
            </TouchableOpacity>
          </Animatable.View>
        </View>
      ))}
    </View>
  );
};

export default TermsScreen;
