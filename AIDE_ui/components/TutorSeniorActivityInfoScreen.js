import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'
//import Video from 'react-native-video';
// import {Video} from 'expo_av'

const TutorSeniorActivityInfoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [activity, setActivity] = useState([]);
  // const [videoName, setVideoName] = useState("");
  console.log('La actividad que me han pasado:')
  console.log(selected_activity.id)
  
  const video = React.useRef(null)
  const [status, setStatus]  = React.useState({});

  //fetch para coger la info de la activity deseada
  useEffect(() => {
    fetch(serverurl+'/activities/'+selected_activity.id+'')
      .then(response => response.json())
      .then(activityData => {
        // console.log("ACTIVITYDATAAAAAAAAAAAAAAAAA: ",activityData.demo_video)
        setActivity(activityData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []
  );

  useEffect(() => {
    console.log('Esto es la activity:')
    console.log(activity);
  }, [activity]);

  const videoRef = React.useRef();
    const [stop, setStop] = useState(false);

    const handleVideo = () => {
        setStop(!stop);
        if (stop === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };

  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}> 
        <Text style={[styles.tutorText, styles.textSpacing, { fontWeight: 'bold' }]}>{activity.name}</Text>
        
        <Text style={[styles.tutorText, styles.textSpacing]}>{activity.description}</Text>

        <video onClick={handleVideo} ref={videoRef} style={styles.video} src={serverurl+"/videos/"+activity.demo_video+".mp4"} type="video/mp4">
        </video>

        <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorActivityScores', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: selected_activity})} style={styles.loginBtn}>
          <Text style={styles.tutorText}>Puntuaciones de {selected_senior.name}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default TutorSeniorActivityInfoScreen; // Export the component