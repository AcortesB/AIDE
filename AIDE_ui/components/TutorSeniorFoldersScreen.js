import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorSeniorFoldersScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, seniors_changed } = route.params;
  console.log("seniors_changed en el folders:", seniors_changed)
  
  //delete a senior
  const handleDeleteSenior = () => {
    fetch((serverurl+'/users/seniors/' + selected_senior.senior_id + ''), {    
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Senior deleted successfully');
          navigation.navigate('TutorHome', { tutor_nickname: tutor_nickname , tutor_password: tutor_password})
        } else {
          console.error('Error deleting photo');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  return (
    
    <View style={styles.container}> 
    <StatusBar style="auto" />
      <Text style={styles.tutorText} >Nombre del Senior seleccionado: </Text>
      <Text style={styles.tutorTextBold} >{selected_senior.name}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Fotografías</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorReport', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Actividades</Text>
      </TouchableOpacity>

      <View style={styles.EndScreenIconContainer}>
        <TouchableOpacity onPress={handleDeleteSenior} style={styles.deleteSeniorBtn}>
          <Image
            source={require("../assets/eliminar-simbolo.png")}
            style={styles.butonIcon}
          />
          <Text style={styles.tutorText}>Eliminar senior</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
};


export default TutorSeniorFoldersScreen; // Export the component