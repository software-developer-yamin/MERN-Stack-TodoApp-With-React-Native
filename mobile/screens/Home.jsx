import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Task from "../components/Task";
import { Entypo } from "@expo/vector-icons";
import { Button, Dialog } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadUser } from "../redux/action";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.message);
  const [openDialog, setOpenDialog] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });


  const addTaskHandler = async () => {
    dispatch(addTask(task.title, task.description));
    dispatch(loadUser());
    setTask({ title: "", description: "" });
    setOpenDialog(!openDialog);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.heading}>All Tasks</Text>}
        data={user?.tasks}
        renderItem={({ item }) => (
          <Task
            title={item.title}
            taskId={item._id}
            description={item.description}
            status={item.completed}
          />
        )}
        keyExtractor={(item) => item._id}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.button}
            onPress={() => setOpenDialog(!openDialog)}
          >
            <Entypo name="add-to-list" size={24} color="#900" />
          </TouchableOpacity>
        }
      />
      <Dialog visible={openDialog} onDismiss={() => setOpenDialog(!openDialog)}>
        <Dialog.Title>Add Task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={task.title}
            onChangeText={(title) => setTask({ ...task, title })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={task.description}
            onChangeText={(description) => setTask({ ...task, description })}
          />
          <View style={styles.contentButton}>
            <TouchableOpacity onPress={() => setOpenDialog(!openDialog)}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button
              disabled={!task.title || !task.description || loading}
              onPress={addTaskHandler}
              color="#900"
            >
              Add
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 30,
    textAlign: "center",
    marginVertical: 10,
    backgroundColor: "#474747",
    color: "#fff",
    fontWeight: "bold",
  },
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
