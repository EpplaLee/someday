import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect} from 'react-redux'
import { Checkbox } from 'teaset'
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
    const { text } = this.state
    this.props.dispatch(createAction('todo/saveMonthTodo')({text, index}));
    this.setState({
      selectedColomn: null,
      text: '',
    })
  }
  tapCheckBox = (index) => {

  }
  _renderHeader = ({}) => (
    <View style={{ flexDirection: 'row' }}>
      <Icon style={{ marginRight: 5}} name={'list-ol'} size={20} color={'#adb5bd'} />
      <Text style={styles.header}>本月计划</Text>
    </View>
  )
  _renderListItem = ({item, index}) => {
      return <View 
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
      <TouchableOpacity
        style={styles.checkboxWrapper}
        onPress={ (evt) => this.onDoubleTap(index, evt) }
      >
        <Checkbox
          style={{ display: item.text === '双击编辑日程...'? 'none' : 'flex' }}
          checked={item.isDone}
          onPress={() => this.tapCheckBox(index) }
        />
        <Text 
          style={{ 
            color: item.text === '双击编辑日程...'? '#999999' : '#333333',
            marginLeft: item.text === '双击编辑日程...'? 18 : 8,

          }}
        >
          {`${item.text === '双击编辑日程...'? '' : index + 1 + '.'} ${item.text}`}
        </Text>
      </TouchableOpacity>
        :
        null
      }
    </View>
  }

  render() {
    const { monthTodo, curMonth } = this.props;
    console.log(monthTodo, curMonth, 'shit');
    const curMonthTodo = monthTodo[curMonth] || [];
    if(curMonthTodo.length == 0 || curMonthTodo[curMonthTodo.length - 1]['text'] != '双击编辑日程...') {
      curMonthTodo.push({text: '双击编辑日程...'})
    }
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listWrapper}
          data={curMonthTodo.slice()}
          renderItem={this._renderListItem}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  listItem: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },
  inputItem: {
    borderWidth: 0,
    marginLeft: 18,
  }
})

export default TodoList
