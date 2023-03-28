import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "../PostsScreen";
import { CreatePostScreen } from "../CreatePostScreen";
import { ProfileScreen } from "../ProfileScreen";

export const HomeTabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <HomeTabs.Navigator initialRouteName={"Posts"}>
      <HomeTabs.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 100,
                  backgroundColor: focused ? "#FF6C00" : "#ffffff",
                }}
              >
                <Ionicons
                  name="ios-grid-outline"
                  size={size}
                  color={focused ? "#ffffff" : "#bdbdbd"}
                />
              </View>
            );
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <HomeTabs.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: focused ? "#FF6C00" : "#ffffff",
              }}
            >
              <Ionicons
                name="ios-add"
                size={size}
                color={focused ? "#ffffff" : "#bdbdbd"}
              />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <HomeTabs.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 100,
                backgroundColor: focused ? "#FF6C00" : "#ffffff",
              }}
            >
              <Feather
                name="user"
                size={size}
                color={focused ? "#ffffff" : "#bdbdbd"}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </HomeTabs.Navigator>
  );
};