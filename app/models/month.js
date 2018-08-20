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
      const monthTodo_str = yield AsyncStorage.getItem('monthTodo');
      const monthTodo = JSON.parse(monthTodo_str);
      const curMonth = new XDate().toString('yyyy-MM');
      if(monthTodo) {
        yield put({ type: 'save', monthTodo: monthTodo });
        console.log('loadStorage', monthTodo[curMonth])
        yield put({ type: 'todo/save', todolist: monthTodo[curMonth] || [] });
      }
    },
    *saveMonthTodo({text, index}, { call, put, select }) {
      const { monthTodo = {}, curMonth  } = yield select(state => state.month);
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
      yield put({
        type: 'todo/save',
        todolist: (monthTodo[curMonth] || []).slice()
      })
      AsyncStorage.setItem('monthTodo', JSON.stringify(monthTodo))
    },
    *toggleMonthTodo({index}, { call, put, select }) {
      const { monthTodo, curMonth } = yield select(state => state.month);
      monthTodo[curMonth][index]['isDone'] = !monthTodo[curMonth][index]['isDone'];
      console.log('toggleMonthTodo', monthTodo)
      yield put({ type: 'save', monthTodo: Object.assign({}, monthTodo) });
      yield put({ type: 'todo/save', todolist: (monthTodo[curMonth] || []).slice() })
      AsyncStorage.setItem('monthTodo', JSON.stringify(monthTodo))
    },
    *changeMonth({curMonth}, {put, select}) {
      const { monthTodo } = yield select(state => state.month)
      yield put({ type: 'save', curMonth});
      yield put({ type: 'daily/save', curday: null});
      yield put({ type: 'todo/save', todolist: monthTodo[curMonth]});
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
