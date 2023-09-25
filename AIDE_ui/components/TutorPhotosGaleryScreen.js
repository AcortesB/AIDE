import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const TutorPhotosGaleryScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  const [customized_acts, setCustomizedActs] = useState([]); 
  const [senior_photos, setSeniorPhotos] = useState([]); 

  
  useEffect(() => {
    // 1. fetch para sacar todas las customized activities que tengan senior_id = selected_senior.senior_id
    fetch('http://127.0.0.1:8000/customized_activities_by_senior/' + selected_senior.senior_id + '') //id, senior_id
      .then(response => response.json())
      .then(customized_activities => {
        //console.log(customized_activities)
        setCustomizedActs(customized_activities)
        
        // 2. por cada customized activity que hayas sacado coges sus fotos y las pones en una variable
        const fetchPromises = customized_activities.map(activity => {
          return fetch('http://127.0.0.1:8000/customized_activities/' + activity.id + '/photos')
            .then(response => response.json())
            .then(photos => {
              //console.log(photos)
              return photos;
            })
            .catch(error => {
              console.log('Error:', error);
              return [];
            });
        });

        Promise.all(fetchPromises)
          .then(photosArray => {
            // 3. Combinar las fotos en una única variable y eliminar las fotos repetidas
            const combinedPhotos = [];
            photosArray.forEach(photos => {
              photos.forEach(photo => {
                if (!combinedPhotos.some(existingPhoto => existingPhoto.id === photo.id)) {
                  combinedPhotos.push(photo);
                }
              });
            });

            // 4. Establecer las fotos combinadas en el estado
            //console.log(combinedPhotos)
            setSeniorPhotos(combinedPhotos);
          });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  useEffect(() => {
  }, [customized_acts]);

  useEffect(() => {
    console.log("este es el senior photos:")
    console.log(senior_photos)
  }, [senior_photos]);

  // 3. haces map y lees todas las fotos que tengas

  const handlePhotoPress = (photo) => {
    navigation.navigate('TutorGetPhoto', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_photo: photo  });
    
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item)} >
      <Image
        source={{ uri: `http://localhost:8000/uploads/${item.photo_file}.jpg` }}
        style={styles.image}
      />
      <Text style={styles.tutorText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhotoDescription', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior })} style={styles.addPhotoBtn}>
        <Image
          source={require("../assets/anadir-imagen.png")}
          style={styles.butonIcon}
        />
        <Text style={styles.tutorText}>Añadir fotografía</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.mobileScrollViewBackground}>
        <FlatList
          data={senior_photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

    </View>
  );
};


export default TutorPhotosGaleryScreen; // Export the component