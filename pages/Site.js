import { useState, useEffect } from 'react'
import { Alert, Button, FlatList, Platform, Text, TextInput, Vibration, View } from "react-native";
import { useSelector } from "react-redux";

const Site = ({ navigation, route }) => {
  const sites = useSelector((state) => state.sites)
  const site = sites.find(element => element.id == route.params.id)
  const diagnostics = useSelector((state) => state.diagnostics)
  const siteDiagnostics = diagnostics.find(element => element.id == route.params.id)

  const handleShowDiag = id => {
    navigation.push('Diagnostic', {id})
  }

  const handleNewDiag = id => {
    navigation.push('NewDiagnostic', {id})
  }

  return (
    <View style={style.page}>
      <Text style={style.title}>{site.name}</Text>
      <Text style={style.subTitle}>Distance maximum du site : {site.validRange} mètres</Text>
      <Text style={style.subTitle}>Description:</Text>
      <Text style={style.desc}>{site.description}</Text>
      <FlatList
        style={style.list}
        data={siteDiagnostics}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              handleShowDiag(item.id);
            }}
          >
            <View style={style.listItem}>
              <Text>{item.date}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <Button title='Nouveau diagnostic' onPress={() => {handleNewDiag(site.id)}}></Button>
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
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  subTitle: {
    textAlign: "center",
    fontSize: 18,
  },
  desc: {
    flex:1,
    textAlign: "center",
    fontSize: 16,
  },
};
export default Site