import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Button } from '../components'

import { NavigationActions } from '../utils'

@connect()
class AgendaPage extends Component {
  static navigationOptions = {
    title: 'Agenda',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/close.png')}
      />
    ),
  }


  render() {
    return (
      <View style={styles.container}>
        <Agenda style={{
          width: '100%',
          height: '100%',
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AgendaPage
