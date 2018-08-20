import { createAction, NavigationActions, Storage } from '../utils'
import { AsyncStorage } from 'react-native'
import * as authService from '../services/auth'
import XDate from 'xdate'

export default {
  namespace: 'daily',
  state: {
    dailyTodo: {

    },
    curday: null,
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
    *loadStorage({}, {put}) {
      const dailyTodo = yield AsyncStorage.getItem('dailyTodo');
      yield put({ type: 'save', dailyTodo: JSON.parse(dailyTodo) });
    },
    *saveTheDay({today}, {put, select}) {
      const { curday, dailyTodo } = yield select(state => state.daily);
      const { monthTodo = {}, curMonth  } = yield select(state => state.month);
      console.log('dailyTodo', today, dailyTodo);
      if(!dailyTodo[curMonth]) {
        dailyTodo[curMonth] = {}
      }
      if(!dailyTodo[curMonth][today]) {
        dailyTodo[curMonth][today] = []
      }
      yield put({ type: 'save', dailyTodo:  Object.assign({}, dailyTodo) });

      if(today === curday) {
        yield put({ type: 'save', curday: null });
        yield put({ type: 'todo/save', todolist: (monthTodo[curMonth] || []).slice() })
      } else {
        yield put({ type: 'save', curday: today });
        yield put({ type: 'todo/save', todolist: dailyTodo[curMonth][today].slice() });
      }
    },
    *saveDailyTodo({ text, index }, { call, put, select }) {
      const { curday, dailyTodo } = yield select(state => state.daily);
      const { curMonth } = yield select(state => state.month);
      console.log('saveDailyTodo', curMonth, curday, dailyTodo)
      if(dailyTodo[curMonth][curday] && dailyTodo[curMonth][curday].length - 1 < index) {
        dailyTodo[curMonth][curday][index] = { text, isDone: false }
      } else if(dailyTodo[curMonth][curday]) {
        dailyTodo[curMonth][curday][index] = {
          text,
          isDone: dailyTodo[curMonth][curday][index]['isDone']? true : false,
        }
      } else {
        dailyTodo[curMonth][curday] = [{text, isDone: false}];
      }

      yield put({ 
        type: 'save', 
        dailyTodo: Object.assign({}, dailyTodo),
      });
      yield put({
        type: 'todo/save',
        todolist: (dailyTodo[curMonth][curday] || []).slice()
      })
      AsyncStorage.setItem('dailyTodo', JSON.stringify(dailyTodo))
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
