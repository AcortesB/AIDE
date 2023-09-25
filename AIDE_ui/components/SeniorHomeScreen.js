import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const SeniorHomeScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un tipo de actividad</Text>
        
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

          <TouchableOpacity style={styles.sidebarIcon2} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3selected} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("../assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>

      <View style={styles.activityContainer}>

        <TouchableOpacity 
        style={styles.homeTouchableActivityContainerImage}
        onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
          <Image style={styles.homeActivityContainerImage} source={require("../assets/rompecabezas.png")}></Image>
        </TouchableOpacity>
        
        <Text style={styles.homeTouchableActivityContainerImageText}>Juegos</Text>

        <TouchableOpacity 
        style={styles.homeTouchableActivityContainerImage}
        onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
          <Image style={styles.homeActivityContainerImage} source={require("../assets/familia2.png")}></Image>
        </TouchableOpacity>
        
        <Text style={styles.homeTouchableActivityContainerImageText}>Recuerdos y família</Text>
      </View>
    </View>
  );
};


export default SeniorHomeScreen; // Export the component