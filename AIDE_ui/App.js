import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import FilePickerManager from 'react-native-file-picker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        <Stack.Screen name="TutorAddPhoto" component={TutorAddPhotoScreen} options={{ title: 'Add photo' }} />
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
  //console.log('...............')
  //console.log(nickname)
  //console.log('...............')
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
  console.log(tutor_nickname)
  console.log(tutor_password)
  console.log(selected_senior)
  //const [seniors, setSeniors] = useState([]);
  
  return (
    
    <View style={styles.container}> 
    <StatusBar style="auto" />
    <Text>Nombre del Senior seleccionado: {selected_senior.name}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { nickname: tutor_nickname , password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Fotografías</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorReport', { nickname: tutor_nickname , password: tutor_password, selected_senior: selected_senior})} style={styles.loginBtn}>
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
    navigation.navigate('TutorActivityInfo', { tutor_nickname: tutor_nickname, tutor_password: tutor_password, selected_senior: selected_senior}); 
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

// lista de seniors asociados a ese tutor
const TutorPhotosGaleryScreen = ({navigation, route}) => {
  const { nickname, password } = route.params;
  const [seniors, setSeniors] = useState([]);
  
  // Datos de ejemplo para la lista de fotos
  const photos = ['Photo1', 'Photo2', 'Photo3'];

  const handlePhotoPress = (photo) => {
    // Acción que se ejecuta cuando se hace clic en una foto
    console.log('Se hizo clic en la foto:', photo);
    // Aquí puedes realizar la navegación o realizar otras acciones según tus necesidades
    navigation.navigate('TutorGetPhoto', { nickname, password });
    
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePhotoPress(item)} style={styles.loginBtn}>
      <Text style={styles.loginText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddPhoto', { nickname: nickname, password: password })} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir fotografía</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};


const TutorGetPhotoScreen = ({navigation, route}) => {
  const { nickname, password } = route.params;

  
  // Datos de ejemplo para la lista de people
  const people = ['Person1', 'Person2', 'Person3'];

  const renderPersonItem = ({ item }) => (
    <View>
      <Text>{item}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('nuse', { nickname: nickname , password: password})} style={styles.loginBtn}>
      <Text style={styles.loginText}>Eliminar persona</Text>
      </TouchableOpacity>
    </View>
    
  );

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={{ uri:'https://www.aciprensa.com/imagespp/FamiliaDia_140522.jpg' }} style={styles.image} />
      <Text>Descripción de la foto</Text>
      
      <Text>Lista de personas que aparecen:</Text>
      <FlatList
        data={people}
        renderItem={renderPersonItem}
        keyExtractor={(item, index) => index.toString()}
      />

    <TouchableOpacity onPress={() => navigation.navigate('nuse', { nickname: nickname , password: password})} style={styles.loginBtn}>
      <Text style={styles.loginText}>Eliminar fotografía</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddPhotoScreen = ({navigation, route}) => {
  const { nickname, password } = route.params;
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState(null);

  // Datos de ejemplo para la lista de people
  const people = ['Person1', 'Person2', 'Person3'];

  const renderPersonItem = ({ item }) => (
    <View>
      <Text>{item}</Text>

      <TouchableOpacity onPress={() => navigation.navigate('nuse', { nickname: nickname , password: password})} style={styles.loginBtn}>
      <Text style={styles.loginText}>Eliminar persona</Text>
      </TouchableOpacity>
    </View>
    
  );
  // no sé hacer esto
  const openFilePicker = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      if (!response.didCancel && !response.error) {
        setImageUri(response.path);
      }
    });
  };

  return(
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity onPress={openFilePicker} style={styles.loginBtn}>
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
      

      <Text>Lista de personas que aparecen:</Text>
      <FlatList
        data={people}
        renderItem={renderPersonItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity onPress={() => navigation.navigate('nuse', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir persona</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('nuse', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Listo</Text>
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



