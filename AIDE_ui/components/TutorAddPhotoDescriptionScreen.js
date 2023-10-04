import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorAddPhotoDescriptionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  console.log("selected_senior:",selected_senior)
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [tutor_id, setTutorId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const handlePhoto = () => {
    if (description && selectedFile)
      fetch('http://127.0.0.1:8000/users/'+tutor_nickname+'') //conseguimos el id del tutor
        .then(response1 => response1.json())
        .then(tutorData => {
          setTutorId(tutorData.id)

          fetch('http://127.0.0.1:8000/photos', { //posteamos la photo
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 100,
              description: description,
              photo_file: selectedFile.name, //enviamos el nombre del archivo
              upload: tutorData.id,
              senior: selected_senior.senior_id
            }),
          })
          .then(response => {
            if (response.ok){
              console.log("Ya se ha posteado la foto")
              navigation.navigate('TutorAddPhotoPeople', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: selectedFile.name });
            }
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
    console.log('Esto es el tutor_id:' + tutor_id)
  }, [tutor_id]);

  useEffect(() => {
    if (selectedFile) {
      console.log('Este es el nombre del archivo seleccionado: ' + selectedFile.name);
    }
  }, selectedFile);

  
  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <input
        id='image-file'
        type="file"
        name="selected_file"
        onChange={(e) => {
          const file = e.target.files[0];
          setSelectedFile(file);
          const fileUrl = URL.createObjectURL(file);
          setImageUri(fileUrl);
        }}
      />

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      
      <View style={styles.inputViewPhotoDescription}>
      <TextInput
        multiline={true}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese una descripción de la fotografía"
        style={[styles.TextInputPhotoDescription, styles.tutorText]} 
      />
      </View>

      <TouchableOpacity onPress={handlePhoto} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorAddPhotoDescriptionScreen; // Export the component