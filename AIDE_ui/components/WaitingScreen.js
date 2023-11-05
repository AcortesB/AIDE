import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import * as Animatable from 'react-native-animatable';

const WaitingScreen = ({ navigation }) => {
    const [showingDots, setShowingDots] = useState(true);
    const [animationText, setAnimationText] = useState(''); // Inicialmente, no hay texto
    
    useEffect(() => {
        if (showingDots) {
          let currentIndex = 0;
          const textToAnimate = '...'; // Los puntos que deseas animar
          const animationInterval = 300; // Intervalo entre caracteres (en milisegundos)
    
          const animationTimer = setInterval(() => {
            if (currentIndex < textToAnimate.length) {
              setAnimationText(textToAnimate.slice(0, currentIndex + 1));
              currentIndex++;
            }
          }, animationInterval);
    
          return () => {
            clearInterval(animationTimer);
          };
        }
      }, [showingDots]);

    useEffect(() => {
      const showDotsTimer = setTimeout(() => {
        setShowingDots(false);
      }, 2000);
  
      const navigateToLoginScreen = setTimeout(() => {
        navigation.navigate('Login');
      }, 4000);
  
      return () => {
        clearTimeout(showDotsTimer);
        clearTimeout(navigateToLoginScreen);
      };
    }, []);
  
    return (
      <View style={styles.container}>
        {showingDots ? (
          <Animatable.Text animation="bounce" style={styles.dots}>
            {animationText}
          </Animatable.Text>
        ) : (
          <Animatable.Image
            animation="fadeIn"
            style={styles.butonIconRecovery}
            source={require('../assets/marque-dentro-del-circulo.png')}
          />
        )}
        {showingDots ? null : (
          <View>
            <Text style={styles.tutorText}>Instrucciones enviadas</Text>
          </View>
        )}
      </View>
    );
  };
  
  export default WaitingScreen;