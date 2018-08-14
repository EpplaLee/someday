import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { CalendarList, Agenda } from 'react-native-calendars'
import Calendar from '../calendar'
import { Button } from '../components'
import TodoList from '../components/List'

import { createAction, NavigationActions } from '../utils'

@connect(({ app }) => ({ ...app }))
class CalendarPage extends Component {
  static navigationOptions = {
    tabBarLabel: 'Calendar',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }

  render() {
    const { login } = this.props
    return (
      <View style={styles.container}>
        <Calendar
          style={{
            width: '100%',
            height: 320,
          }}
        />
        <TodoList />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    width: 32,
    height: 32,
  },
})

export default CalendarPage
