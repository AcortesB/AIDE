import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker, ImageBackground, WebView } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorAddPhotoPositionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file, added_person_name, added_person_surname, people_changed } = route.params;
  console.log("uploaded_photo_file NOMBRE EN LA POSITIONSCREEN:",uploaded_photo_file)
  //position in the photo
  const [photo_id, setPhotoId] = useState(null);
  const [person_id, setPersonId] = useState(null);
  
  const [hair, setHair] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [sunglasses, setSunglasses] = useState(null);
  const [glasses, setGlasses] = useState(null);
  const [clue, setClue] = useState(null);
  //falta el audio
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  console.log("clickCount al principio", clickCount)
  const [w_photo_obj, setWphotoObj] = useState(0);
  const [h_photo_obj, setHphotoObj] = useState(0);

  const [click1X, setClick1X] = useState(null);
  const [click1Y, setClick1Y] = useState(null);
  const [click2X, setClick2X] = useState(null);
  const [click2Y, setClick2Y] = useState(null);

  //los circulos rojos
  const [circle1, setCircle1] = useState(null);
  const [circle2, setCircle2] = useState(null);


  const hairOptions = ["Moreno", "Rubio", "Pelirrojo", "Castaño", "Negro", "Blanco", "Otros"];
  const clothesOptions = ["Blanco", "Negro", "Rojo", "Amarillo", "Naranja", "Rosa", "Verde", "Otros"];
  
  //TODO: aun no sé como meter la posición con la fotografía así que de momento le diremos 4 coordenadas porque si
  const xinf = 363
  const yinf = 363
  const xsup = 363
  const ysup = 363

  const imageRef = useRef(null);
  // controlador de estado de React Native para que se llame a la función getPhotoPeople
  // cada vez que se modifique el indice para renderizar la foto actual o si este es 0
  useEffect(() => {
    let anchura = imageRef.current.getBoundingClientRect().width;
    let altura = imageRef.current.getBoundingClientRect().height;
    setWphotoObj(anchura);
    setHphotoObj(altura);
  }, []);
  
  const handlePosition = () => {
    if (hair && clothes && sunglasses && glasses)
    // && xinf && yinf && xsup && ysup
      // get del id de la foto
      fetch(serverurl+'/photo_id_by_name/'+uploaded_photo_file)
        .then(response => response.json())
        .then(photo => {
          setPhotoId(photo.id)
          console.log(photo.id)
          
          // get del id de la persona por el name y el surname
          fetch(serverurl+'/person_by_name_and_surname/'+added_person_name+'/'+added_person_surname)
          .then(response1 => response1.json())
          .then(person => {
            setPersonId(person.id)
            console.log(person.id)

              // post de la position
              fetch(serverurl+'/photos/'+photo.id+'/people/'+person.id+'/position', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_photo: photo.id,
                id_person: person.id,
                clue: clue,
                w: w_photo_obj,
                h: h_photo_obj,
                x_inf:click1X,
                y_inf:click1Y,
                x_sup:click2X,
                y_sup:click2Y,
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
                navigation.navigate('TutorAddPhotoPeople', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: uploaded_photo_file, people_changed: !people_changed });
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

     // Manejar el clic en la foto.
  const handlePhotoClick = (event) => {
    console.log("getBounding: ",imageRef.current.getBoundingClientRect());
    if (clickCount === 0) {
      
      //console.log("X click1: ",event.nativeEvent.layerX);
      setClick1X(event.nativeEvent.layerX);
      //console.log("Y click1: ",event.nativeEvent.layerY);
      setClick1Y(event.nativeEvent.layerY);
      console.log("No habia ni click1 ni click2")
      setClick1(true);
      setCircle1( <View style={styles.circle}> </View>);
    } else if (clickCount === 1) {
      //console.log("X click2: ",event.nativeEvent.layerX);
      setClick2X(event.nativeEvent.layerX);
      //console.log("Y click2: ",event.nativeEvent.layerY);
      setClick2Y(event.nativeEvent.layerY);
      console.log("Había click1 pero NO click2")
      setClick2(true);
      setCircle2( <View style={styles.circle}> </View>);
    }
    setClickCount(clickCount + 1);
  };


  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese una pista sobre la ubicación de la persona en la foto.</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]}
          placeholder="Ejemplo: el chico con una gorra roja"
          placeholderTextColor="#003f5c"
          onChangeText={(clue) => setClue(clue)} 
        />
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el color de cabello de la persona en la foto.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={hair}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setHair(itemValue)}
        >
          <Picker.Item label="Cabello" value={null} />
          {hairOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el color de la ropa de la persona en la foto.</Text>
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

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione si la persona lleva gafas de sol en la foto.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={sunglasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSunglasses(itemValue)}
        >
          <Picker.Item label="Gafas de sol" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione si la persona lleva gafas de ver en la foto.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={glasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setGlasses(itemValue)}
        >
          <Picker.Item label="Gafas de ver" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>
      
      
      {clickCount === 0 && (
        <Text style={[styles.tutorText, styles.textSpacing]}>
          Primero marca con el dedo la esquina inferior izquierda del área que ocupa la persona.
        </Text>
      )}

      {clickCount === 1 && !click2 && (
          <Text style={[styles.tutorText, styles.textSpacing]}>
            Ahora marca con el dedo la esquina superior derecha del área que ocupa la persona.
          </Text>
      )}

      {clickCount === 2 && (
        <Text style={[styles.tutorText, styles.textSpacing]}>
          Ya has marcado la posición de la persona en la fotografía.
        </Text>
      )}
      <TouchableOpacity ref={imageRef} onPress={handlePhotoClick} style={styles.image}>
        <Image 
          source={{ uri: 'http://localhost:8000/uploads/' + uploaded_photo_file }}
          resizeMode="cover"
          style={styles.image}
        />
        {click1X !== null && click1Y !== null && (
          <View style={[styles.circle, { left: click1X, top: click1Y }]}></View>
        )}

        {click2X !== null && click2Y !== null && (
          <View style={[styles.circle, { left: click2X, top: click2Y }]}></View>
        )}
        
        {click1 && click2 && (
          <View style={[styles.circle, { left: click2X, top: click1Y }]}></View>
        )}
        {click1 !== false && click2 !== false && (
          <View style={[styles.circle, { left: click1X, top: click2Y }]}></View>
        )}
      
      </TouchableOpacity>
      
      

      <TouchableOpacity onPress={handlePosition} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorAddPhotoPositionScreen; // Export the component