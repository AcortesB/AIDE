import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
console.log(width)
console.log(height)


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#72d9fe",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileScrollView: {
    flex: 1,
    marginVertical: 70,
    top: 0,
    right: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: "15%"
  },

  mobileScrollViewBackground: {
    backgroundColor: "#abe5fa",
    borderRadius: 30,
    flex: 1,
    marginVertical: "10%",
    top: 0,
    right: 0,
    left: 0,
    width: "90%",
    paddingHorizontal: "15%"
  },


  activityContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: "#72d9fe",
    top: "20%",
    left: "12.5%",
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: "15%",
    },
  
    activityWhoContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: "#72d9fe",
    top: "20%",
    left: "12.5%",
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: "15%",
    justifyContent: 'center',
  },

  activityContainerImage: {
    height: '100%', // Ajustar la altura al 100% del contenedor
    aspectRatio: 1, // Mantener el aspect ratio original de la imagen
  },

  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute'
  },

  line: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'red',
  },

  circle_green: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    position: 'absolute'
  },

  circle_blue: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    position: 'absolute'
  },
  speechContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    position: 'absolute',
    top: 0,
    left: "12.5%",
    right: 0,
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'contain'
  },

  PhotoDescriptionContainer: {
    flex: 1,
    backgroundColor: "#abe5fa",
    position: 'absolute',
    borderRadius: 30,
    width: "70%",
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
    resizeMode: 'contain'
  },

  PhotoPeopleListContainer: {
    flex: 1,
    backgroundColor: "#abe5fa",
    position: 'absolute',
    borderRadius: 30,
    top: "60%",
    width: "70%",
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
    resizeMode: 'contain'
  },

  GetPhotoContainer: {
    flex: 1,
    //backgroundColor: "#abe5fa",
    position: 'absolute',
    borderRadius: 30,
    top: "0%",
    width: "70%",
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
    resizeMode: 'contain'
  },

  EndScreenIconContainer: {
    flex: 1,
    //backgroundColor: "#abe",
    position: 'absolute',
    borderRadius: 30,
    bottom: "5%",
    width: "70%",
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
    resizeMode: 'contain'
  },

  ViewPhotoPeopleListContainer: {
    position: 'absolute',
    borderRadius: 30,
    top: "30%",
    width: "70%",
    marginBottom: 20,
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
    resizeMode: 'contain'
  },

  descriptionText: {
    padding: 10, // Agrega espacio interno alrededor del texto
    //fontSize: 16,
    //fontWeight: 'bold',
  },

  speechText: {
    fontSize: 55,
    fontFamily: 'Arial',
    resizeMode: 'contain'
  },

  speechTextWIW: {
    fontSize: 55,
    fontFamily: 'Arial',
    resizeMode: 'contain',
    width: "70%"
  },

  scrollViewActivityText: {
    fontSize: 45,
    fontFamily: 'Arial',
    resizeMode: 'contain',
    marginLeft: 50
  },

  photoActivityShownTouchable: {
    position: 'absolute',
    top: "5%",
    left: 0,
    right: 0,
    bottom: "5%",
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    alignItems: "center",
    justifyContent: "center",
  },

  photoActivityShown: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    alignItems: "center",
    justifyContent: "center",
  },

  sidebarContainer: {
    backgroundColor: '#3882e7',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: "12.5%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },


  sidebarSquareContainer: { 
    backgroundColor: '#abe5fa',
    position: 'absolute',
    top: "2%",
    left: "8%",
    bottom: "2%",
    width: "84%",
    alignItems: "center",
    justifyContent: "center",
  },


  sidebarIconImage: {
    position: 'absolute',
    height: "100%",
    top: 0,
    width: "100%",
    resizeMode: 'contain'
  },


  homeActivityContainerImage: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    left: "0%",
    top: "0%"
  },


  homeTouchableActivityContainerImage: {
    width: "40%",
    height: "40%",
    resizeMode: 'contain',
    left: "0%",
    top: "0%"
  },

  answerTouchable: {
    width: '20%', // Establece el ancho al 20% del espacio disponible (4 elementos por fila si la pantalla es lo suficientemente ancha)
    aspectRatio: 1, // Esto hace que el elemento sea cuadrado
    alignItems: 'center', // Centra el contenido verticalmente
    justifyContent: 'center', // Centra el contenido horizontalmente
    borderWidth: 1, // Añade un borde
    borderColor: 'white', // Establece el color del borde en blanco
    borderRadius: 30, // Establece el radio de borde para que las puntas sean redondas
    backgroundColor: '#eeeeee', // Establece el color de fondo en blanco
    // Puedes ajustar el valor de 'borderRadius' según tus preferencias
  },

  customFileInputButton: {
    backgroundColor: 'blue', // Cambia el color de fondo según tus preferencias
    color: 'white', // Cambia el color del texto según tus preferencias, // Añade relleno según tus preferencias
    borderRadius: '5px', // Añade bordes redondeados según tus preferencias
    //cursor: 'pointer', // Cambia el cursor al pasar el ratón por encima
  },

  video: {
    width: "100%",
    height: 'auto',
    border: '4px solid black'
  },

  buttonTouchable: {
    width: "30%",
    height: "0%",
    resizeMode: 'contain',
    left: "50%",
    top: "100%",
    marginTop: "100%"
  },

  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: '25%', // Esto alinea el texto al 25% hacia la derecha
  },

  homeTouchableActivityContainerImageText: {
    fontSize: 30,
    fontFamily: 'Arial',
    resizeMode: 'contain',
    fontWeight: 'bold'
  },

  textContainer2: {
    marginBottom: "5%", // Ajusta este valor según tu preferencia
    marginLeft: "7%",
    marginRight: "7%",
    alignItems: 'center',
  },

  galleryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginVertical: 50
  },


  imageContainer: {
    marginRight: 10,
  },


  galleryImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    left: 0,
    top: 0
  },


  galleryImageText: {
    fontSize: 30,
    fontFamily: 'Arial',
    resizeMode: 'contain',
    marginLeft: 50
  },

  
  scrollView: {
    marginVertical: 70,
    flex: 1,
    position: 'absolute',
    backgroundColor: "#72d9fe",
    top: "20%",
    left: "12.5%",
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: "15%",
  },

  addSeniorScrollView: {
    marginVertical: 70,
    //flex: 1,
    position: 'absolute',
    backgroundColor: "#72d9fe",
    top: "0%",
    left: "12.5%",
    bottom: 0,
    right: 0,
  },

  sidebarIcon1: {
    position: 'absolute',
    height: "25%",
    top: 0,
    width: "80%",
    resizeMode: 'contain'
  },


  sidebarIcon2: {
    position: 'absolute',
    height: "25%",
    top: "25%",
    width: "80%",
    resizeMode: 'contain'
  },


  sidebarIcon3: {
    position: 'absolute',
    height: "25%",
    top: "50%",
    width: "80%",
    resizeMode: 'contain'
  },


  sidebarIcon4: {
    position: 'absolute',
    height: "25%",
    top: "75%",
    width: "80%",
    resizeMode: 'contain'
  },


  sidebarIcon1selected: {
    backgroundColor: '#3882e7',
    position: 'absolute',
    height: "25%",
    top: 0,
    width: "100%",
    resizeMode: 'contain'
  },


  sidebarIcon2selected: {
    backgroundColor: '#3882e7',
    position: 'absolute',
    height: "25%",
    top: "25%",
    width: "100%",
    resizeMode: 'contain'
  },


  sidebarIcon3selected: {
    backgroundColor: '#3882e7',
    position: 'absolute',
    height: "25%",
    top: "50%",
    width: "100%",
    resizeMode: 'contain'
  },


  sidebarIcon4selected: {
    backgroundColor: '#3882e7',
    position: 'absolute',
    height: "25%",
    top: "75%",
    width: "100%",
    resizeMode: 'contain'
  },


  muteIcon: {
    flex: 1,
    position: 'absolute',
    height: "80%",
    right: "2%",
    width: "10%",
    resizeMode: 'contain',
  },


// -----------------------------------------------
  seniorSelectionBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginVertical: 20, // Ajusta este valor según la separación deseada
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#659dea",
  },

  addSeniorBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  addPhotoBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  addFileBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  deletePhotoBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    bottom: "5%"
  },

  deleteSeniorBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    bottom: "5%"
  },


  listoBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#3882e7",
  },

  recuadroTransparente: {
    borderRadius: 30,
    position: 'absolute',
    width: "60%",
    top: "30%",
    transform: [{ translateY: "-50%" }],
    alignItems: "center",
    justifyContent: "center",
    resizeMode: 'contain'
  },

  recuadroTransparenteDescripcionFoto: {
    borderRadius: 30,
    position: 'absolute',
    width: "60%",
    top: "60%",
    transform: [{ translateY: "-50%" }],
    alignItems: "left",
    justifyContent: "left",
    resizeMode: 'contain'
  },

  butonIcon: {
    width: "70%",
    height: "70%",
    resizeMode: 'contain',
    left: 0,
    top: 0
  },

  butonIconRecovery: {
    width: "10%",
    height: "10%",
    resizeMode: 'contain',
    left: 0,
    top: 0
  },

  
  dots: {
    fontSize: 32,
    fontFamily: 'Arial',
    resizeMode: 'contain',
  },

  tutorText: {
    top: "10%",
    fontSize: 16,
    fontFamily: 'Arial',
    resizeMode: 'contain',
  },

  tutorTextBold: {
    top: "10%",
    fontSize: 16,
    fontFamily: 'Arial',
    resizeMode: 'contain',
    //fontWeight: 'bold',
  },

  textSpacing: {
    marginBottom: 10, // Espacio vertical entre cada texto
  }, 



// -----------------------------------------------
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
    alignItems: "left", // en el movil no le gusta y lo quiere 'center'
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  inputViewPhotoDescription: {
    backgroundColor: "#abe5fa",
    borderRadius: 30,
    width: "70%",
    height: "20%",
    marginBottom: 20,
    alignItems: "center", // Alinear el contenido en el centro horizontalmente
    justifyContent: "flex-start", // Alinear el contenido en la parte superior verticalmente
  },

  TextInputPhotoDescription: {
    borderRadius: 30,
    width: "100%",
    height: "18%",
    flex: 1,
    padding: 10,
    textAlignVertical: "top", // Alinear el texto alineado arriba (top) y con saltos de línea (wrap) - solo afectará a dispositivos Android
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    fontSize: 16,
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

  loginBtnTransparent: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    border: "1px solid black",
  },

});