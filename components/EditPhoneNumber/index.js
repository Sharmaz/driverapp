import React, { Component } from 'react';
import { Alert, Image, Text, View, TextInput } from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Input,
  Left,
  Right,
  Title,
} from 'native-base';
import styles from './style';
import profile from '../../assets/profile.png';
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditPhoneNumber extends Component {
  state = {
    original_phone_number: '+52 312 450 5499',
    new_phone_number: '+52 111 450 5499',
    buttonDisabled: true
  }

  componentDidMount(){
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/drivers/profile')
    .then(res => {
      //Falta el phone number
      // this.setState({

      // })
    }).catch(err => console.log(err))
  }

  handleReturn = () => {
    if(this.difference() === true){
      Alert.alert(
        'Cambios sin guardar',
        '¿Guardar y salir?',
        [
          {text: 'No'},
          {text: 'Si', onPress: () => this.handleSave(true)},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  handleSave = (returnFlag = false) => {
    if(returnFlag) {
      /*
      Api.put(/driver/edit_name)...then(
        this.props.naviga...('profile')
      )
      */
      this.props.navigation.navigate('Profile')
    } else {
      /*
      Api.put(/driver/edit_name)...then(
        fillFields() -> Para actualizar info
        this.difference()
      )
      */
      console.log('Guardado')
      this.difference()
    }
  }

  difference = () => {
    if(this.state.original_phoneNumber !== this.state.new_phoneNumber){
      this.setState({buttonDisabled: false})
      return true
    } else {
      this.setState({buttonDisabled: true})
      return false
    }
  }

  render(){
    return(
      <KeyboardAwareScrollView style={styles.keyboard}>
        <Header style={styles.header} iosBarStyle="light-content" androidStatusBarColor="#262626">
          <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name='ios-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar número de celular</Title>
          </Body>
          <Right style={styles.headerRight} />
        </Header>

        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.darkFieldWrapper}>

              <View style={styles.generalItem}>
                <Text style={styles.label}>Número de celular:</Text>
                <TextInput
                    placeholder="Número de celular"
                    autoCapitalize="none"
                    onChangeText={new_phone_number => {
                      this.setState({ new_phone_number }, () => this.difference())
                    }}
                    value={this.state.original_phone_number}
                    placeholderTextColor="#5C5C5C"
                    style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonWrapper} >
              <Button
                block
                style={ this.state.buttonDisabled ? styles.buttonDisabled : styles.button }
                disabled = {this.state.buttonDisabled}
                onPress={() => this.handleSave()}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </Button>
            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
