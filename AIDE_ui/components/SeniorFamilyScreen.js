import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const SeniorFamilyScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [senior_id, setSeniorId] = useState(null); 
  const [customized_activities, setCustomizedActs] = useState([]); 
  const customizedActs = []

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/' + senior_nickname + '/' + senior_password)
      .then(response => response.json())
      .then(senior => {
        setSeniorId(senior.id);
        
        fetch('http://127.0.0.1:8000/customized_activities_by_senior/' + senior.id)
          .then(response => response.json())
          .then(activities => {
            console.log(activities)
            // 2. por cada customized activity coges el id y miras en actividades y haces una variable con ellas
            const fetchPromises = activities.map(activity => {
              return fetch('http://127.0.0.1:8000/activities/'+ activity.id)
                .then(response => response.json())
                .then(activity => {
                  //metemos la actividad en un array
                  customizedActs.push(activity);
                })
                .catch(error => {
                  console.log('Error:', error);
                  return [];
                });
            });
            //console.log('customizedActs:', customizedActs);
            //cuando estén todas las actividades hace
            Promise.all(fetchPromises)
              .then(customized => {
                console.log('customizedActs:', customizedActs);
                setCustomizedActs(customizedActs)
              });
          })
          .catch(error => {
            console.log('Error:', error);
          });
      });
  }, []);
  
  useEffect(() => {
  }, [senior_id]);
  
  useEffect(() => {
    console.log('customized_activities:', customized_activities);
  }, [customized_activities]);

  const handleActivityPress = (activity) => {
    navigation.navigate('SeniorStartActivity', { senior_nickname: senior_nickname, senior_password: senior_password, senior_name: senior_name, activity: activity});
  };
  
  const renderPhotoActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.galleryItem}>
      <View style={styles.imageContainer}>
      <Image
        source={require('../assets/'+item.photo_file+'.png')}
        style={styles.galleryImage}
      />
      </View>
      <Text style={styles.galleryImageText}>{item.name}</Text>
    </TouchableOpacity>
  );

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un juego</Text>
        
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
      

      <ScrollView style={styles.scrollView}>
        <FlatList
          data={customized_activities}
          renderItem={renderPhotoActivityItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};


export default SeniorFamilyScreen; // Export the component