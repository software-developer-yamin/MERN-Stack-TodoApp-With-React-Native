import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Button, Dialog } from "react-native-paper";

const TaskFooter = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });

  const addTaskHandler = () => {
    console.log("Add Task");
    setTask({ title: "", description: "" });
    setOpenDialog(!openDialog);
  };
  console.log(task);

  return (
    <View style={{flex:1}} >
      <TouchableOpacity
        style={styles.button}
        onPress={() => setOpenDialog(!openDialog)}
      >
        <Entypo name="add-to-list" size={20} color="#900" />
      </TouchableOpacity>

      
    </View>
  );
};

export default TaskFooter;

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  contentButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#b5b5b5",
    marginVertical: 15,
    borderRadius: 5,
    fontSize: 15,
  },
});
