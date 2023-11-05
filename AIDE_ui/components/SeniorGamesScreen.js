import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const SeniorGamesScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [generic_activities, setGenericActs] = useState([]); 


useEffect(() => {
  // 1. fetch para sacar todas las customized activities que tengan senior_id = selected_senior.senior_id
  fetch(serverurl+'/activities/generic_activities')
    .then(response => response.json())
    .then(activities => {
      console.log(activities)
      setGenericActs(activities)
    })
    .catch(error => {
      console.log('Error:', error);
    });
}, []);

useEffect(() => {
  //console.log("customized_acts ya no está vacío")
}, [generic_activities]);

  const renderPhotoActivityItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.galleryItem}>
      <View style={styles.imageContainer}>
      <Image
        source={require("../assets/"+item.photo_file+".png")}
        style={styles.galleryImage}
      />
      </View>
      <Text style={[styles.scrollViewActivityText, styles.speechText]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un juego</Text>
        
        {/* <Image
          source={require("../assets/sin-sonido2.png")}
          style={styles.muteIcon}
        /> */}
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1selected} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
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
      

        <ScrollView style={styles.scrollView}>
            <FlatList
              data={generic_activities}
              renderItem={renderPhotoActivityItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    

    </View>
  );
};


export default SeniorGamesScreen; // Export the component