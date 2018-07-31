import React, { Component } from "react";
import {

  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Text,
  BackHandler,
  Keyboard,
  AsyncStorage,
  Alert

} from "react-native";
import {  connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import PhoneIcon from "../../assets/phone.png";
import EmailIcon from "../../assets/message.png";

import AppLogo from "../../assets/app_logo.png";
import UsernameIcon from "../../assets/username.png";
import PasswordIcon from "../../assets/password.png";
import { 
  nameChanged,
  passChanged,
  emailIsChanged,
  phoneChanged,
  clearRegistrationRecord,
  showRegistrationLoading,
  registerUser
  
 } from "../../actions/index";
 import Loader from '../common/Loader';




class RegistrationScreen extends Component {

  onUsernameChanged(username){
    this.props.nameChanged(username)
}

onEmailChange(email){
  this.props.emailIsChanged(email)
}

onPhoneChanged(phone){
  this.props.phoneChanged(phone)
}

onPasswordChanged(password){
  this.props.passChanged(password)
}

  onSendOtpButtonPress() {
    Actions.OtpVerificationScreen();
  }


  componentDidUpdate() {

    if(this.props.registerResponseData != undefined && this.props.registerResponseData != ''){
      this.props.clearRegistrationRecord();
    }
  }
  onSubmitButtonPress() {
    /* Actions.pop();
    Actions.pop();
    Actions.Dashboard(); */

    Keyboard.dismiss();

    if (this.props.username == ''){
      Alert.alert("Please Enter Username");
    }
    else if (this.props.password == ''){
      Alert.alert("Please Enter Password");
    }
    else if (this.props.phone == ''){
    Alert.alert("Please Enter Phone");
    }
    else if (this.props.email == ''){
    Alert.alert("Please Enter Email");
    }
else{
      this.props.showRegistrationLoading(true);
      var register={
        name:this.props.username,
        password:this.props.password,
        phone:this.props.phone,
        email:this.props.email,
        
};
    
      this.props.registerUser(register); 
    }
  }


  componentWillReceiveProps(nextProps) {
            
    console.log("nextProps.registerResponseData..................---------------------" ,nextProps.registerResponseData);
    console.log("registration status..........", nextProps.registerResponseData.status)
 



    if(nextProps.registerResponseData != undefined && nextProps.registerResponseData != ''){

        if(nextProps.registerResponseData.status == 200){

            this.props.showRegistrationLoading(false);
  
            AsyncStorage.clear(); // Clear any previous data if exist.
            
            //AsyncStorage.setItem("role", nextProps.registerResponseData.role);
           // AsyncStorage.setItem("userData", JSON.stringify(nextProps.registerResponseData.data));
           alert("Verification link send \n Please verify to Login");
            this.props.nameChanged('');
            this.props.passChanged('');
            this.props.phoneChanged('');
            this.props.emailIsChanged('');
             Actions.pop();
             Actions.LoginScreen();

        }
      
      else{
        this.props.showRegistrationLoading(false);
        alert(nextProps.registerResponseData.message);
        this.props.clearRegistrationRecord();
      }
   
    }
   
  


}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.props.nameChanged('');
    this.props.passChanged('');
    this.props.phoneChanged('');
    this.props.emailIsChanged('');
    
  }

  onBackPress() {
    if (Actions.state.index === 1) {
      console.log("onBackPress1", Actions.state.index)
      BackHandler.exitApp();
      return false;
    }
    console.log("onBackPress2", Actions.state.index)
    Actions.pop();
    return true;
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: "#f1f1fd" }}>
<Loader
          loading={this.props.isRegisterLoading} />
        <View style={styles.controlsContainer}>

          <Image
            source={AppLogo
            }></Image>
          <View>
            <Text
              style={styles.loginText}>
              REGISTER
						</Text>
          </View>

          <View style={styles.inputsContainer}>



            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={UsernameIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                 
                  returnKeyType='next'
                  placeholder="Your Name"
                  placeholderTextColor="#696969"
                  onChangeText={this.onUsernameChanged.bind(this)}
                  value={this.props.username}
                  returnKeyType='next'

                />
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={EmailIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  keyboardType='email-address'
                  placeholder="Email Address"
                  placeholderTextColor="#696969"
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                 
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={PhoneIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  keyboardType = "numeric"
                  placeholder="Phone Number"
                  placeholderTextColor="#696969"
                  onChangeText={this.onPhoneChanged.bind(this)}
                  value={this.props.phone}
               
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={PasswordIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <TextInput
                  style={{ width: 250, flex: 1, marginLeft: 10, fontSize: 18 }}
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                  placeholder="Set Password"
                  placeholderTextColor="#696969"
                  onChangeText={this.onPasswordChanged.bind(this)}
                  value={this.props.password}
                  
                />
              </View>
            </View>
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            />
          </View>

          <View
            style={styles.buttonContainer}

          >
            <Text
              onPress={this.onSubmitButtonPress.bind(this)}
              style={{
                color: '#14136d',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center',
                width: 150,
                height: 35,
              }}
            >SUBMIT</Text>
          </View>







        </View>
      </View>

    );

  }
}

const styles = StyleSheet.create({



  welcomeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,

    backgroundColor: '#f1f1fd',
    color: '#393939',
  },

  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },

  inputsContainer: {
    alignContent: 'space-between'
  },

  inputContainer: {
    flexDirection: 'row',
    width: 300,
    height: 40,
    backgroundColor: '#f1f1fd',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    marginTop: 15
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  inputIcon: {
    width: 35,
    height: 35,
    marginBottom: 5

  },

  buttonContainer: {

    margin: 20,
    padding: 5,
    width: 150,
    height: 35,
    alignItems: 'center',
    borderRadius: 25,
    padding: 5,
    borderColor: '#14136d',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    marginTop: 80,



  },

  forgotContainer: {
    flexDirection: 'row',
    width: 300,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#f1f1fd',
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
    marginTop: 2
  },

  circles: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    width: null,
    height: null
  },

  progress: {
    margin: 10,
  },

});

const mapStateToProps = ({register}) => {

  const {username, password, phone, email, isRegisterLoading, registerResponseData} = register;
   return{
    username: username,
    password: password,
    phone: phone,
    email: email,
    isRegisterLoading: isRegisterLoading,
    registerResponseData: registerResponseData


   }
}

export default connect(mapStateToProps, {nameChanged,emailIsChanged,phoneChanged,passChanged,clearRegistrationRecord,showRegistrationLoading,registerUser})(RegistrationScreen);