/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {v4} from 'uuid';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	TouchableOpacity
} from 'react-native';

var Realm = require('realm');
class Car {}
Car.schema = {
	name: 'Car',
	primaryKey: 'id',
	properties: {
		id: 'string',
		make:  'string',
		model: 'string',
		miles: 'int',
	}
};
class Person {}
Person.schema = {
	name: 'Person',
	primaryKey: 'id',
	properties: {
		id:    {type: 'string'},
		name:    {type: 'string'},
		cars:    {type: 'list', objectType: 'Car'},
		picture: {type: 'data', optional: true}, // optional property
		birthday: {type: 'date'}
	}
};
console.log(Realm.defaultPath);
export default class realmAgain extends Component {
  render() {

    this.realm = new Realm({
       schema: [Car, Person]
    });

    let personId = v4();
	  let cars = [{id: v4(), make: 'Audi', model: 'Q4', miles: 100000}, {id: v4(), make: 'Audi', model: 'Q4', miles: 100000}]
	  this.realm.write(() => {
		  this.realm.create('Person', {id: personId, name: 'John', cars: cars, birthday: new Date()})
	  })

    return (
      <View style={styles.container}>
		  <TouchableOpacity onPress={() => {
		  	let person = this.realm.objectForPrimaryKey('Person', personId);
			  this.realm.write(() => {
					this.realm.create('Person', person, true);
			  })
		  }}>
			  <Text>Update Person</Text>
		  </TouchableOpacity>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('realmAgain', () => realmAgain);
