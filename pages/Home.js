import {
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {

  const sites = useSelector( (state) => state.sites)

  const handleClick = id => {
    navigation.push('Site', {id});
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

export default Home;