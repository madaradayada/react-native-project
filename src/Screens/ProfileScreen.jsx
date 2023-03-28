import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { logOut } from "../redux/auth/authOperations";
import { selectUser } from "../redux/auth/authSelectors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getMyPosts();
  }, []);

  const getMyPosts = async () => {
    try {
      await db
        .collection("posts")
        .where("userId", "==", user.userId)
        .onSnapshot((snap) => {
          const myPosts = [];
          snap.forEach((doc) => myPosts.push(doc.data()));
          setMyPosts(myPosts);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const Post = ({ item }) => {
    const { id, photoUrl, title, location, locationCoords } = item;
    return (
      <View style={{ marginBottom: 24 }}>
        <Image
          style={{ width: "100%", height: 240, borderRadius: 8 }}
          source={{ uri: photoUrl }}
        />
        <Text
          style={{
            ...styles.contentText,
            fontFamily: "Roboto-Medium",
            marginVertical: 8,
          }}
        >
          {title}
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: id,
                    photoUrl: photoUrl,
                  })
                }
              >
                <Image
                  style={{ marginRight: 6 }}
                  source={require("../images/commentIcon.png")}
                />
              </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Map", locationCoords)}
            >
              <Image
                style={{ marginRight: 4 }}
                source={require("../images/map-pin.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                ...styles.contentText,
                textDecorationLine: "underline",
              }}
            >
              {location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
          onPress={() => dispatch(logOut())}
        >
          <Image
            style={{ position: "absolute", top: 22, right: 16 }}
            source={require("../images/log-out.png")}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.title, marginTop: 92 }}>{user.name}</Text>
        <FlatList
          data={myPosts}
          renderItem={Post}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
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
    paddingBottom: 170,
    backgroundColor: "#fff",
    marginTop: 140,
    minHeight: windowHeight - 140,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
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

    position: "absolute",
    top: -60,
    left: (windowWidth - 121) / 2,
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addPhoto: {
    position: "absolute",
    right: -18.5,
    bottom: 14,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});