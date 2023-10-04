import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const TutorAddSeniorScreen = ({navigation, route}) => {

  const { tutor_nickname, tutor_password } = route.params;
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [sex, setSex] = useState(null);
  const [birth_place, setBirthPlace] = useState("");
  const [descendants_num, setDescendantsNum] = useState("");
  const [sons_num, setSonsNum] = useState("");
  const [daughters_num, setDaughtersNum] = useState("");
  const [siblings_num, setSiblingsNum] = useState("");
  const [brothers_num, setBrothersNum] = useState("");
  const [sisters_num, setSistersNum] = useState("");
  const [partner_name, setPartnerName] = useState("");
  const [mother_name, setMotherName] = useState("");
  const [father_name, setFatherName] = useState("");
  const [birth_year, setBirthYear] = useState(""); //opciones para el desplegable
  
  const sexOptions = ["Masculino", "Femenino"];  
  



  const handleSeniorSignup = () => {

    fetch(serverurl+'/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 100,
        name: name,
        username: nickname,
        mail: '-',
        password: password,
        type: 'senior'
      }),
    })
      .then(response => {
        
        console.log(response.ok)
        if (response.ok) {
          
          fetch(serverurl+'/users/'+nickname+'')
              .then(response1 => response1.json())
              .then(seniorData => {
                console.log(seniorData.id)

                fetch(serverurl+'/users/tutor/'+tutor_nickname+'/seniors/'+seniorData.id+'', { //hacemos post del usuario en Tutor
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({      
                    id: seniorData.id,
                    total_playing_time: "00:00:00",
                    hour_start_avg: "00:00:00",
                    hour_finish_avg: "00:00:00",
                    score_avg: 0,
                    tutor_id: 100,
                    sex: sex,
                    birth_year: birth_year,
                    birth_place: birth_place,
                    descendants_num: descendants_num,
                    sons_num: sons_num,
                    daughters_num: daughters_num,
                    siblings_num: siblings_num,
                    brothers_num: brothers_num,
                    sisters_num: sisters_num,
                    partner_name: partner_name,
                    father_name: father_name,
                    mother_name: mother_name
                  }),
                })
                .then(response2 => {
                  console.log(response2.ok)
                  if (response2.ok) {
                    console.log(tutor_nickname)
                    //post del senior con todas las customized activities
                    fetch(serverurl+'/associate_customized_activities/'+seniorData.id, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        id_senior: seniorData.id,
                        id_activity: 0
                      }),
                    })
                    .then(response3 => {
                      console.log('ahora mismo ya tiene customized activities')
                      navigation.push('TutorHome', { nickname: tutor_nickname, password: tutor_password }); //si ha salido bien nos iremos al charged login
                    })
                    .catch(error => {
                      console.error(error);
                    })
                  }
                })
                .catch(error => {
                  console.error(error);
                });
              })
        } else {
          throw new Error('Error en la solicitud POST');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("../assets/AIDE_blue_big.png")} 
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre del Senior nuevo."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de usuario del Senior nuevo."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña del Senior nuevo."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />        
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={sex || ""}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Seleccione el sexo." value="" />
          {sexOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Año de nacimiento."
          placeholderTextColor="#003f5c"
          onChangeText={(birth_year) => setBirthYear(birth_year)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Lugar de nacimiento."
          placeholderTextColor="#003f5c"
          onChangeText={(birth_place) => setBirthPlace(birth_place)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número total de hijos e hijas."
          placeholderTextColor="#003f5c"
          onChangeText={(descendants_num) => setDescendantsNum(descendants_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número de hijos varones."
          placeholderTextColor="#003f5c"
          onChangeText={(sons_num) => setSonsNum(sons_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número de hijas."
          placeholderTextColor="#003f5c"
          onChangeText={(daughters_num) => setDaughtersNum(daughters_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número total de hermanos y hermanas."
          placeholderTextColor="#003f5c"
          onChangeText={(siblings_num) => setSiblingsNum(siblings_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número de hermanos varones."
          placeholderTextColor="#003f5c"
          onChangeText={(brothers_num) => setBrothersNum(brothers_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Número de hermanas."
          placeholderTextColor="#003f5c"
          onChangeText={(sisters_num) => setSistersNum(sisters_num)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de la pareja."
          placeholderTextColor="#003f5c"
          onChangeText={(partner_name) => setPartnerName(partner_name)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de la madre."
          placeholderTextColor="#003f5c"
          onChangeText={(mother_name) => setMotherName(mother_name)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre del padre."
          placeholderTextColor="#003f5c"
          onChangeText={(father_name) => setFatherName(father_name)} 
        />
      </View>
      
      <TouchableOpacity onPress={handleSeniorSignup} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Crear nuevo Senior</Text>
      </TouchableOpacity>

    </View>
  );
};


export default TutorAddSeniorScreen; // Export the component