import React, {Component} from 'react';
import {View, StyleSheet, BackHandler,
        Platform, Picker, 
        ActivityIndicator, Button, Alert} from 'react-native';


export default class ChooseApp extends React.Component {

        
    constructor(props){
     
       super(props);
       this.state = { 
       isLoading: true,
       PickerValueHolder : ''
      }
     }
	
    componentDidMount() {

        return fetch('http://7cf324aa.ngrok.io/get/apps')
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson
            }, function() {
                // In this block you can do something with new state.
            });
            })
            .catch((error) => {
            console.error(error);
            });
    }

    GetPickerSelectedItemValue=()=>{

        Alert.alert(this.state.PickerValueHolder);
    
        }
        
    render() {

        if (this.state.isLoading) {
            return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
            </View>
            );
        }
        
        return (
        
            <View style={styles.MainContainer}>
                <View style={{flex: 1}}>
                    <Picker
                        selectedValue={this.state.PickerValueHolder}
            
                        onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            
                        { this.state.dataSource.map((item, key)=>(
                        <Picker.Item label={item.appName} value={item.appName} key={key} />)
                        )}
                
                    </Picker>
                </View>
                <View style={{flex: 1}}>
                    <Button title="Choose App " onPress={ this.GetPickerSelectedItemValue } />
                </View>
          
            </View>
        );
    }

}


const styles = StyleSheet.create({
 
    MainContainer: {
        justifyContent: 'center',
        flex:1,
        margin: 10,
        height: '20%'
    }
     
    });