/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData} from 'react-native';
import SocketIOClient from 'socket.io-client';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}

interface State {
  io?: SocketIOClient.Socket,
  messages: string[],
  serverAddress: string,
  isServerAddressSubmitted: boolean,
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      serverAddress: "",
      isServerAddressSubmitted: false,
      io: undefined,
      messages: []
    }
  }

  render() {
    if (!this.state.isServerAddressSubmitted) {
      return (
        <View style={styles.container}>
          <TextInput value={this.state.serverAddress} placeholder="Server address" onChangeText={this.setServerAddress} onSubmitEditing={this.onSubmitServerAddress} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.mapText()}
      </View>
    );
  }

  onSubmitServerAddress = (event: any) => {
    this.setState((prevState) => {
      const io = SocketIOClient(`http://${this.state.serverAddress}:3000`);
      // const io = SocketIOClient('http://192.168.0.173:3000');
      console.log("on connect " + this.state.serverAddress);
      io.on('connect', () => {
        this.setState((prevState: State) => ({messages: [...prevState.messages, "connected"]}));
      });
      io.on('message', (message: string) => {
        this.setState((prevState: State) => ({messages: [...prevState.messages, message]}));
      });

      return ({io: io, isServerAddressSubmitted: true});
    });
    
  }

  setServerAddress = (address: string) => this.setState({serverAddress: address});

  mapText = () => this.state.messages.map((message: string, i: number) => { 
    return (<Text key={i}>{message}</Text>);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
