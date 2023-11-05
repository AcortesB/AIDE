import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorGetPhotoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_photo, description_changed } = route.params;
  console.log("description_changed en getPhotoScreen:", description_changed)
  const [photo, setPhotoInfo] = useState([]); 
  const [people, setPhotoPeople] = useState([]); 
  const [description, setPhotoDescription] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
      // cogemos la foto
      fetch(serverurl+'/photos/' + selected_photo.id + '') 
        .then(response => response.json())
        .then(photo_info => {
          console.log("Got the photo info")
          setPhotoDescription(photo_info.description)
          setPhotoInfo(photo_info)
          
          // cogemos la lista de personas que sale en la foto
          const fetchPromises = fetch(serverurl+'/photos/' + photo_info.id + '/people')
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
    }, [description_changed])
  );

      
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

  const handleDeletePhoto = () => {
    fetch((serverurl+'/photos/' + selected_photo.id + ''), {    
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Photo deleted successfully');
          navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})
        } else {
          console.error('Error deleting photo');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  const handlePhotoDesciptionUpload = () => {
    //TODO: navegación a la pantalla TutorUploadPhotoDescriptionScreen
    navigation.navigate('TutorUpdatePhotoDescription', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, selected_photo})
  };

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

        <View style={styles.GetPhotoContainer}>
          {photo && (
            <Image
              source={{ uri: `http://localhost:8000/uploads/${photo.photo_file}` }}
              style={styles.image}
            />
          )}
        </View>

        <View style={styles.PhotoDescriptionContainer}>
          <Text style={[styles.tutorText, styles.descriptionText]}>{description}</Text>
          <TouchableOpacity onPress={handlePhotoDesciptionUpload} style={styles.deletePhotoBtn}>
            <Image
              source={require("../assets/editar.png")}
              style={styles.butonIcon}
            />
            <Text style={styles.tutorText}>Editar descripción</Text>
          </TouchableOpacity>
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
          <TouchableOpacity onPress={handleDeletePhoto} style={styles.deletePhotoBtn}>
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