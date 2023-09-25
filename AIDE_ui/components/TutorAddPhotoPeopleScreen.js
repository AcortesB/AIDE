import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorAddPhotoPeopleScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file } = route.params;
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/' + uploaded_photo_file + '/people') // consigo las personas de la foto
      .then(response => response.json())
      .then(photo_people => {
        setPeople(photo_people) //establezco la variable people
        console.log(photo_people)
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [people]);
  
  //TODO: nos falta una función y hacer que cuando den a "siguiente" se ejecute y se suba de esta manera la foto

  useEffect(() => {
  }, [people]);

  const renderPersonItem = ({ item }) => (
    <View>
      <Text style={[styles.tutorText, styles.textSpacing]}>{item.name} {item.surname}</Text>
    </View>
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}>
        <Text style={[styles.tutorText, styles.textSpacing]}>Lista de personas que aparecen:</Text>
        <FlatList
          data={people}
          renderItem={renderPersonItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhotoPerson', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, uploaded_photo_file: uploaded_photo_file})} style={styles.addSeniorBtn}>
      <Image style={styles.butonIcon} 
          source={require("../assets/anadir-amigo.png")} 
        />
        <Text style={styles.tutorText}>Añadir persona</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorAddPhotoPeopleScreen; // Export the component