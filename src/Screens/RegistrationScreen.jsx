import { useState, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authOperations";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setIsShowKeyboard(false);
    });
    return () => {
      hideKeyboard.remove();
    };
  }, []);

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
      dispatch(register({ name, email, password }));
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Image
            style={styles.background}
            source={require("../images/imgBG.png")}
            resizeMode="cover"
          />

          <View style={styles.wrapper}>
            <View style={styles.avatar}>
              <View style={styles.addPhoto}>
                <Image source={require("../images/add.png")} />
              </View>
            </View>

            <Text style={{ ...styles.title, marginTop: 92 }}>Registration</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={nameHandler}
              placeholder="Username"
              placeholderTextColor="#BDBDBD"
              onPressIn={() => {
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
              onPressIn={() => {
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
                onPressIn={() => {
                  setIsShowKeyboard(true);
                }}
                onSubmitEditing={onRegister}
              />
              <Text style={styles.show} onPress={isOpenPasswordHandler}>
                {isOpenPassword ? (
                  <Ionicons
                    name="md-eye-off-outline"
                    size={30}
                    color="#bdbdbd"
                  />
                ) : (
                  <Ionicons name="md-eye-outline" size={30} color="#bdbdbd" />
                )}
              </Text>
            </View>

            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onRegister}
                  style={styles.button}
                >
                  <Text style={styles.btnTitle}>Register</Text>
                </TouchableOpacity>
                <View>
                  <Text style={styles.loginBox}>
                    Already have a profile?{" "}
                    <Text
                      style={{ color: "#FF6C00" }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Log in
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
    top: 0,
    left: 0,
  },

  wrapper: {
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
    color: "#bdbdbd",
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
    marginBottom: 70,
  },
  show: {
    position: "absolute",
    right: 10,
    top: 9,
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

    position: "absolute",
    top: -60,
    left: (windowWidth - 121) / 2,
  },

  addPhoto: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
  },
});