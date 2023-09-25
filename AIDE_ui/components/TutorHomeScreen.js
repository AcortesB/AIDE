import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorHomeScreen = ({navigation, route}) => {
  
    const { nickname, password } = route.params;
    const [seniors, setSeniors] = useState([]);
    const [names, setNames] = useState([]);
    const [user, setUser] = useState("");
    const [selectedSenior, setSelectedSenior] = useState({ name: null, senior_id: null });
    const [completeSeniors, setCompleteSeniors] = useState([]);
    
    useEffect(() => {
      fetch('http://127.0.0.1:8000/tutors/' + nickname + '/seniors') // consigo los seniors del tutor en cuestión
        .then(response => response.json())
        .then(seniors => {
          
          setSeniors(seniors) //son setSenior establezco seniors (que al ginal es como un array con todos los seniors del tutor)
  
          const namesPromises = seniors.map(senior => {
            const senior_id = senior.id
            return fetch('http://127.0.0.1:8000/seniors/' + senior.id)
              .then(response => response.json())
              .then(name => ({ name, senior_id })) // Crear el par con name y senior_id
              .catch(error => {
                console.log('Error:', error);
              });
          });
  
          Promise.all(namesPromises)
            .then(names => {
              setNames(names); //establecemos names con lo que nos devuelvan las promises de haber mapeado
            })
            .catch(error => {
              console.log('Error:', error);
            });
        })
        .catch(error => {
          console.log('Error:', error);
        });
    },); //queremos que salga cada vez que se modifique la variable [names]
  
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
                  key={name}
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