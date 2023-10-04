import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorSeniorFoldersScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  
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
    </View>
  );
};


export default TutorSeniorFoldersScreen; // Export the component