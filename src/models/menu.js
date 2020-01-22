// import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
// import { setAuthority } from '@/utils/authority';
// import { reloadAuthorized } from '@/utils/Authorized';
// import { getPageQuery } from '@/utils/utils';
import { getMenuData } from '@/services/menu';

const Model = {
  namespace: 'menu',
  state: {
    menuData: [],
  },
  effects: {
    *fetchMenuData(/* { payload, callback }, */_, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'saveReducer',
        payload: response.menuData,
      });
    },
  },

  reducers: {
    saveReducer(state, { payload }) {
      return {
        ...state,
        menuData: payload || [],
      };
    },
  },
};
export default Model;