const STATE = {
  sites: [
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
    }
  ]
}

export default function MainReducer(state = STATE, action) {
  return {...state};
 }