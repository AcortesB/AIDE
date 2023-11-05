import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'


const TutorHomeScreen = ({navigation, route}) => {
  
    const { nickname, password, seniors_changed} = route.params; //al principio readSenior estará undefined, solo será defined cuando lleguen de añadir u senior
    console.log("seniors_changed en el home:", seniors_changed)
    const [names, setNames] = useState([]);
    const [selectedSenior, setSelectedSenior] = useState({ name: null, senior_id: null });
    

    useFocusEffect(
      React.useCallback(() => {
        fetch(serverurl+'/tutors/' + nickname + '/seniors') // consigo los seniors del tutor en cuestión
          .then(response => response.json())
          .then(seniors => {
            console.log(seniors)
            const namesPromises = seniors.map(senior => {
              const senior_id = senior.id
              return fetch(serverurl+'/seniors/' + senior.id)
                .then(response => response.json())
                .then(name => ({ name, senior_id })) // Crear el par con name y senior_id
                .catch(error => {
                  console.log('Error:', error);
                });
                console.log(senior_id);
            });
    
            Promise.all(namesPromises)
              .then(seniorNames => {
                setNames(seniorNames); //establecemos names con lo que nos devuelvan las promises de haber mapeado
              })
              .catch(error => {
                console.log('Error:', error);
              });
          })
          .catch(error => {
            console.log('Error:', error);
          });
      }, [seniors_changed])
    );
  
    const handleSeniorSelection = (seniorName, seniorId) => {
      setSelectedSenior({ name: seniorName, senior_id: seniorId }); // Establecemos setSelectedSenior con el par de name y senior_id
    };
  
    // hook de react que se utiliza para realizar tareas secundarias después de que se renderice el componente
    // este hook se ejecutará cada vez que el valor de selectedSenior cambie.
    useEffect(() => {
    }, [selectedSenior]);
    
    return (
        
      <View style={styles.container}> 
        
        <StatusBar style="auto" />
        
          {names.length > 0 ? (
          <>
            <Text style={styles.tutorText}>Seleccione un Senior asociado:</Text>
              {names.map((senior) => (
                <TouchableOpacity
                  key={senior.name}
                  onPress={() => handleSeniorSelection(senior.name, senior.senior_id)}
                  style={[
                    styles.loginBtnTransparent,
                    selectedSenior && selectedSenior.name === senior.name && { backgroundColor: "#3882e7" },
                  ]}
                >
                  <Text style={styles.tutorText}>{senior.name}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <Text style={styles.tutorText}>No tiene Seniors todavía</Text>
          )}
        
        
  
        <TouchableOpacity onPress={() => navigation.navigate('TutorAddSenior', { tutor_nickname: nickname , password: password})} style={styles.addSeniorBtn}>
          <Image style={styles.butonIcon} 
            source={require("../assets/anadir-amigo.png")} 
          />
          <Text style={styles.tutorText}>Añadir un Senior</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          onPress={() => {
            if (selectedSenior && selectedSenior.name && selectedSenior.senior_id) {
              navigation.navigate('TutorSeniorFolders', {
                tutor_nickname: nickname,
                tutor_password: password,
                selected_senior: selectedSenior,
                seniors_changed: seniors_changed
              });
            }
          }}
          style={styles.loginBtn}
        >
        
        <Text style={styles.tutorText}>Listo</Text>
        </TouchableOpacity>
  
      </View>
    );
  };


  export default TutorHomeScreen; // Export the component