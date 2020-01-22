import { queryUIToolsList } from './service';

const Model = {
  namespace: 'uitools',
  state: {
    list: [],
    pagination: {total: 200,current:1,pageSize: 10},
    loading: false,
  },
  effects: {
    *list({ payload }, { call, put }) {
      console.info("uitool effects list model...");
      const response = yield call(queryUIToolsList, payload);
      console.info("uitool effects list response model...");
      yield put({
        type: 'queryList',
        payload: Object.keys(response).length >0 ? response : [],
        pagination:{ current:payload.current}
      });
    },
  },
  
  reducers: {
    queryList(state, action) {
      console.info("uitool reducers queryList model...");
      return { ...state, list: action.payload, loading: false, pagination: {...state.pagination,...action.pagination}};
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history}){

  //   }
  // }
};

export default Model;
