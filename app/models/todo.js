import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'todo',
  state: {
    monthTodo: [{text: '双击编辑日程...', isDone: false}],
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
    *saveMonthTodo({text, index}, { call, put, select }) {
      const { monthTodo = [{text: '双击编辑日程...', isDone: false}] } = yield select(state => state.todo);
      monthTodo[index] = {text, isDone: false};
      if(index == monthTodo.length - 1) {
        monthTodo.push({text: '双击编辑日程...', isDone: false});
      }
      yield put({ type: 'save', monthTodo: monthTodo.slice() });
    },
    *toggleMonthTodo({index}, { call, put, select}) {
      const { monthTodo = [{text: '双击编辑日程...', isDone: false}] } = yield select(state => state.todo);
      monthTodo[index]['isDone'] = !monthTodo[index]['isDone'];
      yield put({ type: 'save', monthTodo: monthTodo.slice() });
    }
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
