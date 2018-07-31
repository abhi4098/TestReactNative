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
    Alert,
    AsyncStorage
} from "react-native";

import {
    userProfile,
    showProfileLoading,

    
  } from "../../actions/ProfileActions";
  import Loader from '../common/Loader';
  import { connect } from "react-redux";
import AppLogo from "../../assets/app_logo.png";
import { Actions } from "react-native-router-flux";
class DriverProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          userProfile:'',
          profileResponseData: '',
          username:'',
          email:'',
          phone:''
          
        }
      }

      componentWillMount(){
          console.log("componentWillMount.........................")
      }
      componentDidMount(){
        console.log("componentDidMount.........................")

          this.getProfileData();
      }

      componentWillUpdate(){
        console.log("componentWillUpdate.........................")

      }
    


      componentWillReceiveProps(nextProps)
      {
        if(nextProps.profileResponseData != undefined && nextProps.profileResponseData != '')
        {
            if(nextProps.profileResponseData.status == 200){

                this.props.showProfileLoading(false);
      
                 // Clear any previous data if exist.
                 if(nextProps.profileResponseData.message == "success")
            {
            AsyncStorage.setItem("userData", JSON.stringify(nextProps.profileResponseData.data));
            }
                this.setState({username: nextProps.profileResponseData.data.firstname +" " +nextProps.profileResponseData.data.lastname })
                this.setState({email: nextProps.profileResponseData.data.email});
                this.setState({phone: nextProps.profileResponseData.data.phone});
            }
          
          else{
            this.props.showProfileLoading(false);
            alert(nextProps.loginResponseData.message);
            //this.props.clearLoginRecord();
          }
        }
      }

      getProfileData(){
        this.props.showProfileLoading(true);
          console.log("getprofile data.....................")
        AsyncStorage.getItem("userData").then((value) => {
            if(value) {
                userId = JSON.parse(value)._id;
                console.log("userId..........................", userId)
              

              var profile={
                userId: userId
                
              }
            
              this.props.userProfile(profile);
               
            
          }
        
        }).done();
       
      }

    onEditButtonPress() {
        Actions.pop();
        Actions.EditProfileScreen();
    }
    render() {
        return (

            <View
                style={{ flex: 1, backgroundColor: '#fff', }}>
                <Loader
          loading={this.props.isLoading} />
                <View
                    style={styles.imageContainer}>

                    <Image
                       // style={{ width: 200, height: 50 }}
                        source={AppLogo
                        }></Image>





                </View>

                <View
                    style={{ backgroundColor: '#f1f1fd', paddingBottom: 20 }}>
                    <Text
                        style={styles.inputTextStyle} >
                       {this.state.username}
                                   </Text>
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />

                </View>

                <View
                    style={{ backgroundColor: '#fff' }}>

                    <Text
                        style={{
                            fontSize: 18,
                            paddingStart: 10,
                            paddingEnd: 10,
                            paddingBottom: 5,
                            paddingTop: 10
                        }}>
                        {this.state.email}
                                   </Text>


                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />


                    <Text
                        style={styles.inputTextStyle} >
                        {this.state.phone}
                                   </Text>


                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 1,
                            marginStart: 10,
                            marginEnd: 10
                        }}
                    />



                </View>
                <View
                    style={{
                        flex: 1, backgroundColor: '#fff', justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={styles.buttonContainer}

                    >
                        <Text
                            onPress={this.onEditButtonPress.bind(this)}
                            style={{
                                color: '#14136d',
                                fontWeight: 'bold',
                                fontSize: 16,
                                textAlign: 'center',
                                width: 150,
                                height: 35,
                            }}
                        >EDIT PROFILE</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({



    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 40,
        backgroundColor: '#f1f1fd',
    },

    inputTextStyle: {
        fontSize: 18,
        paddingStart: 10,
        paddingEnd: 10,
        paddingBottom: 5,
        paddingTop: 30
    }
    , buttonContainer: {

        margin: 20,
        marginTop: 30,
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
        marginTop: 30,



    },



});

const mapStateToProps = ({ profile }) => {
    const { profileResponseData, isLoading } = profile;
    
  
    return {
        profileResponseData: profileResponseData,
        isLoading: isLoading
    }
  }
export default connect(mapStateToProps,{userProfile,showProfileLoading})(DriverProfileScreen);