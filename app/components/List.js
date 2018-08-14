import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux'

import { Button, Touchable } from "."

import { createAction, NavigationActions } from '../utils'

@connect(({ todo }) => ({ ...todo }))
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColomn: null,
      lastPress: 0,
      text: '',
    }
  }
  componentWillMount() {
  }
  onDoubleTap = (index, evt) => {

    let delta = evt.timeStamp - this.state.lastPress;
    if(delta < 300) {
      this.setState({
        selectedColomn: index
      })
    }
    this.setState({
      lastPress: evt.timeStamp
    })
  }
  savePlan = (index, e) => {
    console.log('saveplan')
    const { text } = this.state
    this.props.dispatch(createAction('todo/saveMonthTodo')({text, index}));
    this.setState({
      selectedColomn: null,
      text: '',
    })
  }
  _renderHeader = ({}) => (
    <View key='listheader'>
      <Text style={styles.header}>本月计划</Text>
    </View>
  )
  _renderListItem = ({item, index}) => {
      return <TouchableOpacity 
        onPress={ (evt) => this.onDoubleTap(index, evt) }
        style={styles.listItem}
        key={index}
      >
      {this.state.selectedColomn == index?
        <TextInput
          autoFocus={true}
          style={styles.inputItem}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onBlur={() => this.savePlan(index) }
          onSubmitEditing={() => this.savePlan(index) }
        />
        :
        null
      }
      {this.state.selectedColomn != index?
        <Text style={{fontWeight: '200'}}>{`${index + 1}. ${item}`}</Text>
        :
        null
      }
    </TouchableOpacity>
  }

  render() {
    const { monthTodo } = this.props
    console.log(monthTodo)
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listWrapper}
          data={monthTodo.slice()}
          renderItem={this._renderListItem}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  header: {
    fontSize: 20,
    color: '#333333',
  },
  listWrapper: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  listItem: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  inputItem: {
    borderWidth: 0,
  }
})

export default TodoList
