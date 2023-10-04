import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const SignupScreen = ({ navigation, route }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
  
    const handleSignup = () => {
  
      fetch(serverurl+'/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 100,
          name: name,
          username: nickname,
          mail: mail,
          password: password,
          type: 'tutor'
        }),
      })
        .then(response => {
          
          //console.log('Se ha actualizado la tabla de users? ',response.ok)
          if (response.ok) {
            
            fetch(serverurl+'/users/'+nickname+'')
                .then(response1 => response1.json())
                .then(tutorData => {
                  console.log(tutorData.id)
                  
                  fetch(serverurl+'/users/tutors/'+tutorData.id+'', { //hacemos post del usuario en Tutor
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: tutorData.id
                    }),
                  })
                  .then(response2 => {
                    //console.log('Ahora se ha actualizado la tabla de tutors: ',response2.ok)
                    if (response2.ok) {
                      console.log('Nos tendriamos que ir al charged login')
                      navigation.navigate('ChargedLogin', { nickname: nickname, password: password }); //si ha salido bien nos iremos al charged login
                    }
                  })
                  .catch(error => {
                    console.error(error);
                  });
                })
          } else {
            throw new Error('Error en la solicitud POST');
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    return (
      <View style={styles.container}> 
        
        <Image style={styles.image} 
          source={require("../assets/AIDE_blue_big.png")} 
        />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={[styles.TextInput, styles.tutorText]} 
            placeholder="Nombre."
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>
  
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
            placeholder="Correo electrónico."
            placeholderTextColor="#003f5c"
            onChangeText={(mail) => setMail(mail)} 
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
        
        <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
          <Text style={styles.tutorText}>REGISTRARSE</Text>
        </TouchableOpacity>
        
      </View>
    );
  };


  export default SignupScreen; // Export the component