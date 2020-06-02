import {postForm} from './service';

const Model = {
  namespace: 'formpage',
  state: {
    form: {},
    loading: false,
  },
  effects: {
    * post({payload }, { call, put }) {
      console.info("postdata effects list model...");
      const response = yield call(postForm, payload);
      console.info("postdata effects list response model...");
      yield put({
        type: 'queryList',
        payload: Object.keys(response).length > 0 ? response : [],
        pagination: {
          current: payload.current
        }
      });
    },
  },

  reducers: {
    queryList(state, action) {
      console.info("postdata reducers queryList model...");
      return {
        ...state,
        form: action.payload,
        loading: false
      };
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history}){

  //   }
  // }
};

export default Model;
