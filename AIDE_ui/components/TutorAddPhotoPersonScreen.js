import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorAddPhotoPersonScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file, people_changed } = route.params;
  //console.log("uploaded_photo_file NOMBRE EN PERSONSCREEN:",uploaded_photo_file)
  //console.log(selected_senior.id)
  //person fields
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [sex, setSex] = useState(null);
  const [skin, setSkin] = useState(null);
  const [eyes, setEyes] = useState(null);
  const [rank, setRank] = useState(null);
  const [people, setPeople] = useState([]);
  const [peopleOptions, setPeopleOptions] = useState([]); //lo ustilizaremos para seleccionar una persona que ya hayamos etiquetado.
  const [person, setPerson] = useState(null);
  const [taggedPersonBool, setTaggedPersonBool] = useState(false);
  const [PName, setPName] = useState('');
  const [PSurname, setPSurname] = useState('');


  const sexOptions = ["Masculino", "Femenino"];
  const skinOptions = ["Blanco", "Negro", "Moreno", "Otros"];
  const eyesOptions = ["Azul", "Marrón", "Verde", "Negro", "Otros"];
  const rankOptions = ["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela", "Tío", "Tía", "Primo", "Prima", "Sobrino", "Sobrina", "Otros"];
  

  //en el people options metemos una lista de personas (nombre y apellido)
  //que ya estén etiquetadas en fotos del senior

  //cuando cambie el valor de esto se van a rellenar los campos y le van a poder dar a siguiente

  useEffect(() => {
    fetch(serverurl+'/senior/' + selected_senior.senior_id + '/peple_in_senior_photos')
      .then(response => response.json())
      .then(tagged_people => {
        setPeople(tagged_people);
        //tenemos que establecer el peopleOptions bueno
        //recorremos el tagged_people este e iremos metiendo al peopleOptions nombre y apellido
        // Creamos una cadena concatenando nombres y apellidos
        const people_names_surnames = tagged_people.map(person => `${person.name} ${person.surname}`);

        // Luego, establecemos peopleOptions utilizando setPeopleOptions
        setPeopleOptions(people_names_surnames);
        console.log("people_names_surnames:",people_names_surnames)
        
      })
      .catch(error => {
        console.log('Error:', error);
        return [];
      });   
  }, []);
  
 
  useEffect(() => {
    if (person){
      //separamos la person para poder coger su name y su surname
      let [personName, personSurname] = person.split(' '); 
      setPName(personName);
      setPSurname(personSurname);
      
      //buscar esta persona por el name, el surname y el id_senior y coger su info
      
      fetch(serverurl+'/senior/'+selected_senior.senior_id+'/peple_in_senior_photos/'+personName+'/'+personSurname)
      .then(response => response.json())
      .then(tagged_person => {

        setName(tagged_person.name);
        setSurname(tagged_person.surname);
        setSex(tagged_person.sex);
        setSkin(tagged_person.skin_color);
        setEyes(tagged_person.eyes_color);
        setRank(tagged_person.familiar_rank);
        //poner todos los campos con la info de la persona 
        console.log('tagged_person obtenida de la db:',tagged_person)
        handlePerson();
      })
      .catch(error => {
        console.log('Error:', error);
        return [];
      });   
    
    //rellenar los campos con la info de la persona
    }
  }, [person]);

  const handlePerson = () => {
    if (name && surname && sex && skin && eyes && rank){
      console.log("name:",name)  
      console.log("surname:",surname)
      console.log("sex:",sex)
      console.log("skin:",skin)
      console.log("eyes:",eyes)
      console.log("rank:",rank)
      //miramos si la persona ya existe o si es nueva, si es nueva la posteamos normal, si no, simplemente pasamos datos y a la nex pantalla
      if (person){
        console.log("Pues la persona ya estaba etiquetada en otra foto.")
        navigation.navigate('TutorAddPhotoPosition', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: uploaded_photo_file, added_person_name: PName, added_person_surname: PSurname});
      }else{
        fetch(serverurl+'/people', { //posteamos a la persona
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
            familiar_rank: rank,
            id_senior: selected_senior.senior_id
          }),
        })
        .then(response => {
          if (response.ok){
            console.log("Se ha añadido la persona nueva")
            navigation.navigate('TutorAddPhotoPosition', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: uploaded_photo_file, added_person_name: name, added_person_surname: surname, people_changed: people_changed});
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    }
  };

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Si sale una persona en este foto que ya haya etiquetado en otra, seleccionela, por favor.</Text>
      
      <View style={styles.inputView}>
        <Picker
          selectedValue={person}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setPerson(itemValue)}
          enabled={!name} // Inhabilita el Picker si person existe
        >
          <Picker.Item label="Seleccione a una persona" value={null} />
          {peopleOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
      
      <Text>Si es una persona que etiqueta por primera vez, rellene los campos de abajo para añadirla.</Text>
      
      <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre de la persona.</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]}
          placeholder="Ejemplo: Amparo"
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)} 
        />
      </View>
  
      <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el apellido de la persona.</Text>
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]}
          placeholder="Ejemplo: García"
          placeholderTextColor="#003f5c"
          onChangeText={(surname) => setSurname(surname)}
        />        
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el sexo de la persona.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={sex}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSex(itemValue)}
          enabled={!person} // Inhabilita el Picker si person existe
        >
          <Picker.Item label="Sexo" value={null} />
          {sexOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el color de piel de la persona.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={skin}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSkin(itemValue)}
          enabled={!person} // Inhabilita el Picker si person existe
        >
          <Picker.Item label="Color de piel" value={null} />
          {skinOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el color de ojos de la persona.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={eyes}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setEyes(itemValue)}
          enabled={!person} // Inhabilita el Picker si person existe
        >
          <Picker.Item label="Color de ojos." value={null} />
          {eyesOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
 
      <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el rango familiar de la persona.</Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={rank}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setRank(itemValue)}
          enabled={!person} // Inhabilita el Picker si person existe
        >
          <Picker.Item label="Rango familiar" value={null} />
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