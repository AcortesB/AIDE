import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import FilePickerManager from 'react-native-file-picker';


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
      
      <TouchableOpacity onPress={() => navigation.navigate('TutorHome', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>ENTRAR</Text>
      </TouchableOpacity>
      
    </View>
  );
};

// in line 59
//<Text> This is the nickname: {nickname}</Text>
//<Text> This is the password: {password}</Text>


const SignupScreen = ({navigation, route}) => {

    // the login screen
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  
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
      
      <TouchableOpacity onPress={() => navigation.navigate('ChargedLogin', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTRARSE</Text>
      </TouchableOpacity>
      
      
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
    
    </View>
  );
};

// lista de seniors asociados a ese tutor
const TutorHomeScreen = ({navigation, route}) => {
  
  const { nickname, password } = route.params;
  const [seniors, setSeniors] = useState([]);
  
  return (
      
    <View style={styles.container}> 
      
      <StatusBar style="auto" />
      <Text>Seleccione un Senior asociado:</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorAddSenior', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Añadir un Senior</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorFolders', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Listo</Text>
      </TouchableOpacity>
    </View>
  );
};

// lista de seniors asociados a ese tutor
const TutorSeniorFoldersScreen = ({navigation, route}) => {
  const { nickname, password } = route.params;
  const [seniors, setSeniors] = useState([]);
  
  return (
    
    <View style={styles.container}> 
    <StatusBar style="auto" />
    <Text>Nombre del Senior que hayan selelccionado</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TutorPhotosGalery', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Fotografías</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('TutorSeniorReport', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>Actividades</Text>
      </TouchableOpacity>
    </View>
  );
};


const TutorAddSeniorScreen = ({navigation, route}) => {

  // the login screen
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

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
      
      <TouchableOpacity onPress={() => navigation.navigate('TutorHome', { nickname: nickname , password: password})} style={styles.loginBtn}>
        <Text style={styles.loginText}>CREAR NUEVO USUARIO</Text>
      </TouchableOpacity>

    </View>
  );
};


const TutorSeniorReportScreen = ({navigation, route}) => {
  const { nickname, password } = route.params;
  const [seniors, setSeniors] = useState([]);
  const [activities, setActivities] = useState([]); // definimos como se va a llamar el cojunto de actividades
  // primemro pruebo con todas las actividades
    useEffect(() => {
      fetch('http://127.0.0.1:8000/activities')
        .then(response => response.json())
        .then(activitiesData => {
          setActivities(activitiesData);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }, []);
  // Datos de ejemplo para la lista de actividades
  //const activities = ['Activity1', 'Activity2', 'Activity3'];
  
  const handleActivityPress = (activity) => {
    // Acción que se ejecuta cuando se hace clic en una act
    console.log('Se hizo clic en la actividad:', activity);
    // Aquí puedes realizar la navegación o realizar otras acciones según tus necesidades
    navigation.navigate('TutorActivityInfo', { nickname, password });
    
  };

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActivityPress(item)} style={styles.loginBtn}>
      <Text style={styles.loginText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}> 
      <StatusBar style="auto" />
      <Text>Senior report activity:</Text>
      <Text>Time playing: _____ </Text>
      <Text>Start hour: _____</Text>
      <Text>Finish hour: _____</Text>

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item, index) => index.toString()}
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



