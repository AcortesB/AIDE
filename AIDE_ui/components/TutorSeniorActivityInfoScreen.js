import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorSeniorActivityInfoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [activity, setActivity] = useState([]);
  console.log('La actividad que me han pasado:')
  console.log(selected_activity.id)
  
  //fetch para coger la info de la activity deseada
  useEffect(() => {
    fetch('http://127.0.0.1:8000/activities/'+selected_activity.id+'')
      .then(response => response.json())
      .then(activityData => {
        setActivity(activityData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []
  );

  useEffect(() => {
    console.log('Esto es la activity:')
    console.log(activity);
  }, [activity]);
  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}> 
        <Text style={[styles.tutorTextBold, styles.textSpacing]}>{activity.name}</Text>
        <Text style={[styles.tutorText, styles.textSpacing]}>Descripción: {activity.description}</Text>
        <Text style={[styles.tutorText, styles.textSpacing]}>Vídeo de demostración: {activity.demo_video}</Text>


        <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorActivityScores', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: selected_activity})} style={styles.loginBtn}>
          <Text style={styles.tutorText}>Puntuaciones de {selected_senior.name}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default TutorSeniorActivityInfoScreen; // Export the component