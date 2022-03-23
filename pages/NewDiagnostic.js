import { useState, useEffect } from 'react'
import { Alert, Button, Platform, Text, TextInput, Vibration, View } from "react-native";
import { useSelector } from "react-redux";
import * as Location from 'expo-location';
import haversine from 'haversine-distance'

const NewDiagnostic = ({ navigation, route }) => {
  const [location, setLocation] = useState({ coords: {} });
  const [errorMsg, setErrorMsg] = useState(null);
  const sites = useSelector((state) => state.sites)
  const site = sites.find(element => element.id == route.params.id)
  const [data, setData] = useState('')
  const posUser = { lat: location.coords.latitude, lon: location.coords.longitude }
  const posSite = { lat: site.coords.latitude, lon: site.coords.longitude }
  const actualDistance = haversine(posUser, posSite)

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

  const isInRange = (distance) => {
      return !!(distance <= site.validRange);
  };

  const handleClick = () => {
    if (isInRange(actualDistance)) {
      Alert.alert('Valide','Votre position a bien été validé',
      [
        {
          text:'Annuler',
          onPress: () => console.log('canceled'),
          style: 'cancel'
        },
        {
          text:'Ok',
          onPress: () => console.log('success')
        }
      ]);
    } else {
      Vibration.vibrate()
      Alert.alert('Invalide', 'Vous ne vous situez pas dans le perimètre autorisé pour ce site. Les données seront considérées invalides.',
      [
      {
        text:'Annuler',
        onPress: () => console.log('canceled'),
        style: 'cancel'
      },
      {
        text:'Ok',
        onPress: () => console.log('success')
      }
    ]);
    }

  };


  return (
    <View style={style.page}>
      <Text style={style.siteName}>{site.name}</Text>
      <Text style={style.siteRange}>distance maximum du site : {site.validRange} mètres</Text>
      <Text style={style.siteRange}>Distance actuel : {actualDistance} mètres</Text>
      <TextInput style={style.dataInput}
        onChangeText={setData}
        value={data}></TextInput>
      <Button title='Envoyer' onPress={handleClick}></Button>
    </View>
  );
};

const style = {
  page: {
    flex: 1,
  },
  dataInput: {
    flex: 1, // On occupe le plus d'espace
    borderWidth: 1, // On place une bordure
    borderColor: "#dddddd" // la bordure est gris clair
  },
  siteName: {
    textAlign: "center",
    fontSize: 24,
  },
  siteRange: {
    textAlign: "center",
    fontSize: 18,
  },
};
export default NewDiagnostic