import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";

export const LoginScreen = ({ styles }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const emailHandler = (text) => {
    setEmail(text);
  };
  const passwordHandler = (text) => {
    setPassword(text);
  };
  const isOpenPasswordHandler = () => {
    setIsOpenPassword(!isOpenPassword);
  };

  const onLogin = () => {
    console.log({ email, password });

    setEmail("");
    setPassword("");
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.background}
          source={require("../images/imgBG.png")}
          resizeMode="cover"
        />
        <View
          style={{
            ...styles.wrapper,
            marginTop: isShowKeyboard ? 270 : 320,
          }}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={emailHandler}
                placeholder="Email"
                placeholderTextColor="#BDBDBD"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onSubmitEditing={onLogin}
              />
              <View>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={passwordHandler}
                  secureTextEntry={!isOpenPassword}
                  placeholder="Password"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onSubmitEditing={onLogin}
                />
                <Text style={styles.show} onPress={isOpenPasswordHandler}>
                  {isOpenPassword ? "hide" : "show"}
                </Text>
              </View>
            </KeyboardAvoidingView>
            {isShowKeyboard ? (
              ""
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onLogin}
                  style={styles.button}
                >
                  <Text style={styles.btnTitle}>Login</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.loginBox}>
                    Don't have a profile? Register
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};