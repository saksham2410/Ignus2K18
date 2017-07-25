import React from 'react';
import {
  View,
  Text,
  StyleSheet,
	TextInput,
	TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import Login from './login1';

export default class Login1 extends React.Component {
	constructor(props){
		super(props);
		this.state={
			scrollEnabled:false,
      login : "",
      password : "",
      isDisable : false,
      showLoading : false,
      errorText: "",
		}
	}
  componentWillMount() {
        let me = this;
    }
    _doLogin()
    {
        if(this.state.login === "")
        {
            this.setState({errorText: "missinglogin"});
        }
        if(this.state.password === "")
        {
            this.setState({errorText: "missingpassword"});
        }
        if(this.state.login != "" && this.state.password != "")
        {
            this.setState({
                isDisable : true,
                showLoading : true
            });
            let successFunc = function()
            {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                    NavigationActions.navigate({ routeName: 'Schedule'})
                    ]
                    })
                this.props.navigation.dispatch(resetAction)


            }
            let errorFunc = function(status)
            {
                console.log("error")
                this.setState({
                    isDisable : false,
                    showLoading : false,
                    errorText : error
                });
            }
            Login.doLogin(this.state.login,this.state.password,successFunc.bind(this),errorFunc.bind(this));
        }
    }
    _renderButtonText()
    {
        if(this.state.showLoading)
        {
            return(
                 <View >
                    <ActivityIndicator size="small" />
                </View>
                )
        }
        else
            return(
                <Text>
                    YOYOYOYO!!!!!!!!!
                </Text>
                )
    }
  render() {
    return (
			<View style={styles.container}>
				<TextInput style={styles.input} placeholder="Your IG number" placeholderTextColor="rgba(255,255,255,0.5)" onChangeText={(login) => this.setState({login})}/>
				<TextInput style={styles.input} placeholder="Your E-mail ID" placeholderTextColor="rgba(255,255,255,0.5)" onChangeText={(password) => this.setState({password})}/>

				<TouchableOpacity style={styles.buttonContainer} onPress={() => this._doLogin()}

                                                  disabled={this.state.isDisable}>
                                                  {this._renderButtonText()}
				</TouchableOpacity>
			</View>

    );
  }


}

const styles = StyleSheet.create({
	buttonContainer: {
		backgroundColor: 'rgba(250,250,250,0.6)',
		paddingVertical: 10,
	},
	buttonText:{
		textAlign: 'center',
		color: '#FFFFFF'
	},

  container: {
    padding: 20,
		marginBottom: '20%',
  },
	input: {
				height: 40,
				backgroundColor: 'rgba(255,255,255,0.2)',
				color: '#FFF',
				paddingHorizontal: 10,
				marginBottom: 10,
	},


});
