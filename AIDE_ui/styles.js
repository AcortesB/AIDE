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
    fontSize: 30,
    fontFamily: 'Arial',
    resizeMode: 'contain'
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

  buttonTouchable: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    left: "0%",
    top: "0%"
  },


  homeTouchableActivityContainerImageText: {
    fontSize: 30,
    fontFamily: 'Arial',
    resizeMode: 'contain'
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
    alignItems: "left",
    justifyContent: "left",
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