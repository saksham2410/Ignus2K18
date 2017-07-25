import React from 'react';
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import FBSDK , {LoginManager} from 'react-native-fbsdk';

import { Colors, Fonts, Images, Layout } from '../constants';
import NavigationEvents from '../utilities/NavigationEvents';
import PurpleGradient from '../components/PurpleGradient';
import Login1 from './login';


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
  _fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result){
      if(result.isCancelled){
        console.log('Login was cancelled');
      }
      else {
        console.log('Login was successful' + result.grantedPermission.toString());
      }
    }, function(error) {
      console.log('An error occured:' + error);
    }
    )
  }

  render() {


    return (

      <PurpleGradient style={[styles.linearGradient, { flex: 1 }]}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={Images.githubIcon} style={styles.logo}></Image>
              <Text style={styles.Title}> Enter you IG number and E-mail Id used for registration</Text>
            </View>
            <View>
              <Login1 />
            </View>
            <View style={styles.cause}>
              <Image source={Images.cause} style={styles.logoContainer1}></Image>
            </View>
          </View>


      </PurpleGradient>
    );
  }


}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  logoContainer1: {
    padding:5,
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  cause:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30%',
    flex: 0.5,
  },
  Title: {
    opacity: 0.5,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 20,
    width: 220,
  },
  logo: {
    width:100,
    height:100,
  },
  container: {
    flex: 0.5,
    paddingTop: Layout.baseMargin,
    backgroundColor: Colors.transparent,
  },

});
