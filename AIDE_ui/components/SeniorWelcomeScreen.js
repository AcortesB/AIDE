import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const SeniorWelcomeScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [count, setCount] = useState(3); // Estado local para el contador
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    // Cuando el contador llegue a 0, navegar a otra pantalla
    if (count === 0) {
      clearInterval(timer);
      navigation.navigate('SeniorHome', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name}); // TODO: hacer el SeniorHomeScreen
    }

    return () => clearInterval(timer); //dejar el timer a 0 cuando se cambie de pantalla 
  }, [count, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.speechText}>Bienvenido/a {senior_name}!</Text>
      <Text style={styles.speechText}>Empezamos en {count > 0 ? `${count}...` : ''}</Text>
      

    </View>
  );
};


export default SeniorWelcomeScreen; // Export the component
