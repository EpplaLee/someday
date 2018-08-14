import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { Button } from '../components'
import { NavigationActions } from '../utils'

@connect()
class CalendarListPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'CalendarList',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
  }

  render() {
    return (
      <View style={styles.container}>
        <CalendarList />
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
  icon: {
    width: 32,
    height: 32,
  },
})

export default CalendarListPage
