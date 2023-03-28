import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { selectUser } from "../redux/auth/authSelectors";

export const CommentsScreen = ({ navigation, route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { postId, photoUrl } = route.params;
  const user = useSelector(selectUser);

  useEffect(() => {
    getAllComments();
  }, []);

  const uploadComment = async () => {
    try {
      const newComment = {
        userName: user.name,
        comment: comment,
        date: Date.now(),
        userId: user.userId,
      };
      await db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add(newComment);
      setAllComments([...allComments, newComment]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getAllComments = async () => {
    try {
      let comments = [];
      const snapshot = await db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .get();
      await snapshot.forEach((doc) => {
        comments = [...comments, doc.data()];
      });
      await setAllComments(comments);
    } catch (e) {
      console.log(e.message);
    }
  };

  const createComment = () => {
    uploadComment();
    Keyboard.dismiss();
    setComment("");
  };

  const Comment = ({ item }) => {
    const { userId, date, comment, userName } = item;
    const commentTime = new Date(date).toTimeString().slice(0, 5);
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const commentDate = `${day}.${month}.${year} | ${commentTime}`;

    return userId === user.userId ? (
      <View style={styles.commentWrapper}>
        <Image
          style={styles.commentImage}
          source={require("../images/userAva.jpg")}
        />
        <View style={styles.textBox}>
          <Text style={{ marginBottom: 8 }}>{comment}</Text>
          <Text style={styles.commentDate}>{commentDate}</Text>
        </View>
      </View>
    ) : (
      <View style={{ ...styles.commentWrapper, flexDirection: "row" }}>
        <Image
          style={{ ...styles.commentImage, marginRight: 16, marginLeft: 0 }}
          source={require("../images/authUser.jpg")}
        />
        <View
          style={{
            ...styles.textBox,
            borderTopStartRadius: 0,
            borderTopEndRadius: 6,
          }}
        >
          <Text style={{ marginBottom: 8 }}>{comment}</Text>
          <Text style={{ ...styles.commentDate, textAlign: "right" }}>
            {commentDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Comments</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Default")}>
          <Image
            style={{ position: "absolute", left: 16, bottom: 0 }}
            source={require("../images/arrow-left.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.addPhoto}>
          <Image style={styles.photo} source={{ uri: photoUrl }} />
        </View>
        <FlatList
          data={allComments}
          renderItem={Comment}
          keyExtractor={(item) => item.date}
        />
      </View>
      <View style={styles.footer}>
        <View>
          <TextInput
            style={styles.footerInput}
            placeholder="Comment..."
            placeholderTextColor="#bdbdbd"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity
            onPress={createComment}
            style={{ position: "absolute", top: 8, right: 8 }}
          >
            <Image source={require("../images/send.png")} style={{}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  main: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 150,
    height: "100%",
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
  },
  commentWrapper: {
    flexDirection: "row-reverse",
    marginBottom: 24,
  },
  commentImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 16,
  },
  textBox: {
    flex: 1,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopEndRadius: 0,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#bdbdbd",
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
    color: "#BDBDBD",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  footerInput: {
    borderRadius: 25,
    backgroundColor: "#f6f6f6",
    height: 50,
    width: "100%",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 50,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",
  },
});