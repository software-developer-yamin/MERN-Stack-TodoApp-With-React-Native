import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../redux/action";
import { useNavigation } from "@react-navigation/native";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const forgetHandler = async () => {
    await dispatch(forgetPassword(email));
    navigation.navigate("resetpassword");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>WELCOME</Text>
      <View style={{ width: "80%" }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Button
        style={styles.btn}
        onPress={forgetHandler}
        color="#fff"
        disabled={loading}
        loading={loading}
      >
        Send Email
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "80%",
  },
});

export default ForgetPassword;
