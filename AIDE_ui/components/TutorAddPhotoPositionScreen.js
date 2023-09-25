import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorAddPhotoPositionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file, added_person_name, added_person_surname } = route.params;
  
  //position in the photo
  const [photo_id, setPhotoId] = useState(null);
  const [person_id, setPersonId] = useState(null);
  
  const [hair, setHair] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [sunglasses, setSunglasses] = useState(null);
  const [glasses, setGlasses] = useState(null);
  //falta el audio

  const hairOptions = ["Moreno", "Rubio", "Pelirrojo", "Castaño", "Negro", "Blanco", "Otros"];
  const clothesOptions = ["Blanco", "Negro", "Rojo", "Amarillo", "Naranja", "Rosa", "Verde", "Otros"];
  
  //TODO: aun no sé como meter la posición con la fotografía así que de momento le diremos 4 coordenadas porque si
  const xinf = 0
  const yinf = 0
  const xsup = 1
  const ysup = 2
  
  const handlePosition = () => {
    if (hair && clothes && sunglasses && glasses)
    // && xinf && yinf && xsup && ysup
      // get del id de la foto
      fetch('http://127.0.0.1:8000/photo_id_by_name/'+uploaded_photo_file)
        .then(response => response.json())
        .then(photo => {
          setPhotoId(photo.id)
          console.log(photo.id)
          
          // get del id de la persona por el name y el surname
          fetch('http://127.0.0.1:8000/person_by_name_and_surname/'+added_person_name+'/'+added_person_surname)
          .then(response1 => response1.json())
          .then(person => {
            setPersonId(person.id)
            console.log(person.id)

              // post de la position
              fetch('http://127.0.0.1:8000/photos/'+photo.id+'/people/'+person.id+'/position', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_photo: photo.id,
                id_person: person.id,
                x_inf:xinf,
                y_inf:yinf,
                x_sup:xsup,
                y_sup:ysup,
                hair_color:hair,
                voice_record:"---",
                sunglasses:sunglasses,
                glasses:glasses,
                clothes_color:clothes
              }),
            })
            .then(response2 => {
              if (response2.ok){
                console.log("Ya se ha posteado la position")
                navigation.navigate('TutorAddPhotoPeople', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa" });
              }
            })
            .catch(error => {
              console.error(error);
            });

          })
          .catch(error => {
            console.error(error);
          });
        })
        .catch(error => {
          console.error(error);
        });
  };
    
    useEffect(() => {
      //console.log('Esto es el photo_id')
      //console.log(photo_id);
    }, [photo_id]);

    useEffect(() => {
      //console.log('Esto es el person_id')
      //console.log(person_id);
    }, [person_id]);

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <Picker
          selectedValue={hair}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setHair(itemValue)}
        >
          <Picker.Item label="Seleccione el color de cabello en la foto." value={null} />
          {hairOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={clothes}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setClothes(itemValue)}
        >
          <Picker.Item label="Seleccione el color de ropa en la foto." value={null} />
          {clothesOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={sunglasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSunglasses(itemValue)}
        >
          <Picker.Item label="Seleccione si lleva gafas de sol en la foto" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={glasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setGlasses(itemValue)}
        >
          <Picker.Item label="Seleccione si lleva gafas de ver en la foto" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>
      
      <Text style={[styles.tutorText, styles.textSpacing]}>Arrastra con los dedos el cuadrado de color verde a la posicion de la persona y agrandalo para marcar el área que ocupa.</Text>
      <Image
        source={{ uri: `http://localhost:8000/uploads/Recuadro.jpeg` }}
        style={styles.image}
      />

      <TouchableOpacity onPress={handlePosition} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorAddPhotoPositionScreen; // Export the component