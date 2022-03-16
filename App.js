import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStore } from "redux";
import MainReducer from "./reducers";
import { Provider } from "react-redux";
const store = createStore(MainReducer);
import Home from "./pages/Home";
import Form from "./pages/Form";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Diagnostic"
            component={Form}
            options={{ Title: "Diagnostic" }}
          ></Stack.Screen>
        </Stack.Navigator>
        <StatusBar hidden={true} style="auto" />
      </NavigationContainer>
    </Provider>
  );
}
