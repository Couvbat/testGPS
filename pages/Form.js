import { useState, useEffect } from 'react'
import { Button, Platform, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import * as Location from 'expo-location';
import haversine from 'haversine-distance'

export default Form = ({navigation, route}) => {
  const [location, setLocation] = useState({coords:{}});
  const [errorMsg, setErrorMsg] = useState(null);
  const sites = useSelector( (state) => state.sites)
  const site = sites.find( element => element.id == route.params.id )

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const isInRange = () => {
    let posUser = {lat: location.coords.latitude, lon: location.coords.longitude}
    let posSite = {lat: site.coords.latitude, lon: site.coords.longitude}
    let distance = haversine(posUser, posSite)
    console.log(site.coords)
    console.log(posUser)
    return (distance <= site.validRange)
  }


  return (
    <View style={style.page}>
      <Text style={style.siteName}>{route.params.name}</Text>
      <TextInput style={style.dataInput}></TextInput>
      {isInRange() ? (
        <Button title='Envoyer donnée valide' ></Button>
      ) : (
        <Button title='Envoyer donnée non valide' ></Button>
      )}
    </View>
  );
};

const style = {
  page: {
    flex: 1,
  },
  dataInput:{
    flex: 1, // On occupe le plus d'espace
    borderWidth: 1, // On place une bordure
    borderColor: "#dddddd" // la bordure est gris clair
  },
  siteName:{
    textAlign: "center",
    fontSize: 24,
  },
};

