import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./Screens/Home";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

const AuthStack = createStackNavigator();

export const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName={"Login"}>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
};