import { createAction, NavigationActions, Storage } from '../utils'
import { AsyncStorage } from 'react-native'
import * as authService from '../services/auth'
import XDate from 'xdate'

export default {
  namespace: 'month',
  state: {
    monthTodo: {
      '2018-08': [{text: 'shit', isDone: true}],
    },
    curMonth: new XDate().toString('yyyy-MM'),
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
      const { monthTodo = {}, curMonth  } = yield select(state => state.month);
      console.log('curMonth', curMonth, monthTodo)
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
      const { monthTodo, curMonth } = yield select(state => state.month);
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
