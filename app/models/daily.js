import { createAction, NavigationActions, Storage } from '../utils'
import { AsyncStorage } from 'react-native'
import * as authService from '../services/auth'
import XDate from 'xdate'

export default {
  namespace: 'daily',
  state: {
    dailyTodo: {},
    curday: new XDate().toString('yyyy-MM-dd')
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
    *loadStorage({}, {put}) {
      const dailyTodo = yield AsyncStorage.getItem('dailyTodo');
      if(dailyTodo) {
        yield put({ type: 'save', monthTodo: JSON.parse(dailyTodo) });
      }
    },
    *saveDailyTodo({text, index}, { call, put, select }) {
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
