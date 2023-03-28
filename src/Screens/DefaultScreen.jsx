import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { logOut } from "../redux/auth/authOperations";
import { selectUser } from "../redux/auth/authSelectors";

export const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { name, email } = useSelector(selectUser);

  const getPosts = async () => {
    try {
      await db.collection("posts").onSnapshot((snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => posts.push(doc.data()));
        setPosts(posts);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const Item = ({ item }) => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Posts</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(logOut())}
        >
          <Image
            style={{ position: "absolute", right: 16, bottom: 10 }}
            source={require("../images/log-out.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.userWrapper}>
          <Image
            style={styles.userAvatar}
            source={require("../images/userAva.jpg")}
          />
          <View>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={posts}
            renderItem={Item}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 340,
  },
  header: {
    paddingVertical: 11,
    paddingTop: 60,

    borderBottomColor: "rgba(0, 0, 0, 0.3)",

    borderBottomWidth: 1,
  },
  screenTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
  userWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  contentText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
});