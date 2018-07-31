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
  Alert
 
} from "react-native";

import { connect } from "react-redux";
import Loader from '../common/Loader';


import { Actions } from "react-native-router-flux";
import EmailIcon from "../../assets/message.png";
import AppLogo from "../../assets/app_logo.png";
import { 
         emailChanged, 
         forgotPassword ,
         showForgotPasswordLoading,
         clearForgotResponseRecord } from "../../actions/index";




class ForgotPasswordScreen extends Component {

  componentWillReceiveProps(nextProps) {
    // Handle getSites service response
    console.log("forgot password response..................." ,this.props.isForgotLoading)

      if(nextProps.forgotResponseData != undefined && nextProps.forgotResponseData != ''){
        if(nextProps.forgotResponseData.status= 200){ 
          alert("Password send to registerd Email");
         this.props.showForgotPasswordLoading(false);          
          Actions.pop();
          Actions.LoginScreen();
        }        
        else{
          this.props.showForgotPasswordLoading(false);
          alert(nextProps.forgotResponseData.message);
              this.props.clearForgotResponseRecord();
        }
      }
  }
  onEmailChanged(email){
     this.props.emailChanged(email);
   }

   componentDidUpdate() {

    if(this.props.forgotResponseData != undefined && this.props.forgotResponseData != ''){
      this.props.clearForgotResponseRecord();
    }
  }


    onResetButtonPress() {
      /* alert("Password Reset Link send to registered email Id !!")
      Actions.pop();
      Actions.LoginScreen(); */
      Keyboard.dismiss();
      if(this.props.email ==='')
      alert('Please Enter Username');
      else
      {

        this.props.showForgotPasswordLoading(true);

        var forgot = {
          email: this.props.email
        }
        this.props.forgotPassword(forgot);
      }


  }

    onCancelButtonPress(){
      if(this.props.forgotResponseData != undefined && this.props.forgotResponseData != ''){
        this.props.clearForgotResponseRecord();
      }
      this.props.emailChanged('');
      
      Actions.pop();
        Actions.LoginScreen();
    }
    
    componentDidMount () {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }
  
    componentWillUnmount () {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      
    }
  
    onBackPress () {
      if (Actions.state.index === 1) {
        console.log("onBackPress1",Actions.state.index)
        BackHandler.exitApp();
        return false;
      }
      console.log("onBackPress2",Actions.state.index)
      Actions.pop();
      return true;
    }
    render(){
        return(

            <View style={{flex:1, backgroundColor:"#f1f1fd"}}>
			<Loader
          loading={this.props.isForgotLoading} />
	<View style={styles.controlsContainer}>

            <Image 
                
                 source={AppLogo
                 }></Image>
            <View>
            <Text 
                  style={styles.loginText}>
						    	RESET PASSWORD
						</Text>
          </View>

						<View style={styles.inputsContainer}>

                

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
               						style={ { width:250, flex:1, marginLeft: 10,fontSize:18}}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize='none'
                          keyboardType='email-address'
                          returnKeyType='done'
                					placeholder="Enter Email Address"
                					placeholderTextColor="#696969"
                          onChangeText={this.onEmailChanged.bind(this)}
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
            			
  
            			</View>	
   
                  
                 <View
                 style ={{flexDirection:'row', marginTop:50, marginStart:20,marginEnd:20}}>
                        <View
                         style={styles.buttonContainer} 
                      
                       >
                             <Text
                              onPress = {this.onResetButtonPress.bind(this)}
                             style={{
                                      color:'#14136d',
                                      fontWeight:'bold',
                                      fontSize:16,
                                      textAlign:'center',
                                      width:130,
                                      height:35,
                                     
                                       }}
                             >RESET</Text>
						</View>

             <View
                         style={styles.buttonContainer} 
                      
                       >
                             <Text
                              onPress = {this.onCancelButtonPress.bind(this)}
                             style={{
                                      color:'#14136d',
                                      fontWeight:'bold',
                                      fontSize:16,
                                      textAlign:'center',
                                      width:130,
                                      height:35,
                                       }}
                             >CANCEL</Text>
						</View>
            </View>
           
                     

            

					</View>
			</View>

        );

    }
}

const styles = StyleSheet.create({

   
  
    welcomeContainer:{
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
    },
  
    loginText: {
      fontSize: 20,
      fontWeight:'bold',
      marginTop:20,
      marginBottom:30,
    
      backgroundColor: '#f1f1fd',
      color: '#393939',
    },
  
    controlsContainer:{
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
        marginTop: 25
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
  
    buttonContainer:{
        
        
        marginTop:20,
        marginEnd:20,
        padding:5,
        width:130,
        height:35,
        alignItems:'center',
        borderRadius: 25,
        padding: 5,
        borderColor:'#14136d',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        marginTop: 30,
        
       
        
    },
  
    forgotContainer: {
      flexDirection: 'row',
      width: 300,
      height: 40,
      alignItems: 'center',
      backgroundColor: 'transparent',
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
      flex:1,
      left:0,
      right:0,
      top:0,
      bottom:0,
      position:'absolute',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(52, 52, 52, 0.8)',
      width: null,
        height: null
    },
  
    progress: {
      margin: 10,
    },
  
  });

  const mapStateToProps = ({forgot}) => {
    const {email, forgotResponseData, isForgotLoading} = forgot;
    return{
      email: email,
      forgotResponseData: forgotResponseData,
      isForgotLoading: isForgotLoading,

    }
  }
  
export default connect(mapStateToProps,{emailChanged, forgotPassword, showForgotPasswordLoading,clearForgotResponseRecord})(ForgotPasswordScreen);