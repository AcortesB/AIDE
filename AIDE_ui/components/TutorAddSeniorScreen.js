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
      <StatusBar style="auto" />
      <Text style={[styles.textContainer2, styles.tutorText, { fontWeight: 'bold' }]}>
        Datos del nuevo senior
      </Text>
      <ScrollView style={styles.addSeniorScrollView}>
        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: Antonia"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setName(name)}
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre de usuario del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: ANTR60"
            placeholderTextColor="#003f5c"
            onChangeText={(nickname) => setNickname(nickname)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese la contraseña del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Contraseña"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />        
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Seleccione el sexo del senior nuevo.</Text>
        <View style={styles.inputView}>
          <Picker
            selectedValue={sex || ""}
            style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
            onValueChange={(itemValue) => setSex(itemValue)}
          >
            <Picker.Item label="sexo" value="" />
            {sexOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el año de nacimiento del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 1960"
            placeholderTextColor="#003f5c"
            onChangeText={(birth_year) => setBirthYear(birth_year)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el lugar de nacimiento del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: Madrid"
            placeholderTextColor="#003f5c"
            onChangeText={(birth_place) => setBirthPlace(birth_place)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número total de descendentes del senior nuevo.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 3"
            placeholderTextColor="#003f5c"
            onChangeText={(descendants_num) => setDescendantsNum(descendants_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número de hijos varones del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 2"
            placeholderTextColor="#003f5c"
            onChangeText={(sons_num) => setSonsNum(sons_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número de hijas del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 1"
            placeholderTextColor="#003f5c"
            onChangeText={(daughters_num) => setDaughtersNum(daughters_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número total de hermanos y hermanas del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 4"
            placeholderTextColor="#003f5c"
            onChangeText={(siblings_num) => setSiblingsNum(siblings_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número de hermanos varones del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 2"
            placeholderTextColor="#003f5c"
            onChangeText={(brothers_num) => setBrothersNum(brothers_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el número de hermanas del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: 2"
            placeholderTextColor="#003f5c"
            onChangeText={(sisters_num) => setSistersNum(sisters_num)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre de la pareja del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: Ramón"
            placeholderTextColor="#003f5c"
            onChangeText={(partner_name) => setPartnerName(partner_name)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre de la madre del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: Carmen"
            placeholderTextColor="#003f5c"
            onChangeText={(mother_name) => setMotherName(mother_name)} 
          />
        </View>

        <Text style={[styles.textContainer2, styles.tutorText]}>Ingrese el nombre del padre del senior.</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ejemplo: Luís"
            placeholderTextColor="#003f5c"
            onChangeText={(father_name) => setFatherName(father_name)} 
          />
        </View>
        
        <TouchableOpacity onPress={handleSeniorSignup} style={styles.loginBtn}>
          <Text style={styles.tutorText}>Crear nuevo Senior</Text>
        </TouchableOpacity>
      </ScrollView>
      

    </View>
  );
};


export default TutorAddSeniorScreen; // Export the component