import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorSeniorActivityScoresScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [reports, setReports] = useState([]);
  let i = 0
  let suma = 0
  
  //fetch para coger la info de la activity deseada
  useEffect(() => {
    fetch('http://127.0.0.1:8000/activities/'+selected_activity.id+'/senior/'+selected_senior.senior_id+'/reports')
      .then(response => response.json())
      .then(reportsData => {
        setReports(reportsData);
        
        // Calcular la suma de los puntajes cuando se actualizan los informes
        for (let i = 0; i < reportsData.length; i++) {
          suma += reportsData[i].score;
          console.log(suma)
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []
  );
    
  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}> 
        <Text style={[styles.tutorTextBold, styles.textSpacing]}>{selected_senior.name}</Text> 
        
        {reports.map((report, i) => (
          <Text style={[styles.tutorText, styles.textSpacing]} key={i}>Intento número {i + 1}:        {report.score}/{selected_activity.num_answers}</Text>
        ))}
      </View>
    </View>
  );
};


export default TutorSeniorActivityScoresScreen; // Export the component
