import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorAddPhotoPersonScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file } = route.params;
  //person fields
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [sex, setSex] = useState(null);
  const [skin, setSkin] = useState(null);
  const [eyes, setEyes] = useState(null);
  const [rank, setRank] = useState(null);

  const sexOptions = ["Masculino", "Femenino"];
  const skinOptions = ["Blanco", "Negro", "Moreno", "Otros"];
  const eyesOptions = ["Azul", "Marrón", "Verde", "Negro", "Otros"];
  const rankOptions = ["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela", "Tío", "Tía", "Primo", "Prima", "Sobrino", "Sobrina", "Otros"];


  const handlePerson = () => {
    if (name && surname && sex && skin && eyes && rank)   
      fetch('http://127.0.0.1:8000/people', { //posteamos la photo
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:100,
          name:name,
          surname:surname,
          sex:sex,
          skin_color: skin,
          eyes_color: eyes,
          familiar_rank: rank
        }),
      })
      .then(response => {
        if (response.ok){
          console.log("Se ha añadido la persona nueva")
          navigation.navigate('TutorAddPhotoPosition', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa", added_person_name: name, added_person_surname: surname});
        }
      })
      .catch(error => {
        console.error(error);
      });

  };
    
    useEffect(() => {
    }, [name]);

    useEffect(() => {
    }, [surname]);

  return(
    <View style={styles.container}>
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
          placeholder="Apellido."
          placeholderTextColor="#003f5c"
          onChangeText={(surname) => setSurname(surname)}
        />        
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={sex}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Seleccione el sexo." value={null} />
          {sexOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={skin}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSkin(itemValue)}
        >
          <Picker.Item label="Seleccione el color de piel." value={null} />
          {skinOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={eyes}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setEyes(itemValue)}
        >
          <Picker.Item label="Seleccione el color de ojos." value={null} />
          {eyesOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={rank}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setRank(itemValue)}
        >
          <Picker.Item label="Seleccione el rango familiar." value={null} />
          {rankOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>


      <TouchableOpacity onPress={handlePerson} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};


export default TutorAddPhotoPersonScreen; // Export the component