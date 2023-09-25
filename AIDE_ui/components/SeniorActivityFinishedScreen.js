import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const SeniorActivityFinishedScreen = ({navigation, route}) => {

  const {senior_nickname, senior_password, senior_name, activity, senior, score, playing_time } = route.params;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/activities/'+activity.id+'/report_by_senior_id/'+senior.id)
      .then(response => response.json())
      .then(report => {
        console.log("activity.id: ", activity.id);
        console.log("senior.id: ", senior.id);

        if (report.detail === undefined){ //si el report.detail es undefined significa que ha cogido bien el report
          //update de la score, el time_playing y el number_of_tries de un senior_activity
          fetch('http://127.0.0.1:8000/activities/' + activity.id + '/report_by_senior_id/' + senior.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: 100,
            senior_id: senior.id,
            activity_id: activity.id,
            score: score,
            time_playing: playing_time,
            number_of_tries: 100,
            })
          })
        }else{ //si es la primera vez que el senior juega hacemos el post de este report
          fetch('http://127.0.0.1:8000/activities/' + activity.id + '/report_by_senior_id/' + senior.id, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 100,
              time_playing: playing_time,
              number_of_tries: 1, //porque es la primera vez que se juega
              score: score,
              senior_id: senior.id,
              activity_id: activity.id
            })
          })
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);


  
  //coger los elementos de la route para poder pasarlos
  useEffect(() => {

    const redirectToSeniorHome = () => {
      navigation.navigate('SeniorHome', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name});
    };

    // Programa la redirección después de 3 segundos
    const timeoutId = setTimeout(redirectToSeniorHome, 3000);

    // Limpia el temporizador cuando el componente se desmonta para evitar problemas de memoria
    return () => clearTimeout(timeoutId);
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Bien hecho!</Text>
        
        <Image
          source={require("../assets/sin-sonido2.png")}
          style={styles.muteIcon}
        />
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>
      
      <View style={styles.activityContainer}>
        <Text style={styles.timeText}>Tiempo total: {playing_time}</Text>
      </View>

      
    </View>
  );
};

export default SeniorActivityFinishedScreen; // Export the component