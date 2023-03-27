import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export const CreatePostScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const createPost = () => {
    const post = { photo, title, location, locationCoords };
    navigation.navigate("Default", post);
    setPhoto(null);
    setTitle("");
    setLocation("");
    setLocationCoords(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Create post</Text>
          <Image
            style={{ position: "absolute", left: 16, bottom: 10 }}
            source={require("../images/arrow-left.png")}
          />
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.addPhoto}>
            <View style={styles.photo}>
              {photo ? (
                <>
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                    }}
                  />
                  <TouchableOpacity
                    style={styles.cameraBox}
                    onPress={() => {
                      setPhoto(null);
                    }}
                  >
                    <Image source={require("../images/camera.png")} />
                  </TouchableOpacity>
                </>
              ) : (
                <Camera
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  type={Camera.Constants.Type.back}
                  ref={(ref) => {
                    setCameraRef(ref);
                  }}
                >
                  <TouchableOpacity
                    style={styles.cameraBox}
                    onPress={async () => {
                      if (cameraRef) {
                        const { uri } = await cameraRef.takePictureAsync();
                        await setPhoto(uri);
                        const location =
                          await Location.getCurrentPositionAsync();
                        setLocationCoords({
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                        });
                      }
                    }}
                  >
                    <Image source={require("../images/camera.png")} />
                  </TouchableOpacity>
                </Camera>
              )}
            </View>
            <Text
              style={styles.addPhotoText}
              onPress={() => {
                setPhoto(null);
              }}
            >
              {photo ? "Edit photo" : "Load photo"}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="#bdbdbd"
            value={title}
            onChangeText={setTitle}
          />
          <View>
            <TextInput
              style={{ ...styles.input, paddingLeft: 28 }}
              placeholder="Location"
              placeholderTextColor="#bdbdbd"
              value={location}
              onChangeText={setLocation}
            />
            <Image
              style={{ position: "absolute", left: 0, top: 13 }}
              source={require("../images/map-pin.png")}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.button,
              backgroundColor:
                photo && title && location ? "#FF6C00" : "#f6f6f6",
            }}
            onPress={createPost}
          >
            <Text style={styles.buttonTitle}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.footer}>
          <Image source={require("../images/trash.png")} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingVertical: 11,
    paddingTop: 45,

    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 1,
  },
  screenTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
  main: {
    paddingHorizontal: 16,
    paddingTop: 32,

    height: "100%",
    backgroundColor: "#ffffff",
  },
  addPhoto: {
    marginBottom: 32,
  },
  photo: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    marginBottom: 8,
    overflow: "hidden",
  },
  addPhotoText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
  cameraBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ffffff",
    borderWidth: 1,
    borderBottomColor: "#e8e8e8",
    justifyContent: "center",
    marginBottom: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },
  button: {
    borderRadius: 25.5,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  buttonTitle: {
    textAlign: "center",
    color: "#bdbdbd",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 9,
  },
  footerIcon: {
    marginRight: 31,
  },
});
