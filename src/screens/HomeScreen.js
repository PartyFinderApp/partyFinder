import React from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "./BottomNav/SearchScreen";
import PreferitiScreen from "./BottomNav/PreferitiScreen";
import NotificheScreen from "./BottomNav/NotificheScreen";
import AccountScreen from "./BottomNav/AccountScreen";

export default function HomeScreen({ route, navigation }) {
  const { email } = route.params;
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        showLabel: true,
        labelStyle: {
          fontWeight: "bold",
          fontFamily: "AppFontBold",
          fontSize: 12,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          opacity: 1,
        },
        tabBarIcon: ({ color, focused }) => {
          let icon;
          if (route.name === "Search") {
            icon = require("../../assets/images/home.png");
          } else if (route.name === "Preferiti") {
            icon = require("../../assets/images/heartdeux.png");
          } else if (route.name === "Notifiche") {
            icon = require("../../assets/images/bell2.png");
          } else if (route.name === "Account") {
            icon = require("../../assets/images/user-line.png");
          }

          const iconColor = focused ? "black" : "gray";

          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={icon}
                style={{ width: 26, height: 26, tintColor: iconColor }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Search"
        initialParams={{ email }}
        component={SearchScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Preferiti"
        initialParams={{ email }}
        component={PreferitiScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Notifiche"
        initialParams={{ email }}
        component={NotificheScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="Account"
        initialParams={{ email }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}
