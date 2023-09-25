import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js

const SeniorStartActivityScreen = ({navigation, route}) => {
  
  //parametros que le pasan
  const {senior_nickname, senior_password, senior_name, activity } = route.params;
  
  //estados para contar el tiempo
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [formattedTime, setFormattedTime] = useState('');

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
    const [photo_people, setPhotoPeople] = useState([]); //array que contiene cada persona que saqle en al foto
    const [people_info, setPeopleInfo] = useState([]); //array de diccionarios con info de todas las personas que salen en la foto
    const [question, setQuestion] = useState(''); //string para establecer la pregunta
    const [peopleIndex, setPeopleIndex] = useState(0);
    const [personIndex, setPersonIndex] = useState(0);
    const [senior, setSenior] = useState(null);

    useEffect(() => {
      const start = new Date();
      setStartTime(start);

      //conseguimos el senior
      fetch('http://127.0.0.1:8000/users/'+ senior_nickname)
        .then(response => response.json())
        .then(senior_info => {
          setSenior(senior_info);
        })
        .catch(error => {
          console.log('Error:', error);
          return [];
        });
      
      // conseguimos las fotos personalizadas que pertenezcan a la actividad
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
        //console.log(index)
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
    }, [people_info, peopleIndex, personIndex, index]);


    // Función para manejar el toque en la pantalla y avanzar al siguiente elemento del array de fotos o acabar la actividad
    const handleTouch = () => {
      
      // Incrementar los índices para pasar a la siguiente iteración
      if (people_info && people_info[peopleIndex] && personIndex < people_info[peopleIndex].length - 1) {
        setPersonIndex(personIndex + 1);
      } else if (people_info && peopleIndex + 1 < people_info.length) {
        
        setPeopleIndex(peopleIndex + 1);
      } else if(index < selectedPhotosIndexes.length - 1){
        setPersonIndex(0);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        //console.log('Se han mostrado todas las fotos en el array selectedPhotosIndexes');        
        const end = new Date();
          setEndTime(end);
      }
      
    };

    function timeConversion(td) {
      // Convierte la diferencia de tiempo en el formato HH:MM:ss
      const seconds = Math.floor(td / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

      setFormattedTime(formatted);
    }

    useEffect(() => {
      let td = endTime - startTime;
      console.log("time: ", td);
      timeConversion(td);
    }, [endTime]); 

    useEffect(() => {
      console.log("formattedTime: ", formattedTime);
      if(index == selectedPhotosIndexes.length - 1)
      //si ya hemos acabado con las fotos:
      navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name, activity: activity, score: (selectedPhotosIndexes.length), senior: senior, playing_time: formattedTime });
    }, [formattedTime, senior]); 

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
        <View style={styles.speechContainer}>
        <Text style={styles.speechText}>{question}</Text>
          
          <Image
            source={require("../assets/sin-sonido2.png")}
            style={styles.muteIcon}
          />
        </View>

        <View style={styles.sidebarContainer}>
          <View style={styles.sidebarSquareContainer}>
          
            <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/rompecabezas.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/familia2.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/respuesta.png")}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/boton-de-cierre.png")}></Image>
            </TouchableOpacity>
            
          </View>
        </View>




        <View style={styles.activityContainer}>
          <TouchableOpacity style={styles.photoActivityShownTouchable} onPress={handleTouch}>
            <Text>{selectedPhotosIndexes[index]?.id}</Text>
            <Image
              source={{ uri: `data:image/jpg;base64, ${selectedPhotosIndexes[index]?.photo_file}` }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text>{index}</Text>
          </TouchableOpacity>
        </View>
          
      </View>
    );
    //style={styles.photoActivityShown}
  }else if (activity.name == 'Preguntas y respuestas'){
    
    const [seniorId, setSeniorId] = useState(null); //senior
    const [senior_info, setSeniorInfo] = useState([]); //info del señor
    const [question, setQuestion] = useState(''); //string para establecer la pregunta
    const [answer, setAnswer] = useState(''); //string para establecer la respuesta correcta
    const [allAnswers, setAllAnswers] = useState([]); //array con todas las respuestas
    const [correctTouches, setCorrectTouches] = useState(0); // Nuevo estado para contar el número de toques correctos realizados
    const [done_questions, setDoneQuestions] = useState([]);//array para saber qué preguntas hemos hecho ya
    const [done_fake_answers, setDoneFakeAnswers] = useState([]);
    const [WrongAnsweredQuestionsKeys, setWrongAnsweredQuestionsKeys] = useState([]);
    const [key, setKey] = useState('');
    const [logMessages, setLogMessages] = useState([]);
    const [showLog, setShowLog] = useState(false);
    const [correctedTouches, setCorrectedTouches] = useState(0);


    const [showSpeechText, setShowSpeechText] = useState(false); //estado para saber cuando debo poner texto en el recuadro de speechless y cuando no


    
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

      //establecemos el tiempo de inicio
      const start = new Date();
      setStartTime(start);

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
        let answers = [];
        
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
        setKey(randomKey);
        setAllAnswers(shuffleArray(answers)); //desordenamos el vector de answers para que las respuestas salgan todas aleatoriamente
        setQuestion(pregunta);
        setAnswer(respuesta);
      }
    }, [seniorId,senior_info, correctTouches]);


    function shuffleArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }
  


    useEffect(() => {
      // Verificamos si el usuario ha realizado los 5 toques correctos
      if (correctTouches === 5) {
        if ( WrongAnsweredQuestionsKeys.length>0 ){

          const randomKey = WrongAnsweredQuestionsKeys[0];
          WrongAnsweredQuestionsKeys.shift();
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
          setKey(randomKey);
          setAllAnswers(shuffleArray(answers)); //desordenamos el vector de answers para que las respuestas salgan todas aleatoriamente
          setQuestion(pregunta);
          setAnswer(respuesta);
          
        }else{
          const end = new Date();
          setEndTime(end);
        }
      }
    }, [correctedTouches, navigation]);


    function timeConversion(td) {
      // Convierte la diferencia de tiempo en el formato HH:MM:ss
      const seconds = Math.floor(td / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

      setFormattedTime(formatted);
    }

    useEffect(() => {
      let td = endTime - startTime;
      console.log("time: ", td);
      timeConversion(td);
    }, [endTime]); 

    useEffect(() => {
      console.log("formattedTime: ", formattedTime);
      if (WrongAnsweredQuestionsKeys.length === 0 && correctTouches === 5)
      //Navegamos a la pantalla de finalización de la actividad
      navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name, activity: activity, senior: seniorId, score: correctTouches, playing_time: formattedTime});
    }, [formattedTime, seniorId]); 

    // Manejar el toque en un elemento touchable
    const handleTouch = (ans) => {
      // Si el toque es correcto (y si no también porque queremos que avance aunque se equivoquen), incrementamos el contador de toques correctos
      if (ans === answer) {
        if (correctTouches < 5){
          setCorrectTouches((prevCount) => prevCount + 1);
        } else {
          setCorrectedTouches((prevCount) => prevCount + 1);
        }
        
      }else{
        let mensajeTemporal = '';
        // ya habrá randomKey así que no tiene que haber problema
        if (key === 'birth_place') {
          mensajeTemporal = "Usted nació en " + senior_info[key]
        } else if (key === 'birth_year') {
          mensajeTemporal = "Usted nació en el año " + senior_info[key]
        } else if (key === 'partner') {
            if(seniorId.sex === 'femenino'){
              mensajeTemporal = "El nombre de su marido es " + senior_info[key]
            }else{
              mensajeTemporal = "El nombre de su mujer es " + senior_info[key]
            }
        } else if (key === 'mother'){
          mensajeTemporal = "El nombre de su madre es " + senior_info[key]
        } else if (key === 'father'){
          mensajeTemporal = "El nombre de su padre es " + senior_info[key]
        } else if (key === 'name') {
          mensajeTemporal = "Usted se llama " + senior_name
        } else if (key === 'sisters'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hermanas"
        } else if (key === 'brothers'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hermanos varones"
        } else if (key === 'siblings'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hermanas y hermanos"
        } else if (key === 'daughters'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hijas"
        } else if (key === 'sons'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hijos varones"
        } else if (key === 'descendants'){
          mensajeTemporal = "Usted tiene "+senior_info[key]+" hijos e hijas"
        }

        setLogMessages([mensajeTemporal]);
        setShowLog(true);

        //lo dejo 5 segundos para que puedan leerlo
        setTimeout(() => {
          setShowLog(false);
          //setShowSpeechText(false); //hacemos que en el recuadro de la pregunta no salga nada
        }, 5000);
        
        setCorrectTouches((prevCount) => prevCount + 1);

        //Añades la randomkey al array de wrongAnswers
        setWrongAnsweredQuestionsKeys([...WrongAnsweredQuestionsKeys, key]);
      }
    };

    useEffect(() => {
      console.log(correctTouches);
    }, [correctTouches]); 

    useEffect(() => {
      console.log(formattedTime);
      //Navegamos a la pantalla de finalización de la actividad
      //navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name, activity: activity, senior: seniorId, score: correctTouches, playing_time: formattedTime});
    }, [formattedTime]);



    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        
        <View style={styles.speechContainer}>
          {showLog ? (
            <Text style={styles.speechText}></Text>
          ) : (
            <Text style={styles.speechText}>{question}</Text>
          )}
          
          <Image
            source={require("../assets/sin-sonido2.png")}
            style={styles.muteIcon}
          />
        </View>

        <View style={styles.sidebarContainer}>
          <View style={styles.sidebarSquareContainer}>
          
            <TouchableOpacity style={styles.sidebarIcon1} onPress={() => navigation.navigate('SeniorGames', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/rompecabezas.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon2selected} onPress={() => navigation.navigate('SeniorFamily', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/familia2.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarIcon3} onPress={() => navigation.navigate('SeniorHome', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/respuesta.png")}></Image>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.sidebarIcon4} onPress={() => navigation.navigate('aunNoHiceNadaParaCerrarLaAppEnElMovil', { senior_nickname: senior_nickname, senior_password: senior_password , senior_name: senior_name })}>
              <Image style={styles.sidebarIconImage} source={require("../assets/boton-de-cierre.png")}></Image>
            </TouchableOpacity>
            
          </View>
        </View>


        <View style={styles.activityContainer}>
        {showLog && (
          <Text style={styles.speechText}>
            {logMessages[0]}
          </Text>
        )}
        {!showLog && allAnswers.map((ans, index) => (
          <TouchableOpacity key={index} onPress={() => handleTouch(ans)}>
            <Text style={styles.answerButtonText}>{ans}</Text>
          </TouchableOpacity>
        ))}
      </View>
          
      </View>
    );
  }
};


export default SeniorStartActivityScreen; // Export the component