import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteTask, loadUser, updateTask } from "../redux/action";

const Task = ({ title, description, status, taskId }) => {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(status);

  const handleCheckbox = () => {
    setCompleted(!completed);
    dispatch(updateTask(taskId));
}

const deleteHandler = async () => {
    await dispatch(deleteTask(taskId));
    dispatch(loadUser())
}

  return (
    <View style={styles.container}>
      <View style={{ width: "70%" }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: "#4a4a4a" }}>{description}</Text>
      </View>
      <Checkbox
        status={completed ? "checked" : "unchecked"}
        onPress={handleCheckbox}
        color="#474747"
      />
      <AntDesign
        name="delete"
        size={20}
        color="#fff"
        style={styles.icon}
        onPress={deleteHandler}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 7,
    color: "#900",
  },
  icon: {
    padding: 10,
    backgroundColor: "#900",
    borderRadius: 100,
  },
});
