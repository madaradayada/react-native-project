import { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const nameHandler = (text) => {
    setName(text);
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

  const onRegister = () => {
    if (name !== "" && email !== "" && password !== "") {
      console.log({ name, email, password });
    } else {
      setIsShowKeyboard(false);
      return alert("Fill in all the fields!!!");
    }

    setName("");
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
            marginTop: isShowKeyboard ? 150 : 260,
          }}
        >
          <View style={styles.formContainer}>
            <View style={styles.avaWrapper}>
              <View style={styles.avatar}>
                <View style={styles.addPhoto}>
                  <Image source={require("../images/add.png")} />
                </View>
              </View>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <Text style={styles.title}>Registration</Text>

                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Username"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onSubmitEditing={onRegister}
                />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onSubmitEditing={onRegister}
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
                    onSubmitEditing={onRegister}
                  />
                  <Text style={styles.show} onPress={isOpenPasswordHandler}>
                    {isOpenPassword ? "hide" : "show"}
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>

            {isShowKeyboard ? (
              ""
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onRegister}
                  style={styles.button}
                >
                  <Text style={styles.btnTitle}>Register</Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      ...styles.loginBox,
                      marginBottom: 78,
                    }}
                  >
                    Already have a profile? Log in
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
    top: 0,
    left: 0,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 25.5,
    padding: 16,
    marginTop: 30,
    marginBottom: 16,
  },
  btnTitle: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#ffffff",
    fontFamily: "Roboto-Regular",
  },
  loginBox: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  show: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  title: {
    marginBottom: 30,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    marginHorizontal: "auto",
  },
  avaWrapper: {
    position: "absolute",
    top: -60,
    width: "100%",
    alignItems: "center",
  },
  addPhoto: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
  },
});