import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorGetPhotoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_photo } = route.params;
  
  const [photo, setPhotoInfo] = useState([]); 
  const [people, setPhotoPeople] = useState([]); 
  const [description, setPhotoDescription] = useState([]);


  useEffect(() => {
    // cogemos la foto
    fetch('http://127.0.0.1:8000/photos/' + selected_photo.id + '') 
      .then(response => response.json())
      .then(photo_info => {
        console.log("Got the photo info")
        setPhotoDescription(photo_info.description)
        setPhotoInfo(photo_info)
        
        // cogemos la lista de personas que sale en la foto
        const fetchPromises = fetch('http://127.0.0.1:8000/photos/' + photo_info.id + '/people')
          .then(response => response.json())
          .then(people_list => {
            console.log("Got the people list")
            //setPhotoPeople(people_list)
            console.log(people_list)
            return people_list;
          })
          .catch(error => {
            console.log('Error:', error);
            return [];
          });

        Promise.all([fetchPromises])
          .then(peopleArray => {
            setPhotoPeople(peopleArray);
            //console.log(peopleArray)
          });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  useEffect(() => {
  }, [people]);

  useEffect(() => {
  }, [description]);

  useEffect(() => {
  }, [photo]);

  
  const renderPersonItem = ({ item }) => (
    <View>
      <Text style={styles.tutorText}>{item.name} {item.surname} </Text>
    </View>
    
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

        <View style={styles.GetPhotoContainer}>
          {photo && (
            <Image
              source={{ uri: `http://localhost:8000/uploads/${photo.photo_file}.jpg` }}
              style={styles.image}
            />
          )}
        </View>

        <View style={styles.PhotoDescriptionContainer}>
          <Text style={[styles.tutorText, styles.descriptionText]}>{description}</Text>
        </View>
        
        <View style={styles.PhotoPeopleListContainer}>
          <Text style={styles.tutorText}>Personas que aparecen:</Text>
          <FlatList
            data={people}
            renderItem={({ item }) => (
              <FlatList
                data={item}
                renderItem={renderPersonItem}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      
        <View style={styles.EndScreenIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ALL_DELETES_TO_DO', { selected_photo: selected_photo})} style={styles.deletePhotoBtn}>
            <Image
              source={require("../assets/eliminar-simbolo.png")}
              style={styles.butonIcon}
            />
            <Text style={styles.tutorText}>Eliminar fotografía</Text>
          </TouchableOpacity>
        </View> 

    </View>
  );
};


export default TutorGetPhotoScreen; // Export the component