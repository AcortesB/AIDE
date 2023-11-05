import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'
import * as Animatable from 'react-native-animatable';

const SeniorActivityFinishedScreen = ({navigation, route}) => {

  const {senior_nickname, senior_password, senior_name, activity, score, activity_score, senior, playing_time } = route.params;
  const [randomImageIndex, setRandomImageIndex] = useState(0);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImageIndex(randomIndex);
  }, [images]);
  //ahora cuando hagas el report tendrás que meterle un num_answers: activity_score
  fetch(serverurl+'/activities/' + activity.id + '/report_by_senior_id/' + senior.id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: 100,
      senior_id: senior.id,
      activity_id: activity.id,
      score: activity_score,
      time_playing: playing_time,
      number_of_tries: 100,
      num_act_answers: score
      })
    })
    .catch(error => {
      console.log('Error:', error);
    });

    fetch(serverurl+'/senior/'+ senior.id)
    .then(response => response.json())
    .then(senior_info => {
      
      fetch(serverurl+'/seniors/'+senior.id+'/total_playing_time__hour_start_avg__hour_finish_avg__score_avg_update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: senior_info.id,
          total_playing_time: playing_time,
          hour_start_avg: senior_info.hour_start_avg,
          hour_finish_avg: senior_info.hour_finish_avg,
          score_avg: score,
          tutor_id: senior_info.tutor_id,
          sex: senior_info.sex,
          birth_year: senior_info.birth_year,
          birth_place: senior_info.birth_place,
          descendants_num: senior_info.descendants_num,
          sons_num: senior_info.sons_num,
          daughters_num: senior_info.daughters_num,
          siblings_num: senior_info.siblings_num,
          brothers_num: senior_info.brothers_num,
          sisters_num: senior_info.sisters_num,
          partner_name: senior_info.partner_name,
          father_name: senior_info.father_name,
          mother_name: senior_info.mother_name,
          })
      })
      .catch(error => {
        console.log('Error:', error);
      });
    })
  
  //coger los elementos de la route para poder pasarlos
  useEffect(() => {

    const redirectToSeniorHome = () => {
      navigation.navigate('SeniorHome', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name});
    };

    const timeoutId = setTimeout(redirectToSeniorHome, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  const images = [
    require("../assets/manos.gif"),
    require("../assets/petardos.gif"),
  ];
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
      <Animatable.Text animation="bounceIn" style={styles.speechText}>
        Bien hecho!
      </Animatable.Text>
        
{/*         
        <Image
          source={require("../assets/sin-sonido2.png")}
          style={styles.muteIcon}
        /> */}
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
      
      <View style={styles.activityWhoContainer}>
        <Image
          source={images[randomImageIndex]}
          style={styles.activityContainerImage}
        />
      </View>
    </View>
  );
};

export default SeniorActivityFinishedScreen; // Export the component