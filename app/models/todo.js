import { createAction, NavigationActions, Storage } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'todo',
  state: {
    todolist: [],
  },
  reducers: {
    save(state, props) {
      return { ...state, ...props };
    },
  },
  effects: {
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'loadStorage' })
    },
  },
}
