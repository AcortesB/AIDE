import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import { styles } from './styles'; // Import the styles object from styles.js


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, title: 'Login' }} />
        
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign up' }} />
        <Stack.Screen name="ChargedLogin" component={ChargedLoginScreen} options={{ title: 'Charged login' }} />
        <Stack.Screen name="TutorHome" component={TutorHomeScreen} options={{ title: 'Tutor home' }} />
        <Stack.Screen name="TutorSeniorFolders" component={TutorSeniorFoldersScreen} options={{ title: 'Senior folders' }} />
        <Stack.Screen name="TutorAddSenior" component={TutorAddSeniorScreen} options={{ title: 'Add Senior' }} />
        <Stack.Screen name="TutorSeniorReport" component={TutorSeniorReportScreen} options={{ title: 'Senior Report' }} />
        <Stack.Screen name="TutorPhotosGalery" component={TutorPhotosGaleryScreen} options={{ title: 'Tutor photos galery' }} />
        <Stack.Screen name="TutorGetPhoto" component={TutorGetPhotoScreen} options={{ title: 'Photo info' }} />
        <Stack.Screen name="TutorAddPhotoDescription" component={TutorAddPhotoDescriptionScreen} options={{ title: 'Add photo description' }} />
        <Stack.Screen name="TutorAddPhotoPeople" component={TutorAddPhotoPeopleScreen} options={{ title: 'Add photo people' }} />
        <Stack.Screen name="TutorSeniorActivityInfo" component={TutorSeniorActivityInfoScreen} options={{ title: 'Activity info' }} />
        <Stack.Screen name="TutorSeniorActivityScores" component={TutorSeniorActivityScoresScreen} options={{ title: 'Activity scores' }} />
        <Stack.Screen name="TutorAddPhotoPerson" component={TutorAddPhotoPersonScreen} options={{ title: 'Add person' }} />
        <Stack.Screen name="TutorAddPhotoPosition" component={TutorAddPhotoPositionScreen} options={{ title: 'Add position' }} />


        <Stack.Screen name="SeniorWelcome" component={SeniorWelcomeScreen} options={{ headerShown: false, title: 'Welcome senior!' }} />
        <Stack.Screen name="SeniorHome" component={SeniorHomeScreen} options={{ headerShown: false, title: 'Senior home' }} />
        <Stack.Screen name="SeniorGames" component={SeniorGamesScreen} options={{ headerShown: false, title: 'Senior generic activities' }} />
        <Stack.Screen name="SeniorFamily" component={SeniorFamilyScreen} options={{ headerShown: false, title: 'Senior customized activities' }} />
        <Stack.Screen name="SeniorStartActivity" component={SeniorStartActivityScreen} options={{ headerShown: false, title: 'Senior started activity' }} />
        <Stack.Screen name="SeniorActivityFinished" component={SeniorActivityFinishedScreen} options={{ headerShown: false, title: 'Senior activity finished' }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}


const LoginScreen = ({navigation}) => {
  // the login screen
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isValidCredentials, setIsValidCredentials] = useState(false);

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/users/'+nickname+'/'+password+'')
      .then(response => response.json())
      .then(userData => {
        console.log(userData) //TODO: como carajos compruebo que no es una respuesta incorrecta?? 
        if (userData.detail == 'Wrong user or password') {
          setIsValidCredentials(false);
          
          console.log('Credenciales incorrectas');
          
          //TODO: mensaje de "No introdujiste correctamente tu nombre de usuario o contraseña"

        } else {
          setIsValidCredentials(true);
          if (userData.type == 'tutor'){
            navigation.navigate('TutorHome', { nickname: nickname, password: password });

          }
          else{
            console.log('este es el name del senior:')
            console.log(name)
            navigation.navigate('SeniorWelcome', { senior_nickname: nickname, senior_password: password , senior_name: userData.name });
          }
          
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("./assets/AIDE_blue_big.png")} 
      />
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Contraseña."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />        
      </View>
      
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Olvidaste la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup', { nickname: nickname , password: password})}>
        <Text style={styles.forgot_button}>No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.tutorText}>ENTRAR</Text>
      </TouchableOpacity>
      
    </View>
  );
};


const SignupScreen = ({ navigation, route }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const handleSignup = () => {

    fetch('http://127.0.0.1:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 100,
        name: name,
        username: nickname,
        mail: mail,
        password: password,
        type: 'tutor'
      }),
    })
      .then(response => {
        
        console.log(response.ok)
        if (response.ok) {
          
          fetch('http://127.0.0.1:8000/users/'+nickname+'')
              .then(response1 => response1.json())
              .then(tutorData => {
                console.log(tutorData.id)
                
                fetch('http://127.0.0.1:8000/users/tutors/'+tutorData.id+'', { //hacemos post del usuario en Tutor
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    id: tutorData.id
                  }),
                })
                .then(response2 => {
                  console.log(response2.ok)
                  if (response2.ok) {
                    navigation.navigate('ChargedLogin', { nickname: nickname, password: password }); //si ha salido bien nos iremos al charged login
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
        source={require("./assets/AIDE_blue_big.png")} 
      />
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
          placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Correo electrónico."
          placeholderTextColor="#003f5c"
          onChangeText={(mail) => setMail(mail)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholder="Contraseña."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />        
      </View>
      
      <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
        <Text style={styles.tutorText}>REGISTRARSE</Text>
      </TouchableOpacity>
      
    </View>
  );
};


const ChargedLoginScreen = ({navigation, route}) => {

  const { nickname, password } = route.params;
  
  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("./assets/AIDE_blue_big.png")} 
      />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholderTextColor="#003f5c"
          value={nickname} // Asignar el valor de nickname a la prop value
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.TextInput, styles.tutorText]} 
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
        />        
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('TutorHome', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>ENTRAR</Text>
      </TouchableOpacity>
      
    </View>
  );
};


const TutorHomeScreen = ({navigation, route}) => {
  
  const { nickname, password } = route.params;
  const [seniors, setSeniors] = useState([]);
  const [names, setNames] = useState([]);
  const [user, setUser] = useState("");
  const [selectedSenior, setSelectedSenior] = useState({ name: null, senior_id: null });
  const [completeSeniors, setCompleteSeniors] = useState([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/tutors/' + nickname + '/seniors') // consigo los seniors del tutor en cuestión
      .then(response => response.json())
      .then(seniors => {
        
        setSeniors(seniors) //son setSenior establezco seniors (que al ginal es como un array con todos los seniors del tutor)
        console.log(seniors)

        const namesPromises = seniors.map(senior => {
          const senior_id = senior.id
          return fetch('http://127.0.0.1:8000/seniors/' + senior.id)
            .then(response => response.json())
            .then(name => ({ name, senior_id })) // Crear el par con name y senior_id
            .catch(error => {
              console.log('Error:', error);
            });
        });

        Promise.all(namesPromises)
          .then(names => {
            setNames(names); //establecemos names con lo que nos devuelvan las promises de haber mapeado
          })
          .catch(error => {
            console.log('Error:', error);
          });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [names]); //queremos que salga cada vez que se modifique la variable [names]

  useEffect(() => {
    console.log(names);
  }, [names]);

  const handleSeniorSelection = (seniorName, seniorId) => {
    setSelectedSenior({ name: seniorName, senior_id: seniorId }); // Establecemos setSelectedSenior con el par de name y senior_id
  };

  // hook de react que se utiliza para realizar tareas secundarias después de que se renderice el componente
  // este hook se ejecutará cada vez que el valor de selectedSenior cambie.
  useEffect(() => {
  }, [selectedSenior]);
  
  return (
      
    <View style={styles.container}> 
      
      <StatusBar style="auto" />
      
      
        {names.length > 0 ? (
        <>
          <Text style={styles.tutorText}>Seleccione un Senior asociado:</Text>
            {names.map((senior) => (
              <TouchableOpacity
                key={name}
                onPress={() => handleSeniorSelection(senior.name, senior.senior_id)}
                style={[
                  styles.loginBtnTransparent,
                  selectedSenior && selectedSenior.name === senior.name && { backgroundColor: "#3882e7" },
                ]}
              >
                <Text style={styles.tutorText}>{senior.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={styles.tutorText}>No tiene Seniors todavía</Text>
        )}
      
      

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddSenior', { tutor_nickname: nickname , password: password})} style={styles.addSeniorBtn}>
        <Image style={styles.butonIcon} 
          source={require("./assets/anadir-amigo.png")} 
        />
        <Text style={styles.tutorText}>Añadir un Senior</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          if (selectedSenior && selectedSenior.name && selectedSenior.senior_id) {
            navigation.navigate('TutorSeniorFolders', {
              tutor_nickname: nickname,
              tutor_password: password,
              selected_senior: selectedSenior,
            });
          }
        }}
        style={styles.loginBtn}
      >
      
      <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>

    </View>
  );
};


const TutorSeniorFoldersScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  
  return (
    
    <View style={styles.container}> 
    <StatusBar style="auto" />
      <Text style={styles.tutorText} >Nombre del Senior seleccionado: </Text>
      <Text style={styles.tutorTextBold} >{selected_senior.name}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Fotografías</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorReport', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Actividades</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddSeniorScreen = ({navigation, route}) => {

  const { tutor_nickname, tutor_password } = route.params;
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const handleSeniorSignup = () => {

    fetch('http://127.0.0.1:8000/users', {
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
          
          fetch('http://127.0.0.1:8000/users/'+nickname+'')
              .then(response1 => response1.json())
              .then(seniorData => {
                console.log(seniorData.id)

                fetch('http://127.0.0.1:8000/users/tutor/'+tutor_nickname+'/seniors/'+seniorData.id+'', { //hacemos post del usuario en Tutor
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
                    tutor_id: 100
                  }),
                })
                .then(response2 => {
                  console.log(response2.ok)
                  if (response2.ok) {
                    console.log(tutor_nickname)
                    navigation.navigate('TutorHome', { nickname: tutor_nickname, password: tutor_password }); //si ha salido bien nos iremos al charged login
                    
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
        source={require("./assets/AIDE_blue_big.png")} 
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
      
      <TouchableOpacity onPress={handleSeniorSignup} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Crear nuevo Senior</Text>
      </TouchableOpacity>

    </View>
  );
};


const TutorSeniorReportScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior} = route.params;
  const [senior, setSenior] = useState([]);
  const [activities, setActivities] = useState([]); // definimos como se va a llamar el cojunto de actividades
  
  //fetch para coger las actividades jugadas por la persona
  useEffect(() => {
      fetch('http://127.0.0.1:8000/senior/'+selected_senior.senior_id+'/playedactivities')
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
    fetch('http://127.0.0.1:8000/senior/'+selected_senior.senior_id+'')
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
          <Text style={[styles.tutorText, styles.textSpacing]}>Finish hour: {senior.hour_finish_avg}</Text>
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


const TutorSeniorActivityInfoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [activity, setActivity] = useState([]);
  console.log('La actividad que me han pasado:')
  console.log(selected_activity.id)
  
  //fetch para coger la info de la activity deseada
  useEffect(() => {
    fetch('http://127.0.0.1:8000/activities/'+selected_activity.id+'')
      .then(response => response.json())
      .then(activityData => {
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
  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}> 
        <Text style={[styles.tutorTextBold, styles.textSpacing]}>{activity.name}</Text>
        <Text style={[styles.tutorText, styles.textSpacing]}>Descripción: {activity.description}</Text>
        <Text style={[styles.tutorText, styles.textSpacing]}>Vídeo de demostración: {activity.demo_video}</Text>


        <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorActivityScores', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: selected_activity})} style={styles.loginBtn}>
          <Text style={styles.tutorText}>Puntuaciones de {selected_senior.name}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const TutorSeniorActivityScoresScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [reports, setReports] = useState([]);
  let i = 0
  let suma = 0
  
  //fetch para coger la info de la activity deseada
  useEffect(() => {
    fetch('http://127.0.0.1:8000/activities/'+selected_activity.id+'/senior/'+selected_senior.senior_id+'/reports')
      .then(response => response.json())
      .then(reportsData => {
        setReports(reportsData);
        
        // Calcular la suma de los puntajes cuando se actualizan los informes
        for (let i = 0; i < reportsData.length; i++) {
          suma += reportsData[i].score;
          console.log(suma)
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []
  );
    
  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}> 
        <Text style={[styles.tutorTextBold, styles.textSpacing]}>{selected_senior.name}</Text> 
        
        {reports.map((report, i) => (
          <Text style={[styles.tutorText, styles.textSpacing]} key={i}>Intento número {i + 1}:        {report.score}/{selected_activity.num_answers}</Text>
        ))}
      </View>
    </View>
  );
};
//<Text>Media de puntuación:      {suma}/{selected_activity.num_answers}</Text>

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
              source={require("./assets/eliminar-simbolo.png")}
              style={styles.butonIcon}
            />
            <Text style={styles.tutorText}>Eliminar fotografía</Text>
          </TouchableOpacity>
        </View> 

    </View>
  );
};


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
          source={require("./assets/anadir-imagen.png")}
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


const TutorAddPhotoDescriptionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [tutor_id, setTutorId] = useState(null);

  const handlePhoto = () => {
    if (description)
      fetch('http://127.0.0.1:8000/users/'+tutor_nickname+'') //conseguimos el id del tutor
        .then(response1 => response1.json())
        .then(tutorData => {
          //console.log(tutorData.id)
          setTutorId(tutorData.id)
          //console.log(tutorData.id)
          
          fetch('http://127.0.0.1:8000/photos', { //posteamos la photo
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: 100,
              description: description,
              photo_file: "aaa", // TODO: te inventas una foto porque aun no sabes como se coge del dispositivo
              upload: tutorData.id
            }),
          })
          .then(response => {
            if (response.ok){
              console.log("Ya se ha posteado la foto")
              navigation.navigate('TutorAddPhotoPeople', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa" });
            }
          })
          .catch(error => {
            console.error(error);
          });
        })
        .catch(error => {
          console.error(error);
        });
  };
    
    useEffect(() => {
      console.log('Esto es el tutor_id')
      console.log(tutor_id);
    }, [tutor_id]);
    
  
  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity style={styles.addFileBtn}>
        <Text style={styles.tutorText}>Seleccionar archivo</Text>
        <Image
            source={require("./assets/anadir-imagen.png")}
            style={styles.butonIcon}
          />
      </TouchableOpacity>

      <Image source={{ uri:'https://www.aciprensa.com/imagespp/FamiliaDia_140522.jpg' }} style={styles.image} />
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      
      <View style={styles.inputViewPhotoDescription}>
      <TextInput
        multiline={true}
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese una descripción de la fotografía"
        style={[styles.TextInputPhotoDescription, styles.tutorText]} 
      />
      </View>

      <TouchableOpacity onPress={handlePhoto} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddPhotoPeopleScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file } = route.params;
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/' + uploaded_photo_file + '/people') // consigo las personas de la foto
      .then(response => response.json())
      .then(photo_people => {
        setPeople(photo_people) //establezco la variable people
        console.log(photo_people)
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, [people]);
  
  //TODO: nos falta una función y hacer que cuando den a "siguiente" se ejecute y se suba de esta manera la foto

  useEffect(() => {
  }, [people]);

  const renderPersonItem = ({ item }) => (
    <View>
      <Text style={[styles.tutorText, styles.textSpacing]}>{item.name} {item.surname}</Text>
    </View>
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.recuadroTransparente}>
        <Text style={[styles.tutorText, styles.textSpacing]}>Lista de personas que aparecen:</Text>
        <FlatList
          data={people}
          renderItem={renderPersonItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhotoPerson', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, uploaded_photo_file: uploaded_photo_file})} style={styles.addSeniorBtn}>
      <Image style={styles.butonIcon} 
          source={require("./assets/anadir-amigo.png")} 
        />
        <Text style={styles.tutorText}>Añadir persona</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


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


const TutorAddPhotoPositionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file, added_person_name, added_person_surname } = route.params;
  
  //position in the photo
  const [photo_id, setPhotoId] = useState(null);
  const [person_id, setPersonId] = useState(null);
  
  const [hair, setHair] = useState(null);
  const [clothes, setClothes] = useState(null);
  const [sunglasses, setSunglasses] = useState(null);
  const [glasses, setGlasses] = useState(null);
  //falta el audio

  const hairOptions = ["Moreno", "Rubio", "Pelirrojo", "Castaño", "Negro", "Blanco", "Otros"];
  const clothesOptions = ["Blanco", "Negro", "Rojo", "Amarillo", "Naranja", "Rosa", "Verde", "Otros"];
  
  //TODO: aun no sé como meter la posición con la fotografía así que de momento le diremos 4 coordenadas porque si
  const xinf = 0
  const yinf = 0
  const xsup = 1
  const ysup = 2
  
  const handlePosition = () => {
    if (hair && clothes && sunglasses && glasses)
    // && xinf && yinf && xsup && ysup
      // get del id de la foto
      fetch('http://127.0.0.1:8000/photo_id_by_name/'+uploaded_photo_file)
        .then(response => response.json())
        .then(photo => {
          setPhotoId(photo.id)
          console.log(photo.id)
          
          // get del id de la persona por el name y el surname
          fetch('http://127.0.0.1:8000/person_by_name_and_surname/'+added_person_name+'/'+added_person_surname)
          .then(response1 => response1.json())
          .then(person => {
            setPersonId(person.id)
            console.log(person.id)

              // post de la position
              fetch('http://127.0.0.1:8000/photos/'+photo.id+'/people/'+person.id+'/position', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_photo: photo.id,
                id_person: person.id,
                x_inf:xinf,
                y_inf:yinf,
                x_sup:xsup,
                y_sup:ysup,
                hair_color:hair,
                voice_record:"---",
                sunglasses:sunglasses,
                glasses:glasses,
                clothes_color:clothes
              }),
            })
            .then(response2 => {
              if (response2.ok){
                console.log("Ya se ha posteado la position")
                navigation.navigate('TutorAddPhotoPeople', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa" });
              }
            })
            .catch(error => {
              console.error(error);
            });

          })
          .catch(error => {
            console.error(error);
          });
        })
        .catch(error => {
          console.error(error);
        });
  };
    
    useEffect(() => {
      //console.log('Esto es el photo_id')
      //console.log(photo_id);
    }, [photo_id]);

    useEffect(() => {
      //console.log('Esto es el person_id')
      //console.log(person_id);
    }, [person_id]);

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <Picker
          selectedValue={hair}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setHair(itemValue)}
        >
          <Picker.Item label="Seleccione el color de cabello en la foto." value={null} />
          {hairOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={clothes}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setClothes(itemValue)}
        >
          <Picker.Item label="Seleccione el color de ropa en la foto." value={null} />
          {clothesOptions.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={sunglasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setSunglasses(itemValue)}
        >
          <Picker.Item label="Seleccione si lleva gafas de sol en la foto" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>

      <View style={styles.inputView}>
        <Picker
          selectedValue={glasses}
          style={[styles.TextInput, styles.tutorText, { backgroundColor: "#abe5fa", borderWidth: 0, borderColor: "transparent", borderRadius: 30 }]}
          onValueChange={(itemValue) => setGlasses(itemValue)}
        >
          <Picker.Item label="Seleccione si lleva gafas de ver en la foto" value={null} />
          <Picker.Item label="Sí" value="true" />
          <Picker.Item label="No" value="false" />
        </Picker>
      </View>
      
      <Text style={[styles.tutorText, styles.textSpacing]}>Arrastra con los dedos el cuadrado de color verde a la posicion de la persona y agrandalo para marcar el área que ocupa.</Text>
      <Image
        source={{ uri: `http://localhost:8000/uploads/Recuadro.jpeg` }}
        style={styles.image}
      />

      <TouchableOpacity onPress={handlePosition} style={styles.loginBtn}>
        <Text style={styles.tutorText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


const SeniorWelcomeScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [count, setCount] = useState(3); // Estado local para el contador
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    // Cuando el contador llegue a 0, navegar a otra pantalla
    if (count === 0) {
      clearInterval(timer);
      navigation.navigate('SeniorHome', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name}); // TODO: hacer el SeniorHomeScreen
    }

    return () => clearInterval(timer); //dejar el timer a 0 cuando se cambie de pantalla 
  }, [count, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Bienvenido/a {senior_name}!</Text>
      <Text>Empezamos en {count > 0 ? `${count}...` : ''}</Text>

    </View>
  );
};


const SeniorHomeScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un tipo de actividad</Text>
        
        <Image
          source={require("./assets/sin-sonido2.png")}
          style={styles.muteIcon}
        />
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3selected} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>

      <View style={styles.activityContainer}>

        <TouchableOpacity 
        style={styles.homeTouchableActivityContainerImage}
        onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
          <Image style={styles.homeActivityContainerImage} source={require("./assets/rompecabezas.png")}></Image>
        </TouchableOpacity>
        
        <Text style={styles.homeTouchableActivityContainerImageText}>Juegos</Text>

        <TouchableOpacity 
        style={styles.homeTouchableActivityContainerImage}
        onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
          <Image style={styles.homeActivityContainerImage} source={require("./assets/familia2.png")}></Image>
        </TouchableOpacity>
        
        <Text style={styles.homeTouchableActivityContainerImageText}>Recuerdos y família</Text>
      </View>
    </View>
  );
};


const SeniorGamesScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [generic_activities, setGenericActs] = useState([]); 


useEffect(() => {
  // 1. fetch para sacar todas las customized activities que tengan senior_id = selected_senior.senior_id
  fetch('http://127.0.0.1:8000/activities/generic_activities')
    .then(response => response.json())
    .then(activities => {
      console.log(activities)
      setGenericActs(activities)
    })
    .catch(error => {
      console.log('Error:', error);
    });
}, []);

useEffect(() => {
  //console.log("customized_acts ya no está vacío")
}, [generic_activities]);

const handleActivityPress = (activity) => {
  //console.log('Se hizo clic en la activity:', activity);
  //navigation.navigate('SeniorStartActivity', { senior_nickname: senior_nickname, senior_password: senior_password, senior_name: senior_name});
};

  const renderPhotoActivityItem = ({ item }) => (
    
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.galleryItem}>
      <View style={styles.imageContainer}>
      <Image
        source={require("./assets/"+item.photo_file+".png")}
        style={styles.galleryImage}
      />
      </View>
      <Text style={styles.galleryImageText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un juego</Text>
        
        <Image
          source={require("./assets/sin-sonido2.png")}
          style={styles.muteIcon}
        />
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1selected} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>
      

        <ScrollView style={styles.scrollView}>
            <FlatList
              data={generic_activities}
              renderItem={renderPhotoActivityItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </ScrollView>
    

    </View>
  );
};


const SeniorFamilyScreen = ({navigation, route}) => {
  const { senior_nickname, senior_password, senior_name } = route.params;
  const [senior_id, setSeniorId] = useState(null); 
  const [customized_activities, setCustomizedActs] = useState([]); 
  const customizedActs = []

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/' + senior_nickname + '/' + senior_password)
      .then(response => response.json())
      .then(senior => {
        setSeniorId(senior.id);
        
        fetch('http://127.0.0.1:8000/customized_activities_by_senior/' + senior.id)
          .then(response => response.json())
          .then(activities => {
            console.log(activities)
            // 2. por cada customized activity coges el id y miras en actividades y hacer una variable con ellas
            const fetchPromises = activities.map(activity => {
              return fetch('http://127.0.0.1:8000/activities/'+ activity.id)
                .then(response => response.json())
                .then(activity => {
                  //metemos la actividad en un array
                  customizedActs.push(activity);
                })
                .catch(error => {
                  console.log('Error:', error);
                  return [];
                });
            });
            //console.log('customizedActs:', customizedActs);
            //cuando estén todas las actividades hace
            Promise.all(fetchPromises)
              .then(customized => {
                //console.log('customizedActs:', customizedActs);
                setCustomizedActs(customizedActs)
              });
          })
          .catch(error => {
            console.log('Error:', error);
          });
      });
  }, []);
  
  useEffect(() => {
  }, [senior_id]);
  
  useEffect(() => {
    console.log('customized_activities:', customized_activities);
  }, [customized_activities]);

  const handleActivityPress = (activity) => {
    navigation.navigate('SeniorStartActivity', { senior_nickname: senior_nickname, senior_password: senior_password, senior_name: senior_name, activity: activity});
  };
  
  const renderPhotoActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.galleryItem}>
      <View style={styles.imageContainer}>
      <Image
        source={require(`./assets/${item.photo_file}.png`)}
        style={styles.galleryImage}
      />
      </View>
      <Text style={styles.galleryImageText}>{item.name}</Text>
    </TouchableOpacity>
  );

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Escoge un juego</Text>
        
        <Image
          source={require("./assets/sin-sonido2.png")}
          style={styles.muteIcon}
        />
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>
      

      <ScrollView style={styles.scrollView}>
        <FlatList
          data={customized_activities}
          renderItem={renderPhotoActivityItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};


const SeniorStartActivityScreen = ({navigation, route}) => {
  
  //parametros que le pasan
  const {senior_nickname, senior_password, senior_name, activity } = route.params;

  if (activity.name == '¿Quien es quien?'){
    // Diccionario de modelo de preguntas con los keys que queremos
    const preguntas = {
      hair: 'Toca con el dedo a las personas de la foto que tengan el pelo de color',
      sunglasses: 'Toca con el dedo a las personas de la foto que lleven gafas de sol',
      glasses: 'Toca con el dedo a las personas de la foto que lleven gafas de ver',
      clothes: 'Toca con el dedo a las personas de la foto que lleven la ropa de color',
      name: 'Toca con el dedo a',
      sex: 'Toca con el dedo a alguien del sexo',
      skin: 'Toca con el dedo a las personas de la foto que tengan la piel de color',
      eyes: 'Toca con el dedo a las personas de la foto que tengan los ojos de color',
      rank: 'Toca con el dedo a tu'
    };

    
    
    //variables que guardan el estado
    const [activity_photos, setPhotos] = useState([]); //array que contiene todas las fotos de la actividad
    const [selectedPhotosIndexes, setSelectedPhotos] = useState([]); //estado para guardar las 3 fotos seleccionadas
    const [index, setIndex] = useState(0); //indice para renderizar la foto que sea
    //const [index_person, setIndexPerson] = useState(0); //indice del componente dentro de people_info[0]
    //const [index_people, setIndexPeople] = useState(0); //indice del componente dentro de people_info
    const [photo_people, setPhotoPeople] = useState([]); //array que contiene cada persona que saqle en al foto
    const [people_info, setPeopleInfo] = useState([]); //array de diccionarios con info de todas las personas que salen en la foto
    const [question, setQuestion] = useState(''); //string para establecer la pregunta
    const [peopleIndex, setPeopleIndex] = useState(0);
    const [personIndex, setPersonIndex] = useState(0);

    


    //conseguimos todas las fotos de la actividad
    useEffect(() => {

      fetch('http://127.0.0.1:8000/customized_activities/' + activity.id + '/photos')
        .then(response => response.json())
        .then(photos => {
          setPhotos(photos);
        })
        .catch(error => {
          console.log('Error:', error);
          return [];
        });
      }, []);

      // controlador de estado de React Native para que se ejecute cuando cambie el activity_photos
      useEffect(() => {
      }, [activity_photos]);

    //establecemos de manera random 3 fotos de las que tiene la actividad
    useEffect(() => {
      if (activity_photos.length > 0 && selectedPhotosIndexes.length < 3) { 
        // Generar un número aleatorio dentro del rango del tamaño de activity_photos
        let randomIndex;
        
        do {
          randomIndex = Math.floor(Math.random() * activity_photos.length); //escogeremos un random
        
        }while(selectedPhotosIndexes.includes(activity_photos[randomIndex]));
          // Lo agregamos a la lista de fotos seleccionadas
          setSelectedPhotos([...selectedPhotosIndexes, activity_photos[randomIndex]]);
      } else {
        console.log("Ya se han seleccionado las 3 fotos para la actividad")
        
      }
    }, [activity_photos, selectedPhotosIndexes]);


    // Función para obtener las personas de una foto
    const getPhotoPeople = () => {
      if (selectedPhotosIndexes[index]){
        // cogemos la lista de personas que sale en la foto
        const fetchPromises = fetch('http://127.0.0.1:8000/photos/' + selectedPhotosIndexes[index]?.id + '/people')
        .then(response => response.json())
        .then(people_list => {
          return people_list; 
          })
          .catch(error => {
            console.log('Error:', error);
            return [];
          });

          Promise.all([fetchPromises])
          .then(peopleArray => {
            setPhotoPeople(peopleArray);
          });
      }  
    };

    // controlador de estado de React Native para que se llame a la función getPhotoPeople
    // cada vez que se modifique el indice para renderizar la foto actual o si este es 0
    useEffect(() => {
      getPhotoPeople();
    }, [index, selectedPhotosIndexes[0]?.id]);


    // Función para obtener las posiciones de la foto y hacer diccionarios y meterlos en el nuevo array 
    const getPhotoPositions = async () => {

      // Creamos un array de promesas para cada llamada fetch
      const fetchPromises = photo_people.map(people => {
        const fetchPromises = people.map(person => {
          
          return fetch('http://127.0.0.1:8000/photos/' + selectedPhotosIndexes[index]?.id + '/people/' + person.id)
            .then(response => response.json())
            .then(personData => {
              
              const personInfo = { 
                id: person.id, 
                name: person.name,
                surname: person.surname,
                eyes: person.eyes_color,
                rank: person.familiar_rank,
                sex: person.sex,
                skin: person.skin_color,
                x_sup: personData.x_sup,
                x_inf: personData.x_inf,
                y_sup: personData.y_sup,
                y_inf: personData.y_inf,
                hair: personData.hair_color,
                sunglasses: personData.sunglasses,
                glasses: personData.glasses,
                clothes: personData.clothes_color
              };
              //console.log(personInfo)
              return personInfo;
            });
        });

        return Promise.all(fetchPromises);
      });

      Promise.all(fetchPromises.flat())
        .then(peopleInfoArray => {
          setPeopleInfo(peopleInfoArray);
        });
    };

    // controlador de estado de React Native para que se llame a la función getPhotoPositions
    // cada vez que se modifique el photo_people o si la foto actual tiene indice 0 
    useEffect(() => {
      getPhotoPositions();
    }, [photo_people, selectedPhotosIndexes[0]?.id]);

    //función para seleccionar una clave del diccionario "preguntas"
    const getRandomKey = () => {
      const keysArray = Object.keys(preguntas);
      const randomIndex = Math.floor(Math.random() * keysArray.length); 
      return keysArray[randomIndex]; //retorna una random key del dicc. "preguntas"
    };

    useEffect(() => {
      if (people_info && people_info[peopleIndex] && people_info[peopleIndex][personIndex]) {
        const person = people_info[peopleIndex][personIndex];
        //console.log("person:", people_info[peopleIndex][personIndex].name);
        console.log(index)
        console.log("lista personas:", people_info[peopleIndex])

        const randomKey = getRandomKey();
        let pregunta = '';

        if (randomKey === 'glasses' && person[randomKey] === false) {
          pregunta = 'Toca con el dedo a las personas de la foto que no lleven gafas de ver';
        } else if (randomKey === 'sunglasses' && person[randomKey] === false) {
          pregunta = 'Toca con el dedo a las personas de la foto que no lleven gafas de sol';
        } else if (randomKey === 'glasses' && person[randomKey] === true) {
          pregunta = 'Toca con el dedo a las personas de la foto que lleven gafas de ver';
        } else if (randomKey === 'sunglasses' && person[randomKey] === true) {
          pregunta = 'Toca con el dedo a las personas de la foto que lleven gafas de sol';
        } else {
          const preguntaBase = preguntas[randomKey];
          const preguntaAtributo = person[randomKey];
          pregunta = preguntaBase + ' ' + preguntaAtributo;
        }

        setQuestion(pregunta);
      }
    }, [people_info, peopleIndex, personIndex]);


    // Función para manejar el toque en la pantalla y avanzar al siguiente elemento del array de fotos o acabar la actividad
    const handleTouch = () => {
      
      // Incrementar los índices para pasar a la siguiente iteración
      if (people_info && people_info[peopleIndex] && personIndex < people_info[peopleIndex].length - 1) {
        setPersonIndex(personIndex + 1);
      } else if (people_info && peopleIndex + 1 < people_info.length) {
        setPersonIndex(0);
        setPeopleIndex(peopleIndex + 1);
      } else if(index < selectedPhotosIndexes.length - 1){
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        console.log('Se han mostrado todas las fotos en el array selectedPhotosIndexes');
        navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name});
      }
      
    };

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
        <View style={styles.speechContainer}>
        <Text style={styles.speechText}>{question}</Text>
          
          <Image
            source={require("./assets/sin-sonido2.png")}
            style={styles.muteIcon}
          />
        </View>

        <View style={styles.sidebarContainer}>
          <View style={styles.sidebarSquareContainer}>
          
            <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
            </TouchableOpacity>
            
          </View>
        </View>


        <View style={styles.activityContainer}>
          <TouchableOpacity style={styles.photoActivityShownTouchable} onPress={handleTouch}>
            <Text>{selectedPhotosIndexes[index]?.id}</Text>
            <Image
              source={{ uri: `http://localhost:8000/uploads/${selectedPhotosIndexes[index]?.photo_file}.jpg` }}
              style={styles.photoActivityShown}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>  
          
      </View>
    );

  }else if (activity.name == 'Preguntas y respuestas'){
    
    const [seniorId, setSeniorId] = useState(null); //senior
    const [senior_info, setSeniorInfo] = useState([]); //info del señor
    const [question, setQuestion] = useState(''); //string para establecer la pregunta
    const [answer, setAnswer] = useState(''); //string para establecer la respuesta correcta
    const [allAnswers, setAllAnswers] = useState([]); //array con todas las respuestas
    const [correctTouches, setCorrectTouches] = useState(0); // Nuevo estado para contar el número de toques correctos realizados
    const [done_questions, setDoneQuestions] = useState([]);//array para saber qué preguntas hemos hecho ya
    const [done_fake_answers, setDoneFakeAnswers] = useState([]);

    
    //diccionario con todas las preguntas
    const preguntas = {
      name: '¿Cómo te llamas?',
      birth_year: '¿En qué año naciste?',
      birth_place: '¿En qué sitio naciste?',
      descendants: '¿Cuántos hijos e hijas tienes?',
      sons: '¿Cuántos hijos varones tienes?',
      daughters: '¿Cuántas hijas tienes?',
      siblings: '¿Cuántos hermanos y hermanas tienes?',
      brothers: '¿Cuántos hermanos tienes?',
      sisters: '¿Cuántas hermanas tienes?',
      partner: '¿Cuál es el nombre de tu pareja?',
      father: '¿Cuál es el nombre de tu padre?',
      mother: '¿Cuál es el nombre de tu madre?'
    };

    //array de nombres
    const names = [
      { masculino: 'Juan', femenino: 'Juana' },
      { masculino: 'Pedro', femenino: 'Pilar' },
      { masculino: 'Luis', femenino: 'Luisa' },
      { masculino: 'Anselmo', femenino: 'Ana' },
      { masculino: 'Antonio', femenino: 'Maria' },
      { masculino: 'Roberto', femenino: 'Roberta' },
      { masculino: 'Carlos', femenino: 'Eugenia' },
      { masculino: 'Fernando', femenino: 'Andrea' }
    ];

    //array de años
    const years = [1936,2002,1940,1927,1002,2023,1910,1997];

    //array de sitios
    const places = ['Galicia','Cataluña','Aragón','Andalucía','Extremadura','Murcia','Islas Baleares','Islas Canarias','Madrid'];

    //array de numeros
    const nums = [3,2,1,'Ninguno',22,9,5,4];

    //primero coges el id del senior 
    useEffect(() => {
      fetch('http://127.0.0.1:8000/users/'+ senior_nickname)
        .then(response => response.json())
        .then(senior => {
          setSeniorId(senior);
        })
        .catch(error => {
          console.log('Error:', error);
          return [];
        });
        
    }, []);    
    
    useEffect(() => {
      console.log(seniorId);
    }, [seniorId]);  
      
    useEffect(() => {
      if (seniorId){
          fetch('http://127.0.0.1:8000/senior/' + seniorId.id)
          .then(response => response.json())
          .then(senior => {
            const seniorInfo = { 
              birth_year: senior.birth_year,
              descendants: senior.descendants_num,
              sons: senior.sons_num,
              daughters: senior.daughters_num,
              siblings: senior.siblings_num,
              brothers: senior.brothers_num,
              sisters: senior.sisters_num,
              birth_place: senior.birth_place,
              partner: senior.partner_name,
              father: senior.father_name,
              mother: senior.mother_name,
            };
            
            //console.log('seniorInfo:', seniorInfo)
            setSeniorInfo(seniorInfo);
            return seniorInfo;
          })
          .catch(error => {
            console.log('Error:', error);
            return [];
          });
      }
    }, [seniorId]);
  
    //función para seleccionar una clave del diccionario "preguntas"
    const getRandomKey = () => {
      const keysArray = Object.keys(preguntas);
      const doneSet = new Set(done_questions); // Convertimos el array done_questions en un Set para una búsqueda más eficiente.
    
      let randomIndex;
      let randomKey;
    
      do {
        randomIndex = Math.floor(Math.random() * keysArray.length);
        randomKey = keysArray[randomIndex];
      } while (doneSet.has(randomKey)); // Repetir el ciclo hasta que se obtenga una clave no presente en done_questions.
    
      // Añadimos la nueva clave al array de done_questions
      setDoneQuestions([...done_questions, randomKey]);
    
      return randomKey; // Retorna una random key del diccionario "preguntas" que no está en done_questions.
    };

    function getRandomFromArray(nombre_array, answers, respuesta) {
      if (answers.length == 0){
        answers.push(respuesta);
      }
      const doneSet = new Set(answers); // Convertimos el array done_fake_answers en un Set para una búsqueda más eficiente.
      let randomIndex;
      let randomElement;
    
      do {
        randomIndex = Math.floor(Math.random() * nombre_array.length);
        randomElement = nombre_array[randomIndex];
      } while (doneSet.has(randomElement)); // Repetir el ciclo hasta que se obtenga un elemento no presente en done_fake_answers.
    
      return randomElement; // Retorna un elemento del array "nombre_array" que no está en done_fake_answers.
    }


    useEffect(() => {
      if (senior_info && seniorId) {
        const randomKey = getRandomKey();
        //establecemos cual seria la pregunta y cual seria la respuesta
        let pregunta = preguntas[randomKey];
        let respuesta = '';
        
        if (randomKey === 'name') {
          respuesta = seniorId.name;
        }else{
          respuesta = senior_info[randomKey];
        }
        console.log('pregunta:', pregunta)
        console.log('respuesta:', respuesta)


        //answers.push(respuesta); //le añades la respuesta
        const answers = [];
        
        //haremos un array de respuestas incorrectas para cada caso
        if (randomKey === 'birth_place') {
          for (let i = 0; i < 2; i++) {
            answers.push(getRandomFromArray(places, answers, respuesta));
          }
        } else if (randomKey === 'birth_year') {
          for (let i = 0; i < 2; i++) {
            answers.push(getRandomFromArray(years, answers, respuesta));
          }
        } else if (randomKey === 'partner') {
          for (let i = 0; i < 2; i++) {
            if(seniorId.sex === 'femenino'){
              answers.push(getRandomFromArray(names, answers, respuesta).masculino);
            }else{
              answers.push(getRandomFromArray(names, answers, respuesta).femenino);
            }
          }
        } else if (randomKey === 'mother'){
          for (let i = 0; i < 2; i++) {
            answers.push(getRandomFromArray(names, answers, respuesta).femenino);
          }
        } else if (randomKey === 'father'){
          for (let i = 0; i < 2; i++) {
            answers.push(getRandomFromArray(names, answers, respuesta).masculino);
          }
        } else if (randomKey === 'name') {
          for (let i = 0; i < 2; i++) {
            if(seniorId.sex === 'femenino'){
              answers.push(getRandomFromArray(names, answers, respuesta).femenino);
            }else{
              answers.push(getRandomFromArray(names, answers, respuesta).masculino);
            }
          }
        }else{
          for (let i = 0; i < 2; i++) {
            answers.push(getRandomFromArray(nums, answers, respuesta));
          }
        }

        
        console.log(answers)

        setAllAnswers(answers);
        setQuestion(pregunta);
        setAnswer(respuesta);
      }
    }, [seniorId,senior_info, correctTouches]);

    useEffect(() => {
      // Verificamos si el usuario ha realizado los 5 toques correctos
      if (correctTouches === 5) {
        //leemos un array que contenga los errores que haya tenido para volver a formular las preguntas y al acabarlo sí que hacemos la navegación y nos vamos.
        // Navegamos a la pantalla de finalización de la actividad
        navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name});
      }
    }, [correctTouches, navigation]);

    // Manejar el toque en un elemento touchable
    const handleTouch = (ans) => {
      // Si el toque es correcto, incrementamos el contador de toques correctos
      if (ans === answer) {
        //console.log("es el correcto Maricarmen")
        setCorrectTouches((prevCount) => prevCount + 1);
      }else{
        //se le muestra la respuesta correcta y se añade la pregunta con la respuesta al final, para que se repita
      }
    };

    useEffect(() => {
      console.log(correctTouches);
    }, [correctTouches]); 


    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
        <View style={styles.speechContainer}>
        <Text style={styles.speechText}>{question}</Text>
          
          <Image
            source={require("./assets/sin-sonido2.png")}
            style={styles.muteIcon}
          />
        </View>

        <View style={styles.sidebarContainer}>
          <View style={styles.sidebarSquareContainer}>
          
            <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
            </TouchableOpacity>
            
          </View>
        </View>


        <View style={styles.activityContainer}>
          {allAnswers.map((ans, index) => (
            <TouchableOpacity key={index} onPress={() => handleTouch(ans)}>
              <Text style={styles.answerButtonText}>{ans}</Text>
            </TouchableOpacity>
          ))}
        </View>
          
      </View>
    );

  }
};


const SeniorActivityFinishedScreen = ({navigation, route}) => {

  const {senior_nickname, senior_password, senior_name } = route.params;


  //coger los elementos de la route para poder pasarlos
  useEffect(() => {

    const redirectToSeniorHome = () => {
      navigation.navigate('SeniorHome', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name});
    };

    // Programa la redirección después de 3 segundos
    const timeoutId = setTimeout(redirectToSeniorHome, 3000);

    // Limpia el temporizador cuando el componente se desmonta para evitar problemas de memoria
    return () => clearTimeout(timeoutId);
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      
      <View style={styles.speechContainer}>
        <Text style={styles.speechText}>Bien hecho!</Text>
        
        <Image
          source={require("./assets/sin-sonido2.png")}
          style={styles.muteIcon}
        />
      </View>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarSquareContainer}>
        
          <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/rompecabezas.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/familia2.png")}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/respuesta.png")}></Image>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
            <Image style={styles.sidebarIconImage} source={require("./assets/boton-de-cierre.png")}></Image>
          </TouchableOpacity>
          
        </View>
      </View>
      
      <View style={styles.activityContainer}>
      </View>

      
    </View>
  );
};