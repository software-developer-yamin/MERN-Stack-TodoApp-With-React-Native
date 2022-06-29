import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import Register from "../screens/Register";
import CameraComponent from "../screens/CameraComponent";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../redux/action";
import Loader from "../components/Loader";
import ChangePassword from "../screens/ChangePassword";
import Verify from "../screens/Verify";
import ForgetPassword from "../screens/ForgetPassword";
import ResetPassword from "../screens/ResetPassword";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export const RootNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return loading ? (
    <Loader />
  ) : (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "root" : "login"}
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </>
      ) : (
        <Stack.Screen name="root" component={BottomTabNavigator} />
      )}
      <Stack.Screen name="camera" component={CameraComponent} />
      <Stack.Screen name="changepassword" component={ChangePassword} />
      <Stack.Screen name="verify" component={Verify} />
      <Stack.Screen name="forgetpassword" component={ForgetPassword} />
      <Stack.Screen name="resetpassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    initialRouteName="home"
  >
    <Tab.Screen
      name="home"
      component={Home}
      options={{
        tabBarIcon: () => <AntDesign name="home" size={30} color="#900" />,
      }}
    />
    <Tab.Screen
      name="profile"
      options={{
        tabBarIcon: () => <AntDesign name="user" size={30} color="#900" />,
      }}
      component={Profile}
    />
  </Tab.Navigator>
);
