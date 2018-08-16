import { createAction, NavigationActions, Storage } from '../utils'
import { AsyncStorage } from 'react-native'
import * as authService from '../services/auth'

export default {
  namespace: 'month',
  state: {
    monthTodo: {
      '2018-7': [{text: 'shit', isDone: true}]
    },
    curMonth: `${new Date().getFullYear()}-${new Date().getMonth()}`
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
    *loadStorage({}, {put}) {
      const monthTodo = yield AsyncStorage.getItem('monthTodo');
      if(monthTodo) {
        yield put({ type: 'save', monthTodo: JSON.parse(monthTodo) });
      }
    },
    *saveMonthTodo({text, index}, { call, put, select }) {
      const { monthTodo = {}, curMonth  } = yield select(state => state.todo);

      if(monthTodo[curMonth] && monthTodo[curMonth].length - 1 < index) {
        monthTodo[curMonth][index] = { text, isDone: false }
      } else if(monthTodo[curMonth]) {
        monthTodo[curMonth][index] = {
          text,
          isDone: monthTodo[curMonth][index]['isDone']? true : false,
        }
      } else {
        monthTodo[curMonth] = [{text, isDone: false}];
      }

      yield put({ 
        type: 'save', 
        monthTodo: Object.assign({}, monthTodo),
      });
      AsyncStorage.setItem('monthTodo', JSON.stringify(monthTodo))
    },
    *toggleMonthTodo({index}, { call, put, select}) {
      const { monthTodo, curMonth } = yield select(state => state.todo);
      monthTodo[curMonth][index]['isDone'] = !monthTodo[curMonth][index]['isDone'];
      console.log('toggleMonthTodo', monthTodo)
      yield put({ type: 'save', monthTodo: Object.assign({}, monthTodo) });
      AsyncStorage.setItem('monthTodo', JSON.stringify(monthTodo))
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
