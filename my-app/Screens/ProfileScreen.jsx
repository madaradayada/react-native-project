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
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "../router";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        style={styles.background}
        source={require("../images/imgBG.png")}
        resizeMode="cover"
      />

      <View style={styles.wrapper}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImg}
            source={require("../images/userAva.jpg")}
          />
          <View style={styles.addPhoto}>
            <Image source={require("../images/delete.png")} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            style={{ position: "absolute", top: 22, right: 16 }}
            source={require("../images/log-out.png")}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.title, marginTop: 92 }}>Natali Romanova</Text>
        <View style={{ marginBottom: 0 }}>
          <View style={{ marginBottom: 24 }}>
            <Image
              style={{ width: "100%", borderRadius: 8 }}
              source={require("../images/111.png")}
            />
            <Text
              style={{
                ...styles.contentText,
                fontFamily: "Roboto-Medium",
                marginVertical: 8,
              }}
            >
              Wood
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 24,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/commentIcon.png")}
                  />
                  <Text style={styles.contentText}>8</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/likeIcon.png")}
                  />
                  <Text style={styles.contentText}>153</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ marginRight: 4 }}
                  source={require("../images/map-pin.png")}
                />
                <Text
                  style={{
                    ...styles.contentText,
                    textDecorationLine: "underline",
                  }}
                >
                  Ukraine
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Image
              style={{ width: "100%", borderRadius: 8 }}
              source={require("../images/222.jpg")}
            />
            <Text
              style={{
                ...styles.contentText,
                fontFamily: "Roboto-Medium",
                marginVertical: 8,
              }}
            >
              Black Sea
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 24,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/commentIcon.png")}
                  />
                  <Text style={styles.contentText}>5</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/likeIcon.png")}
                  />
                  <Text style={styles.contentText}>132</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ marginRight: 4 }}
                  source={require("../images/map-pin.png")}
                />
                <Text
                  style={{
                    ...styles.contentText,
                    textDecorationLine: "underline",
                  }}
                >
                  Ukraine
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Image
              style={{ width: "100%", borderRadius: 8 }}
              source={require("../images/333.jpg")}
            />
            <Text
              style={{
                ...styles.contentText,
                fontFamily: "Roboto-Medium",
                marginVertical: 8,
              }}
            >
              A house in Venice
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 24,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/commentIcon.png")}
                  />
                  <Text style={styles.contentText}>52</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ marginRight: 6 }}
                    source={require("../images/likeIcon.png")}
                  />
                  <Text style={styles.contentText}>13</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ marginRight: 4 }}
                  source={require("../images/map-pin.png")}
                />
                <Text
                  style={{
                    ...styles.contentText,
                    textDecorationLine: "underline",
                  }}
                >
                  Italy
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.footer}>
        <Image
          style={styles.footerIcon}
          source={require("../../images/grid.png")}
        />
        <View
          style={{
            ...styles.footerIcon,
            width: 70,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Image source={require("../../images/user_1.png")} />
        </View>
        <Image source={require("../../images/add_1.png")} />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    position: "absolute",
    width: windowWidth,
    height: windowHeight,
    top: 0,
    left: 0,
  },
  // formContainer: {
  //   // flex: 1,
  //   // justifyContent: "flex-end",
  // borderWidth: 2,
  // borderColor: "red",
  // },
  wrapper: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 140,
    minHeight: windowHeight - 140,
    // width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    // borderWidth: 2,
    // borderColor: "red",
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
    marginBottom: 70,
  },
  show: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  title: {
    marginBottom: 32,
    lineHeight: 35,
    color: "#212121",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // overflow: "hidden",

    position: "absolute",
    top: -60,
    left: (windowWidth - 121) / 2,
  },
  // avaWrapper: {
  //   flex: 1,
  //   alignItems: "center",

  //   // width: "100%",
  //   marginHorizontal: "auto",
  //   alignItems: "center",
  // },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addPhoto: {
    position: "absolute",
    right: -18.5,
    bottom: 14,

    // borderWidth: 2,
    // borderColor: "red",
  },
  contentText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    // alignItems: "flex-end",
    flexDirection: "row",
    paddingVertical: 9,
    borderTopColor: "rgba(0, 0, 0, 0.3)",
    borderTopWidth: 1,
  },
  footerIcon: {
    marginRight: 31,
  },
});