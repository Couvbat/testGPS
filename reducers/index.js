import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATE = {
  sites: [
    {
      id: 1,
      name: "CCI",
      description:'Ceci est un example de description (e.g. liste des installations a vérifier)',
      validRange:500,
      coords: { latitude: 47.0620766, longitude: 2.366622 },
    },
    {
      id: 2,
      name: "Gare de Bourges",
      validRange:500,
      coords: { latitude: 47.0943909, longitude: 2.3931675 },
    },
    {
      id: 3,
      name: "Gare de Mehun-sur-Yèvre",
      validRange:500,
      coords: { latitude: 47.1350699, longitude: 2.1903179 },
    },
    {
      id: 4,
      name: "77 rue barbès",
      validRange: 100,
      coords: { latitude: 47.0751752, longitude: 2.387533 },
    }
  ],
  diagnostics: [
    {
      id:1,
      siteId:1,
      date:'',
      validity:'Valid',
      data:'Ceci est un example de données'
    },
  ]
}

const save = (sites) => {
  AsyncStorage.setItem('bookmarks', JSON.stringify())
  .then( () => { console.log('Sauvegarde ok'); } )
  .catch( (err) => { console.log(err.message); } )
 }


 export default function MainReducer(state = STATE, action) {
  return {...state};
 }