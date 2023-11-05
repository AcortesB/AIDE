import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../config.js'

import { styles } from '../styles.js'; // Import the styles object from styles.js


const TutorUpdatePhotoDescriptionScreen = ({navigation, route}) => {
  
  const { tutor_nickname, tutor_password, selected_senior, selected_photo } = route.params;
  console.log("selected_senior", selected_senior)
  console.log("selected_photo", selected_photo)
  const [description, setDescription] = useState("");
  
  const handleDescriptionUpdate = () => {
  
    const new_description = description; // la nueva descripción
    //cogemos al tutor por el nickname
    fetch(serverurl+'/photos/'+selected_photo.id+'/description', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: selected_photo.id,
        description: new_description,
        photo_file: '',
        upload: 1,
        senior: selected_senior.senior_id
       }),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Descripción actualizada con éxito');
        // navigation a la pantalla tutorGetPhoto (igual necesitamos también en ella en vez de un useEffect un useFocusEffect)
        navigation.navigate('TutorGetPhoto', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_photo: selected_photo, description_changed: new_description  });
      } else {
        console.error('Error al actualizar la descripción');
      }
    })
    .catch((error) => {
      console.error('Error de red:', error);
    });
  }

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese la nueva descripción:</Text>
        <View style={styles.inputView}>
            <TextInput
            style={[styles.TextInput, styles.tutorText]}
            placeholder="Nueva descripción."
            placeholderTextColor="#003f5c"
            onChangeText={(description) => setDescription(description)} 
            />
        </View>
        <TouchableOpacity onPress={handleDescriptionUpdate} style={styles.loginBtn}>
          <Text style={styles.tutorText}>Listo</Text>
        </TouchableOpacity>
    </View>
  );
};

export default TutorUpdatePhotoDescriptionScreen; // Export the component