import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../config.js'

import { styles } from '../styles'; // Import the styles object from styles.js


const LoginScreen = ({navigation}) => {
  // the login screen
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isValidCredentials, setIsValidCredentials] = useState(false);

  const handleLogin = () => {
    fetch(serverurl+'/users/'+nickname+'/'+password+'')
      .then(response => response.json())
      .then(userData => {
        console.log(userData) //TODO: como carajos compruebo que no es una respuesta incorrecta?? 
        if (userData.detail == 'Wrong user or password') {
          setIsValidCredentials(false);
          
          console.log('Credenciales incorrectas');
          
          //TODO: mensaje de "No introdujiste correctamente tu nombre de usuario o contraseña"

        } else {
          setIsValidCredentials(true);
          if (userData.type == 'tutor'){
            navigation.navigate('TutorHome', { nickname: nickname, password: password });

          }
          else{
            console.log('este es el name del senior:')
            console.log(name)
            navigation.navigate('SeniorWelcome', { senior_nickname: nickname, senior_password: password , senior_name: userData.name });
          }
          
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("../assets/AIDE_blue_big.png")} 
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Contraseña."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />        
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Olvidaste la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup', { nickname: nickname , password: password})}>
        <Text style={styles.forgot_button}>No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.tutorText}>ENTRAR</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default LoginScreen; // Export the component