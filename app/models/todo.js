import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'todo',
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
    *saveMonthTodo({text, index}, { call, put, select }) {
      const { monthTodo = {}, curMonth  } = yield select(state => state.todo);
      if(monthTodo[curMonth]) {
        monthTodo[curMonth][index]['text'] = text;
        monthTodo[curMonth][index]['isDone'] = monthTodo[curMonth][index]['isDone'] || false;
      } else {
        monthTodo[curMonth] = [{text, isDone: false}];
      }
      yield put({ type: 'save', monthTodo: monthTodo.slice() });
    },
    *toggleMonthTodo({index}, { call, put, select}) {
      const { monthTodo, curMonth } = yield select(state => state.todo);
      monthTodo[curMonth][index]['isDone'] = !monthTodo[curMonth][index]['isDone'];
      yield put({ type: 'save', monthTodo: Object.assign({}, ...monthTodo) });
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
