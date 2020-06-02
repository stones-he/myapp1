import request from '@/utils/request';

export async function postForm(params) {
  return request('/form/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'text/plain;charset=UTF-8',
    },
    body: JSON.stringify(params),
    // body: {'param':JSON.stringify(params)},
  });
}
