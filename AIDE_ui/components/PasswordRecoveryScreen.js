import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const PasswordRecoveryScreen = ({navigation, route}) => {
   //esta pantalla es fake, para gestionar la recuperación de la contraseña 
  
   const [mail, setMail] = useState("");
  
  
  const handleSendInstructions = () => {
    navigation.navigate('Waiting');
  };

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.textContainer2}>
        <Text style={styles.tutorText}>
          Introduce el mail que usaste al registrarte y te enviaremos instrucciones para resetear tu contraseña.
        </Text>
      </View>
        <View style={styles.inputView}>
            <TextInput
            style={[styles.TextInput, styles.tutorText]}
            placeholder="ejemplo@gmail.com"
            placeholderTextColor="#003f5c"
            onChangeText={(adress) => setMail(adress)} 
            />
        </View>

        <TouchableOpacity onPress={handleSendInstructions} style={styles.loginBtn}>
            <Text style={styles.tutorText}>Enviar intrucciones</Text>
        </TouchableOpacity>
    </View>
  );
};


export default PasswordRecoveryScreen; // Export the component