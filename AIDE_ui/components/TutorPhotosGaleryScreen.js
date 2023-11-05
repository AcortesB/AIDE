import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'


const TutorPhotosGaleryScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  console.log("tutor_nickname",tutor_nickname)
  console.log("tutor_password", tutor_password)
  console.log("selected_senior", selected_senior)
  const [senior_photos, setSeniorPhotos] = useState([]); 

  
  useFocusEffect(
    React.useCallback(() => {
      // conseguimos las fotos que pertenezcan al senior
      fetch(serverurl+'/'+selected_senior.senior_id+'/photos')
      .then(response => response.json())
      .then(photos => {
        photos.sort((a, b) => a.id - b.id);
        setSeniorPhotos(photos);
      })
      .catch(error => {
        console.log('Error:', error);
        return [];
      }); 
    }, [])
  );

  useEffect(() => {
    //console.log("este es el senior photos:")
    //console.log(senior_photos)
  }, [senior_photos]);

  // 3. haces map y lees todas las fotos que tengas

  const handlePhotoPress = (photo) => {
    navigation.navigate('TutorGetPhoto', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_photo: photo  });
    
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item)} >
      <Image
        source={{ uri: `http://localhost:8000/uploads/${item.photo_file}` }}
        style={styles.image}
      />
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