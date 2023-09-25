import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import ChargedLoginScreen from './components/ChargedLoginScreen';
import TutorHomeScreen from './components/TutorHomeScreen';
import TutorSeniorFoldersScreen from './components/TutorSeniorFoldersScreen';
import TutorAddSeniorScreen from './components/TutorAddSeniorScreen';
import TutorSeniorReportScreen from './components/TutorSeniorReportScreen';
import TutorSeniorActivityInfoScreen from './components/TutorSeniorActivityInfoScreen';
import TutorSeniorActivityScoresScreen from './components/TutorSeniorActivityScoresScreen';
import TutorGetPhotoScreen from './components/TutorGetPhotoScreen';
import TutorPhotosGaleryScreen from './components/TutorPhotosGaleryScreen';
import TutorAddPhotoDescriptionScreen from './components/TutorAddPhotoDescriptionScreen';
import TutorAddPhotoPeopleScreen from './components/TutorAddPhotoPeopleScreen';
import TutorAddPhotoPersonScreen from './components/TutorAddPhotoPersonScreen';
import TutorAddPhotoPositionScreen from './components/TutorAddPhotoPositionScreen';

import SeniorWelcomeScreen from './components/SeniorWelcomeScreen';
import SeniorHomeScreen from './components/SeniorHomeScreen';
import SeniorGamesScreen from './components/SeniorGamesScreen';
import SeniorFamilyScreen from './components/SeniorFamilyScreen';
import SeniorStartActivityScreen from './components/SeniorStartActivityScreen';
import SeniorActivityFinishedScreen from './components/SeniorActivityFinishedScreen';

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