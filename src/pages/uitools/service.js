import request from '@/utils/request';

export async function queryUIToolsList(params) {
  return request('/uitools/list', {
    params,
  });
}
