import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {Content, Footer} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo1 from '../../assets/logo1.png';
import fondo1 from '../../assets/fondo1.jpg';
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  backgroundImage: {
    minHeight: window.height,
    width: '100%'
  },
  completeContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  logoContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  logoImage: {
    height: 125,
    width: 150
  },
  contentContainer: {
    flex: 2
  },
  termsButtonsWrapper: {
    paddingVertical: 10
  },
  termsTextButton: {
    color: '#1F1F1F',
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  footer: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginVertical: 15
  }
});

export default class AuthLayout extends Component {
  render(){
    const {children} = this.props;

    return(
      <KeyboardAwareScrollView style={styles.container}>
        <ImageBackground source={fondo1} style={styles.backgroundImage}>
          <View style={styles.completeContainer}>
            <View style={styles.content}>
              <View style={styles.logoContainer}>
                <Image source={logo1} style={styles.logoImage}/>
              </View>
              <View style={styles.contentContainer}>
                {children}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity>
                <Text style={styles.termsTextButton}>
                  Términos, condiciones y aviso de privacidad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    )
  }
}
