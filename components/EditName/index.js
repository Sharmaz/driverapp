import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
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
import Api from '../../utils/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class EditEmail extends Component {
  state = {
    original_full_name: '',
    new_full_name: '',
    buttonDisabled: true
  }

  componentDidMount(){
    this.fillFields();
  }

  fillFields = () => {
    Api.get('/drivers/profile')
    .then(res => {
      this.setState({
        original_full_name: res.data.user.full_name,
        new_full_name: res.data.user.full_name
      });
      this.difference();
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
      Api.put('/users/profile', {full_name: this.state.new_full_name}).then( res => {
        this.props.navigation.navigate('Profile')
      });
    } else {
      Api.put('/users/profile', {full_name: this.state.new_full_name}).then( res => {
        this.fillFields();
      });
    }
  }

  difference = () => {
    if(this.state.original_full_name !== this.state.new_full_name){
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
          <Left style={styles.leftHeader}>
            <Button transparent onPress={() => this.handleReturn()}>
              <Icon name='ios-arrow-back' style={styles.menuIcon} />
            </Button>
          </Left>
          <Body style={styles.bodyHeader}>
            <Title style={styles.fontText}>Editar nombre</Title>
          </Body>
          <Right style={styles.rightHeader} />
        </Header>

        <View style={styles.container}>
          <View style={styles.darkFieldWrapper}>
            <View style={styles.item}>
              <Text style={styles.label}>Nombre completo:</Text>
              <Input
                placeholder="Nombre completo"
                autoCapitalize="none"
                onChangeText= {new_full_name => {
                  this.setState({ new_full_name }, () => this.difference())
                }}
                value={this.state.new_full_name}
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
      </KeyboardAwareScrollView>
    )
  }
}