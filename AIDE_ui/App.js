import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
//import FilePickerManager from 'react-native-file-picker';
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
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
          navigation.navigate('TutorHome', { nickname: nickname, password: password });
        }
      })
      .catch(error => {
        console.log('Error:', error);
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
          placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
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
        <Text style={styles.loginText}>ENTRAR</Text>
      </TouchableOpacity>

      <Text> This is the nickname: {nickname}</Text>
      <Text> This is the password: {password}</Text>
      
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
        password: password
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
          style={styles.TextInput}
          placeholder="Nombre."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          onChangeText={(nickname) => setNickname(nickname)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Correo electrónico."
          placeholderTextColor="#003f5c"
          onChangeText={(mail) => setMail(mail)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />        
      </View>
      
      <TouchableOpacity onPress={handleSignup} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTRARSE</Text>
      </TouchableOpacity>

      <Text> This is the name: {name}</Text>
      <Text> This is the nickname: {nickname}</Text>
      <Text> This is the mail: {mail}</Text>
      <Text> This is the password: {password}</Text>
      
    </View>
  );
};


const ChargedLoginScreen = ({navigation, route}) => {

  // the login screen
  //const [nickname, setNickname] = useState("");
  //const [password, setPassword] = useState("");
  const { nickname, password } = route.params;
  
  return (
    <View style={styles.container}> 
      
      <Image style={styles.image} 
        source={require("./assets/AIDE_blue_big.png")} 
      />
      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          //placeholder="Nombre de usuario."
          placeholderTextColor="#003f5c"
          value={nickname} // Asignar el valor de nickname a la prop value
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          //placeholder="Contraseña."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
        />        
      </View>
      
      <TouchableOpacity onPress={() => navigation.navigate('TutorHome', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>ENTRAR</Text>
      </TouchableOpacity>
      
      <Text> This is the nickname: {nickname}</Text>
      <Text> This is the password: {password}</Text>
      
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
  }, []); //queremos que salga cada vez que se modifique la variable [names]

  useEffect(() => {
    console.log(names);
  }, [names]);

  const handleSeniorSelection = (seniorName, seniorId) => {
    setSelectedSenior({ name: seniorName, senior_id: seniorId }); // Establecemos setSelectedSenior con el par de name y senior_id
  };

  // hook de react que se utiliza para realizar tareas secundarias después de que se renderice el componente
  // este hook se ejecutará cada vez que el valor de selectedSenior cambie.
  useEffect(() => {
    console.log('selectedSenior:')
    console.log(selectedSenior);
  }, [selectedSenior]);
  
  return (
      
    <View style={styles.container}> 
      
      <StatusBar style="auto" />
      
      {names.length > 0 ? (
      <>
        <Text>Seleccione un Senior asociado:</Text>
        {names.map((senior) => (
          <TouchableOpacity
            key={name}
            onPress={() => handleSeniorSelection(senior.name, senior.senior_id)}
            style={[
              styles.loginBtn,
              selectedSenior && selectedSenior.name === senior.name && { backgroundColor: 'green' },
            ]}
          >
            <Text style={styles.loginText}>{senior.name}</Text>
          </TouchableOpacity>
        ))}
      </>
    ) : (
      <Text>No tiene Seniors todavía</Text>
    )}

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddSenior', { tutor_nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir un Senior</Text>
      </TouchableOpacity>


      <TouchableOpacity 
      onPress={() => {
        if (selectedSenior && selectedSenior.name && selectedSenior.senior_id) {
          navigation.navigate('TutorSeniorFolders', {
            tutor_nickname: nickname,
            tutor_password: password,
            selected_senior: selectedSenior
          });
        }
      }}
      style={styles.loginBtn}
    >
      <Text style={styles.loginText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorSeniorFoldersScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  
  return (
    
    <View style={styles.container}> 
    <StatusBar style="auto" />
    <Text>Nombre del Senior seleccionado: {selected_senior.name}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Fotografías</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorReport', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Actividades</Text>
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
        password: password
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
        <Text style={styles.loginText}>Crear nuevo Senior</Text>
      </TouchableOpacity>

    </View>
  );
};


const TutorSeniorReportScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior} = route.params;
  //const [seniors, setSeniors] = useState([]);
  const [senior, setSenior] = useState([]);
  //const [selected_activity, setActivity] = useState([]);
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
    //console.log('Se hizo clic en la actividad:', activity);
    navigation.navigate('TutorSeniorActivityInfo', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: activity}); 
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.loginBtn}>
      <Text style={styles.loginText}>{item.name}</Text>
    </TouchableOpacity>
  );
    

  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      
      <Text>Resumen de actividad de {selected_senior.name}</Text>
      <Text>Time playing: {senior.total_playing_time} h </Text>
      <Text>Start hour: {senior.hour_start_avg} h</Text>
      <Text>Finish hour: {senior.hour_finish_avg}</Text>
      <Text>Score average: {senior.score_avg}</Text>

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id.toString()}
      />
      

    </View>
  );
};


const TutorSeniorActivityInfoScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, selected_activity} = route.params;
  const [activity, setActivity] = useState([]);
  console.log('La actividad que me han pasado:')
  console.log(selected_activity.id)
  //const [activities, setActivities] = useState([]); // definimos como se va a llamar el cojunto de actividades
  
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
      <Text>Nombre de la actividad: {activity.name}</Text>
      <Text>Descripción</Text>
      <Text>{activity.description}</Text>
      <Text>Vídeo de demostración</Text>
      <Text>{activity.demo_video}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorActivityScores', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, selected_activity: selected_activity})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Puntuaciones de {selected_senior.name}</Text>
      </TouchableOpacity>

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
      
      <Text>{selected_senior.name}</Text> 
      
      {reports.map((report, i) => (
        <Text key={i}>Intento número {i + 1}:        {report.score}/{selected_activity.num_answers}</Text>
      ))}
      

      
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
      <Text>{item.name} {item.surname} </Text>

      <TouchableOpacity onPress={() => navigation.navigate('ALL_DELETES_TO_DO', { selected_person: item})} style={styles.loginBtn}>
      <Text style={styles.loginText}>Eliminar persona</Text>
      </TouchableOpacity>
    </View>
    
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      

      {photo && (
      <Image
        source={{ uri: `http://localhost:8000/uploads/${photo.photo_file}.jpg` }}
        style={styles.image}
      />
    )}
      
      <Text>Descripción de la foto:</Text>
      <Text>{description}</Text>
      
      <Text>Lista de personas que aparecen:</Text>
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
      

    <TouchableOpacity onPress={() => navigation.navigate('ALL_DELETES_TO_DO', { selected_photo: selected_photo})} style={styles.loginBtn}>
      <Text style={styles.loginText}>Eliminar fotografía</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorPhotosGaleryScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  const [customized_acts, setCustomizedActs] = useState([]); 
  const [senior_photos, setSeniorPhotos] = useState([]); 

  
  useEffect(() => {
    // 1. fetch para sacar todas las customized activities que tengan senior_id = selected_senior.senior_id
    fetch('http://127.0.0.1:8000/customized_activities/' + selected_senior.senior_id + '') //id, senior_id
      .then(response => response.json())
      .then(customized_activities => {
        //console.log("Got'em ( senior customized activities )")
        setCustomizedActs(customized_activities)
        
        // 2. por cada customized activity que hayas sacado coges sus fotos y las pones en una variable
        const fetchPromises = customized_activities.map(activity => {
          return fetch('http://127.0.0.1:8000/customized_activities/' + activity.id + '/photos')
            .then(response => response.json())
            .then(photos => {
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
            setSeniorPhotos(combinedPhotos);
            //console.log(combinedPhotos)
          });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  useEffect(() => {
    //console.log("customized_acts ya no está vacío")
  }, [customized_acts]);

  useEffect(() => {
    //console.log("senior_photos ya no está vacío")
  }, [senior_photos]);

  // 3. haces map y lees todas las fotos que tengas

  const handlePhotoPress = (photo) => {
    // Acción que se ejecuta cuando se hace clic en una foto
    console.log('Se hizo clic en la foto:', photo);
    // Aquí puedes realizar la navegación o realizar otras acciones según tus necesidades
    navigation.navigate('TutorGetPhoto', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior, selected_photo: photo  });
    
  };

  // TODO: poner en el models un archivo a photo, porque no tengo :(, entonces no sería item.id, seria item.photo_file
  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item)} style={styles.loginBtn}>
      <Image
        source={{ uri: `http://localhost:8000/uploads/${item.photo_file}.jpg` }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhotoDescription', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior })} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir fotografía</Text>
      </TouchableOpacity>

      <FlatList
        data={senior_photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


const TutorAddPhotoDescriptionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior } = route.params;
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [tutor_id, setTutorId] = useState(null);

  const handlePhoto = () => {
    
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

      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Seleccionar archivo</Text>
      </TouchableOpacity>

      <Image source={{ uri:'https://www.aciprensa.com/imagespp/FamiliaDia_140522.jpg' }} style={styles.image} />
      <Text>Archivo:</Text>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      
      <Text>Descripción de la foto</Text>
      <View style={styles.inputView}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Ingrese una descripción de la fotografía"
        style={styles.TextInput}
      />
      </View>

      <TouchableOpacity onPress={handlePhoto} style={styles.loginBtn}>
        <Text style={styles.loginText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddPhotoPeopleScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file } = route.params;
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/photo_by_name/' + uploaded_photo_file + '/people') // consigo las personas de la foto
      .then(response => response.json())
      .then(photo_people => {
        setPeople(photo_people) //establezco la variable people
        console.log(photo_people)
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);
  
  //nos falta una función y hacer que cuando den a "siguiente" se ejecute y se suba de esta manera la foto

  useEffect(() => {
    console.log("ya tenemos a las personas de la foto")
  }, [people]);

  const renderPersonItem = ({ item }) => (
    <View>
      <Text>{item.name} {item.surname}</Text>
    </View>
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Lista de personas que aparecen:</Text>
      <FlatList
        data={people}
        renderItem={renderPersonItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhotoPerson', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior, uploaded_photo_file: uploaded_photo_file})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir persona</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { tutor_nickname: tutor_nickname , tutor_password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddPhotoPersonScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file } = route.params;
  //person fields
  const [name, setame] = useState("");
  const [surname, setSurname] = useState("");
  const [sex, setSex] = useState("");
  const [skin, setSkin] = useState("");
  const [eyes, setEyes] = useState("");
  const [rank, setRank] = useState("");

  const handlePerson = () => {
        
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
        navigation.navigate('TutorAddPhotoPosition', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa", added_person_name: name, added_person_name: surname});
      }
    })
    .catch(error => {
      console.error(error);
    });

};
    
    useEffect(() => {
      console.log('Esto es el name')
      console.log(name);
    }, [name]);

    useEffect(() => {
      console.log('Esto es el surname')
      console.log(surname);
    }, [surname]);

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Nombre, apellido y aspectos personales</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setName(name)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Apellido"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(surname) => setSurname(surname)}
        />        
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Sexo."
          placeholderTextColor="#003f5c"
          onChangeText={(sex) => setSex(sex)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Color de piel."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(skin) => setSkin(skin)}
        />        
      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Color de ojos."
          placeholderTextColor="#003f5c"
          onChangeText={(eyes) => setEyes(eyes)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Rango familiar."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(rank) => setRank(rank)}
        />        
      </View>


      <TouchableOpacity onPress={handlePerson}>
        <Text style={styles.loginBtn}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddPhotoPositionScreen = ({navigation, route}) => {
  const { tutor_nickname, tutor_password, selected_senior, uploaded_photo_file, added_person_name, added_person_surname } = route.params;
  
  //position in the photo
  const [photo_id, setPhotoId] = useState(null);
  const [person_id, setPersonId] = useState(null);
  
  const [hair, setHair] = useState("");
  const [clothes, setClothes] = useState("");
  const [sunglasses, setSunglasses] = useState("");
  const [glasses, setGlasses] = useState("");
  //falta el audio

  //TODO: aun no sé como meter la posición con la fotografía así que de momento le diremos 4 coordenadas porque si
  const xinf = 0
  const yinf = 0
  const xsup = 1
  const ysup = 2
  
  const handlePosition = () => {
    // get del id de la foto
    fetch('http://127.0.0.1:8000/photo_id_by_name/'+uploaded_photo_file)
      .then(response => response.json())
      .then(photo => {
        setPhotoId(photo.id)
        
        // get del id de la persona por el name y el surname
        fetch('http://127.0.0.1:8000/person_by_name_and_surname/'+added_person_name+'/'+added_person_surname)
        .then(response1 => response.json())
        .then(person => {
          setPersonId(person.id)
        
          // post de la position
          fetch('http://127.0.0.1:8000/photos/'+photo.id+'/people/'+person.id+'/position', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_photo:photo_id,
            id_person:person_id,
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
            navigation.navigate('TutorAddPhoto', { tutor_nickname:tutor_nickname, tutor_password:tutor_password, selected_senior:selected_senior, uploaded_photo_file: "aaa" });
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
      console.log('Esto es el photo_id')
      console.log(photo_id);
    }, [photo_id]);

    useEffect(() => {
      console.log('Esto es el person_id')
      console.log(person_id);
    }, [person_id]);

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Características físicas de la persona en la foto </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Color de pelo en la foto"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(hair) => setHair(hair)}
        />        
      </View>
      
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Color de la ropa en la foto."
          placeholderTextColor="#003f5c"
          onChangeText={(clothes) => setClothes(clothes)} 
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Si lleva o no gafas de sol en la foto."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(sunglasses) => setSunglasses(sunglasses)}
        />        
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Si lleva o no gafas de ver en la foto."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(glasses) => setGlasses(glasses)}
        />        
      </View>
      
      <Text>Arrastra con los dedos el cuadraro de color verde a la posicion de la persona y agrandalo para marcar el área que ocupa.</Text>
      <Image
        source={{ uri: `http://localhost:8000/uploads/Recuadro.jpeg` }}
        style={styles.image}
      />

      <TouchableOpacity onPress={handlePosition}>
        <Text style={styles.loginBtn}>Listo!</Text>
      </TouchableOpacity>
    </View>
  );
};


//--------------------------------------------------------------------------- STYLES --------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    backgroundColor: "#72d9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40
  },

  inputView: {
    backgroundColor: "#abe5fa",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "left",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#3882e7",
  },
});



