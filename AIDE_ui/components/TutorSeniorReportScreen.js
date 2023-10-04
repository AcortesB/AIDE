import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorSeniorReportScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior} = route.params;
  const [senior, setSenior] = useState([]);
  const [activities, setActivities] = useState([]); // definimos como se va a llamar el cojunto de actividades
  
  //fetch para coger las actividades jugadas por la persona
  useEffect(() => {
      fetch(serverurl+'/senior/'+selected_senior.senior_id+'/playedactivities')
        .then(response => response.json())
        .then(activitiesData => {
          setActivities(activitiesData);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }, []
  );

  //fetch para coger el senior
  useEffect(() => {
    fetch(serverurl+'/senior/'+selected_senior.senior_id+'')
      .then(response => response.json())
      .then(seniorData => {
        setSenior(seniorData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []
);

  useEffect(() => {
    console.log('Esto es el senior:')
    console.log(senior);
  }, [senior]);


  const handleActivityPress = (activity) => {
    navigation.navigate('TutorSeniorActivityInfo', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: activity}); 
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.listoBtn}>
      <Text style={styles.tutorText}>{item.name}</Text>
    </TouchableOpacity>
  );
    

  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" /> 
      <View style={styles.recuadroTransparente}>
          <Text style={[styles.tutorTextBold, styles.textSpacing]}>{selected_senior.name}</Text>
          <Text style={[styles.tutorText, styles.textSpacing]}>Time playing: {senior.total_playing_time} h </Text>
          <Text style={[styles.tutorText, styles.textSpacing]}>Start hour: {senior.hour_start_avg} h</Text>
          <Text style={[styles.tutorText, styles.textSpacing]}>Finish hour: {senior.hour_finish_avg}h</Text>
          <Text style={[styles.tutorText, styles.textSpacing]}>Score average: {senior.score_avg}</Text>

          <FlatList
            data={activities}
            renderItem={renderActivityItem}
            keyExtractor={(item) => item.id.toString()}
          />
      </View>
        
    </View>
  );
};


export default TutorSeniorReportScreen; // Export the component