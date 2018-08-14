import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'todo',
  state: {
    monthTodo: ['双击编辑日程...']
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
    *saveMonthTodo({text, index}, { call, put, select }) {
      console.log('saveMonthTodo1', monthTodo)
      const { monthTodo = [] } = yield select(state => state.todo)
      console.log('saveMonthTodo2', monthTodo)
      monthTodo[index] = text
      if(index == monthTodo.length - 1) {
        monthTodo.push('双击编辑日程...');
      }
      console.log('saveMonthTodo3', monthTodo)
      yield put({ type: 'save', monthTodo: monthTodo.slice() })
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
