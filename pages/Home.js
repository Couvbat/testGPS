import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useState } from "react";

export default Home = ({ navigation }) => {
  
  const [sites, setSites] = useState([
    {
      id: 1,
      name: "CCI",
      validRange:200,
      coords: { latitude: 47.0620766, longitude: 2.366622 },
    },
    {
      id: 2,
      name: "Gare de Bourges",
      validRange:5000,
      coords: { latitude: 47.0943909, longitude: 2.3931675 },
    },
    {
      id: 3,
      name: "Gare de Mehun-sur-Yèvre",
      validRange:50,
      coords: { latitude: 47.1350699, longitude: 2.1903179 },
    },
  ]);

  const handleClick = (id) => {
    navigation.push("Diagnostic", { id });
  };

  return (
    <View style={style.page}>
      <FlatList
        style={style.list}
        data={sites}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleClick(item.id);
            }}
          >
            <View style={style.listItem}>
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const style = {
  page: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: "#e0e0e0",
    margin: 2,
    padding: 15,
  },
};
