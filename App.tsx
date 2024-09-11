import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./App/HomeScreen";
import SettingsScreen from "./App/SettingsScreen";
import AddUserModal from "./components/AddUserModal";
import { useCallback, useState } from "react";
import ModalOpenStore from "./store/ModalOpenStore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const { openAddUserModal } = ModalOpenStore();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Pressable onPress={openAddUserModal}>
                <Text>+</Text>
              </Pressable>
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
