import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import '../App.js'
import { styles } from '../styles'; // Import the styles object from styles.js

const ChargedLoginScreen = ({navigation, route}) => {

  const { nickname, password } = route.params;
  
  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("../assets/AIDE_blue_big.png")} 
      />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholderTextColor="#003f5c"
          value={nickname} // Asignar el valor de nickname a la prop value
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
        />        
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('TutorHome', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>ENTRAR</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ChargedLoginScreen; // Export the component