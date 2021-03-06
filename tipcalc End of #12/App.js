import Expo from 'expo';
import React from 'react';
import {
  Button,
  TextInput,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';

import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
} from 'native-base';

import Hello from './Hello';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: '',
      tip: 0.2,
      isReady: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });

    this.setState({ isReady: true });
  }

  updateCustomTip(customTip) {
    // if (Platform.OS === 'android') {

    // }
    // if (Platform.OS === 'ios') {

    // }

    if (customTip) {
      this.setState({
        tip: parseFloat(customTip) / 100,
      });
    } else {
      this.setState({ tip: 0 });
    }
  }

  render() {
    let tip = 0.00;
    if (this.state.inputValue) {
      tip = parseFloat(this.state.inputValue) * this.state.tip;
      tip = (Math.round(tip * 100) / 100).toFixed(2);
    }


    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
        <View style={styles.header}>
          <Header>
            <Left />
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>
        </View>
        <Content padder>
          <View style={styles.container}>
            {/* <Hello />*/}
            <Text>
              ${tip}
            </Text>
            <TextInput
              value={this.state.inputValue}
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.00"
              onChangeText={text => this.setState({ inputValue: text })}
            />
            <View style={styles.buttonGroup}>
              <Button
                title="10%"
                onPress={() => this.setState({ tip: 0.1 })}
              />
              <Button
                title="20%"
                onPress={() => this.setState({ tip: 0.2 })}
              />
              <Button
                title="25%"
                onPress={() => this.setState({ tip: 0.25 })}
              />
              <TextInput
                value={(this.state.tip * 100).toString()}
                style={styles.customTip}
                keyboardType="numeric"
                placeholder="20%"
                onChangeText={customTip => this.updateCustomTip(customTip)}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  customTip: {
    height: 30,
    width: 60,
    borderColor: '#333',
    borderWidth: 1,
    padding: 5,
  },
});
