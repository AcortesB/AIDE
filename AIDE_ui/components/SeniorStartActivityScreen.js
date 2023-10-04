import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, Picker, ImageBackground, WebView } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { styles } from '../styles'; // Import the styles object from styles.js
import { serverurl } from '../config.js'

const SeniorStartActivityScreen = ({navigation, route}) => {
  
  //parametros que le pasan
  const {senior_nickname, senior_password, senior_name, activity, hasPhotos } = route.params;
  
  //estados para contar el tiempo
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [formattedTime, setFormattedTime] = useState('');
  //const [seniorPhotosBool, setSeniorPhotosBool] = useState(false);

  //estado para saber las coordenadas
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  
  //console.log('primero que nada seniorPhotosBool:',seniorPhotosBool)
  
  if (activity.name == '¿Quien es quien?'){
    if(hasPhotos){
      // Diccionario de modelo de preguntas con los keys que queremos
      const preguntas = {
        hair: 'Toca con el dedo a la persona de la foto que tenga el pelo de color',
        sunglasses: 'Toca con el dedo a la persona de la foto que lleve gafas de sol',
        glasses: 'Toca con el dedo a la persona de la foto que lleve gafas de ver',
        clothes: 'Toca con el dedo a la persona de la foto que lleve la ropa de color',
        name: 'Toca con el dedo a',
        sex: 'Toca con el dedo a alguien del sexo',
        skin: 'Toca con el dedo a la persona de la foto que tenga la piel de color',
        eyes: 'Toca con el dedo a la persona de la foto que tenga los ojos de color',
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
      const [logMessages, setLogMessages] = useState([]);
      const [showLog, setShowLog] = useState(false);
      const [wrongCount, setWrongCount] = useState(0); //contador que nos va a servir para ver cuantas veces hace mal una pregunta
      const [clicksCounter, setClicksCount] = useState(1);
      const [clicksSuposedToBeCorrect, setClicksSuposedToBeCorrect] = useState(0); //el numero de personas total de las fotos escogidas
      const [correct_clicks_counter, setCorrectClicksCounter] = useState(1);
      const [peopleByPhoto, setPeopleByPhoto] = useState(0);
      const [questionsByPhoto, setQuestionsByPhoto] = useState(1);
      const [differentAnswerInArray, setDifferentAnswerInArray] = useState(null);

      const [correctClicks, setCorrectClicks] = useState(0);
      const [wrongClicks, setWrongClicks] = useState(0);

      

      // variable que guarda el estado de las coordenadas nuevas
      const [xInferior, setXinfScaled] = useState(); 
      const [yInferior, setYinfScaled] = useState(); 
      const [xSuperior, setXsupScaled] = useState(); 
      const [ySuperior, setYsupScaled] = useState(); 
      
      // para ver por primera vez la anchura escalada y la altura escalada
      //   let anchura_escalada = imageRef.current.getBoundingClientRect().width;
      //   let altura_escalada = imageRef.current.getBoundingClientRect().height;
      const [anchura_escalada, setAnchuraEjecucion] = useState();
      const [altura_escalada, setAlturaEjecucion] = useState();
      
      const [hasPhotos,setHasPhotos] = useState(true); //bool para saber si hay fotos asociadas o no
      const [threeSecs, setTimeThreeSecs] = useState(false);
      

      useEffect(() => {
        const start = new Date();
        setStartTime(start);

        //conseguimos el senior
        fetch(serverurl+'/users/'+ senior_nickname)
          .then(response => response.json())
          .then(senior_info => {
            setSenior(senior_info);
            // conseguimos las fotos que pertenezcan al senior
            fetch(serverurl+'/'+senior_info.id+'/photos')
            .then(response => response.json())
            .then(photos => {
              setPhotos(photos);
            })
            .catch(error => {
              console.log('Error:', error);
              return [];
            });
          })
          .catch(error => {
            console.log('Error:', error);
            return [];
          });
        
        
        }, []);
      
      //con esto se suman el numero de clicks que deberían dar para hacer la actividad de una
      useEffect(() => {
        //cada vez que se cambie de fotos y se obtenga un photo people diferente
        //se ejecutará esto y sumará el num de personas a clicksSuposedToBeCorrect
        if (photo_people[0]){
          setClicksSuposedToBeCorrect(clicksSuposedToBeCorrect + photo_people[0].length)
          setPeopleByPhoto(photo_people[0].length) //nos dice cuantas personas hay en la foto y también cuantas preguntas se deben hacer
          //console.log("peopleByPhoto (las preguntas que tiene que hacer por foto):",photo_people[0].length)
        }
      }, [photo_people]);

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
        } else if (activity_photos.length==0) {
          setHasPhotos(false);
        }
      }, [activity_photos, selectedPhotosIndexes]);

      // Función para obtener las personas de una foto
      const getPhotoPeople = () => {
        if (selectedPhotosIndexes[index]){
          // cogemos la lista de personas que sale en la foto
          const fetchPromises = fetch(serverurl+'/photos/' + selectedPhotosIndexes[index]?.id + '/people')
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
              //console.log("peopleArray:",peopleArray)
              setPhotoPeople(peopleArray);
            });
        }  
      };
      
      const imageRef = useRef(null);
      // controlador de estado de React Native para que se llame a la función getPhotoPeople
      // cada vez que se modifique el indice para renderizar la foto actual o si este es 0
      useEffect(() => {
        getPhotoPeople();
        let anchura = imageRef.current.getBoundingClientRect().width;
        let altura = imageRef.current.getBoundingClientRect().height;
        setAnchuraEjecucion(anchura);
        setAlturaEjecucion(altura);
      }, [index, selectedPhotosIndexes[0]?.id]);

      // Función para obtener las posiciones de la foto y hacer diccionarios y meterlos en el nuevo array 
      const getPhotoPositions = async () => {

        // Creamos un array de promesas para cada llamada fetch
        const fetchPromises = photo_people.map(people => {
          const fetchPromises = people.map(person => {
            
            return fetch(serverurl+'/photos/' + selectedPhotosIndexes[index]?.id + '/people/' + person.id)
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
                  clue: personData.clue,
                  w: personData.w,
                  h: personData.h,
                  x_inf: personData.x_inf,
                  y_inf: personData.y_inf,
                  x_sup: personData.x_sup,
                  y_sup: personData.y_sup,
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

      //función para analizar un array
      function analizarArray(arr) {
        const uniqueElements = [...new Set(arr)];
        // el set crea conjuntos (un conjunto no tiene elementos repetidos) y por tanto 
        // si tienen longitudes diferentes tendrá los elementos diferentes entre sí
        if (new Set(arr).size === arr.length) {
          //console.log("Todos los elementos son diferentes entre sí");
          return 'all_diff';
        }
        // un conjunto sólo almacenará elementos diferentes, por tanto si vemos
        // que tiene 2 significa que solo hay 2 tipos diferentes de elementos
        // si se cunple que el tamaño del conjunto es 2 y
        
        else if (uniqueElements.length === 2) {
          const firstElementCount = arr.filter(item => item === uniqueElements[0]).length;
          const secondElementCount = arr.filter(item => item === uniqueElements[1]).length;
      
          if (firstElementCount === 1) {
            // El primer elemento único está en el array.
            return arr.indexOf(uniqueElements[0]);
          } else if (secondElementCount === 1) {
            // El segundo elemento único está en el array.
            return arr.indexOf(uniqueElements[1]);
          }
        }
        // el conjunto meterá a todos los elementos en él y tendremos un único elemento
        // y esto significa que todos los elementos son iguales entre sí
        else if (uniqueElements.length === 1) {
          //console.log("Todos los elementos son iguales entre sí");
          return 'all_same';
        }
      }

      //función para generar pregunta
      function generarPregunta(pregunta,randomKey,person) {
        //redimensionamiento();
        if (randomKey === 'glasses' && person[randomKey] === false) {
          pregunta = 'Toca con el dedo a la persona de la foto que no lleve gafas de ver';
        } else if (randomKey === 'sunglasses' && person[randomKey] === false) {
          pregunta = 'Toca con el dedo a la persona de la foto que no lleve gafas de sol';
        } else if (randomKey === 'glasses' && person[randomKey] === true) {
          pregunta = 'Toca con el dedo a la persona de la foto que lleve gafas de ver';
        } else if (randomKey === 'sunglasses' && person[randomKey] === true) {
          pregunta = 'Toca con el dedo a la persona de la foto que lleve gafas de sol';
        } else {
          const preguntaBase = preguntas[randomKey];
          const preguntaAtributo = person[randomKey];
          pregunta = preguntaBase + ' ' + preguntaAtributo;
          console.log("pregunta: ",pregunta, "sobre la persona ", person.name, "con el index de foto ", index)
          //vamos al array que nos da la info de las personas, buscamos esa person y establecemos setPersonIndex() con el indice que nos de ese nombre
          
          setQuestion(pregunta);
          setQuestionsByPhoto(questionsByPhoto+1) //esto nos incrementa cada vez que se haga una pregunta en la foto
          //console.log("questionsByPhoto (las preguntas que ha hecho de momento):",questionsByPhoto)
        }
      }

      // Función para generar una nueva pregunta en base a una persona
      // Se mirará si nos quedamos con esa persona o no
      function generarNuevaPregunta(person) {

        // Coger una nueva randomKey
        const randomKey = getRandomKey();
        //console.log("person:",person, "estamos antes de generar la pregunta y la person es esta.")
        
        // Hacer el proceso nuevamente con la nueva randomKey
        //un array que nos dará las respuestas a la randomkeyde cada persona de la foto
        let respuestas = [];
        //console.log("people_info[0]:::::::::::::::::::::",people_info[0])
        for (let k = 0; k < people_info[0].length; k++) {
          const person = people_info[0][k];
          //console.log("respuesta de la persona:",person[randomKey])
          //console.log("person de dentro del for:",person)
          respuestas.push(person[randomKey]);
        }
        
        //analizamos las respuestas y las tratamos en base a si son únicas todas, si solo hay una o si todas son iguales
        console.log("Respuestas:", respuestas);
        let analysis = analizarArray(respuestas);
        let pregunta = '';

        
        if (analysis === 'all_diff') {  //si son todas diferentes utilizamos el person que ya teníamos
          generarPregunta(pregunta, randomKey, person);
        } else if (analysis !== 'all_diff' && analysis !== 'all_same') {  //si no son todas iguales y no son todas diferentes quiere decir que solo una será diferente
          person = people_info[peopleIndex][analysis];
          //console.log("analysis:",analysis)
          setPersonIndex(analysis) //people_info[peopleIndex][analysis]
          //console.log("person cuando solo una respuesta es diferente:" ,person)
          //console.log("Su respuesta es ",person[randomKey])
          //console.log("people_info[peopleIndex][analysis]: ",people_info[peopleIndex][analysis])
          generarPregunta(pregunta, randomKey, people_info[peopleIndex][analysis]);
        } else if (analysis === 'all_same') {
          // Repetir el proceso con una nueva randomKey
          //console.log("A repetir!");
          //console.log("person:",person, "estamos justo antes de llamar a generarNuevaPregunta")
          generarNuevaPregunta(person); // Llamada para repetir el proceso
        }
      }

      useEffect(() => {
        if (people_info && people_info[peopleIndex] && people_info[peopleIndex][personIndex]) {
          let person=people_info[peopleIndex][personIndex]; 
          //console.log("person:",person, "Y ahora voy a generar la pregunta tecnicamente sobre este person si tiene algo único y eso.")
          generarNuevaPregunta(person);
        }
      }, [people_info, personIndex, index, photo_people, peopleIndex]);

      // const imageRef = useRef(null);
    
      // Función para manejar el toque en la pantalla y avanzar al siguiente elemento del array de fotos o acabar la actividad
      const handleTouch = (event) => {
        //incrementamos el clicks_number
        setClicksCount(clicksCounter+1);

        let x, y;
        x = event.nativeEvent.layerX;
        y = event.nativeEvent.layerY;

        // console.log("X:",x," Y:",y);
        // console.log("getBounding: ",imageRef.current.getBoundingClientRect());
        // console.log("image ref: ", imageRef);
        // establecemos la refImaage
        //setImageRef(imageRef);
        //comprobación de que el click está siendo en la ubicación de la persona
        
        //cojo la w y la h de la posicion de la person
        let wdb=people_info[peopleIndex][personIndex].w;
        let hdb=people_info[peopleIndex][personIndex].h;
        // console.log("anchura_escalada:",anchura_escalada);
        // console.log("altura_escalada:",altura_escalada);
    
        // console.log("anchura de la foto en db:",wdb);
        // console.log("altura de la foto en db:",hdb);

        //coges las coordenadas de la posición de la persona en la foto
        let xinf = people_info[peopleIndex][personIndex].x_inf;
        let yinf = people_info[peopleIndex][personIndex].y_inf;
        let xsup = people_info[peopleIndex][personIndex].x_sup;
        let ysup = people_info[peopleIndex][personIndex].y_sup;

        // console.log("coordenadas originales esquina inferior izquierda: X=",xinf," Y:",yinf);
        // console.log("coordenadas originales esquina superior derecha: X=",xsup," Y:",ysup);

        let xInfScaled = ((anchura_escalada/wdb) * xinf);
        let yInfScaled = ((altura_escalada/hdb) * yinf);
        let xSupScaled = ((anchura_escalada/wdb) * xsup);
        let ySupScaled = ((altura_escalada/hdb) * ysup);

        // console.log("coordenadas escaladas esquina inferior izquierda: X=",xInfScaled," Y:",yInfScaled);
        // console.log("coordenadas escaladas esquina superior derecha: X=",xSupScaled," Y:",ySupScaled);

        if (x>=xInfScaled && x<=xSupScaled && y<=yInfScaled && y>=ySupScaled || wrongCount==2){
            //console.log("Click correcto :)");
            setCorrectClicks(correctClicks+1);
            console.log("correctClicks:",correctClicks)
            console.log("wrongClicks:",wrongClicks)
            //ponermos el wrongCount a 0 porque ha ido todo bien
            setWrongCount(0);
            //console.log("BIEN! wrongCount: ",wrongCount)
            //si click correcto pasará de forma normal todo
            //console.log("people_info:",people_info);
            //console.log("people_info[peopleIndex]:",people_info[peopleIndex]);

            if (people_info && people_info[peopleIndex] && personIndex < people_info[peopleIndex].length - 1 ) {
              setPersonIndex(personIndex + 1);
              console.log("personIndex:",personIndex)
            } else if (people_info && peopleIndex + 1 < people_info.length) { 
              setPeopleIndex(peopleIndex + 1);
            } else if(index < selectedPhotosIndexes.length - 1){
              setPersonIndex(0);
              setIndex(index+1);
              setQuestionsByPhoto(0);
              console.log("personIndex:",personIndex)
              console.log("PhotoIndex:",index)
            } else {
              const end = new Date();
              setEndTime(end);
            } 
          }else if (wrongCount<2){
            //click incorrecto
            
            setWrongClicks(wrongClicks+1);
            console.log("correctClicks:",correctClicks)
            console.log("wrongClicks:",wrongClicks)
            //incrementamos el wrongcount
            setWrongCount(wrongCount+1);
            //console.log("MAL! wrongCount: ",wrongCount)
            let mensajeTemporal = people_info[peopleIndex][personIndex].clue;
            console.log("La clue corresponde a:",people_info[peopleIndex][personIndex].name )
            setLogMessages([mensajeTemporal]);
            setShowLog(true);
            
            //lo dejo 5 segundos para que puedan leerlo
            setTimeout(() => {
              setShowLog(false);
            }, 5000);
          }
        
      };

      //función para combertir el tiempo de juego
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
        //console.log("time: ", td);
        timeConversion(td);
      }, [endTime]); 

      useEffect(() => {
        //console.log("formattedTime: ", formattedTime);
        if(index == selectedPhotosIndexes.length - 1)
        //si ya hemos acabado con las fotos:
        navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name, activity: activity, score: (correctClicks-wrongClicks), activity_score: correctClicks , senior: senior, playing_time: formattedTime });
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

          <View style={styles.activityWhoContainer}>
            
          {showLog && (
            <Text style={styles.speechText}>
              Pista: {logMessages[0]}
            </Text>
          )} 
          {!showLog &&(
            <TouchableOpacity
            ref={imageRef} style={styles.activityContainerImage} onPress={handleTouch}>
              <Image
                id = 'photo'
                style={styles.activityContainerImage}
                source={{ uri: `http://localhost:8000/uploads/${selectedPhotosIndexes[index]?.photo_file}` }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          

          </View>
        </View>
      );
    }else{
      //necesito que al entrar aquí se quede los 3 segundos y salga
      //console.log("resulta que el hasPhotos era negativo, oye")
      
      useEffect(() => {
        const timer = setTimeout(() => {
          // Esto se ejecutará después de 3 segundos
          navigation.goBack(); // Navega de vuelta a la pantalla anterior
        }, 3000); // 3000 milisegundos = 3 segundos
    
        // Limpia el temporizador si el componente se desmonta antes de que se ejecute
        return () => clearTimeout(timer);
      }, [navigation]);
      
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
          
          <View style={styles.speechContainer}>
  
            <Text style={styles.speechText}>Oh, que pena...</Text>
  
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
  
          <View style={styles.activityWhoContainer}>
            
            <Text style={styles.speechText}>
              Parece que todavía no tienes fotos
            </Text>
  
          </View>
        </View>
      );
    }
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
    const [totalClicks, setTotalClicks] = useState(1);



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
    const nums = [3,2,1,'Ninguno',22,9,5,4,7];

    //primero coges el id del senior 
    useEffect(() => {
      //establecemos el tiempo de inicio
      const start = new Date();
      setStartTime(start);

      fetch(serverurl+'/users/'+ senior_nickname)
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
          fetch(serverurl+'/senior/' + seniorId.id)
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
      //console.log("formattedTime: ", formattedTime);
      if (WrongAnsweredQuestionsKeys.length === 0 && correctTouches === 5)
      //Navegamos a la pantalla de finalización de la actividad
      navigation.navigate('SeniorActivityFinished', { senior_nickname:senior_nickname, senior_password:senior_password, senior_name:senior_name, activity: activity, senior: seniorId, score: correctTouches, activity_score: totalClicks, playing_time: formattedTime});
    }, [formattedTime, seniorId]); 

    // Manejar el toque en un elemento touchable
    const handleTouch = (ans) => {
      setTotalClicks(totalClicks+1);
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
      //console.log(correctTouches);
    }, [correctTouches]); 

    useEffect(() => {
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
