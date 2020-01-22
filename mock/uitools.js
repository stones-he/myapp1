// eslint-disable-next-line @typescript-eslint/no-unused-vars
function fakeFetchData(req, res) {
  // eslint-disable-next-line prefer-const
  let datas = {
    'page': {
      'FUNC_ID': '8',
      'FUNC_TITLE': '功能测试',
      'DISPLAY_CSS': '',
      'DISPLAY_JS': '',
      'DISPLAY_PAGE': '',
      'LIKE_TYPE': '',
      'PAGE_MAX': '',
      'TOTAL_PAGE_LIMIT': '',
      'TOTAL_LIMIT': '',
    },
    'fields': [{
      'FIELD_NAME': 'FUNC_ID',
      'DISPLAY_TEXT': '功能号',
      'URL': '',
      'DISPLAY_INDEX': '1',
      'IS_DISPLAY': '1',
      'IS_ORDER': '1',
      'IS_FIND': '1',
      'FETCH_VALUE_TYPE': '',
      'TITLE_URL': '',
      'FIELD_EVENT': '',
      'FIELD_FORMAT': '',
      'IS_EXPAND': '',
      'FIND_TYPE': '0',
      'NUM_TOTAL_DEF': ''
    }, {
      'FIELD_NAME': 'FIELD_NAME',
      'DISPLAY_TEXT': '字段显示文字',
      'URL': '',
      'DISPLAY_INDEX': '2',
      'IS_DISPLAY': '1',
      'IS_ORDER': '1',
      'IS_FIND': '1',
      'FETCH_VALUE_TYPE': '',
      'TITLE_URL': '',
      'FIELD_EVENT': '',
      'FIELD_FORMAT': '',
      'IS_EXPAND': '',
      'FIND_TYPE': '3',
      'NUM_TOTAL_DEF': '',
      'searchValue': [{
        'text': 'field1',
        'value': 'value1'
      }, {
        'text': 'field2',
        'value': 'value2'
      }, {
        'text': 'field3',
        'value': 'value3'
      }]
    }, {
      'FIELD_NAME': 'FIELD_NAME_M',
      'DISPLAY_TEXT': '字段显示文字(多)',
      'URL': '',
      'DISPLAY_INDEX': '2',
      'IS_DISPLAY': '1',
      'IS_ORDER': '1',
      'IS_FIND': '1',
      'FETCH_VALUE_TYPE': '',
      'TITLE_URL': '',
      'FIELD_EVENT': '',
      'FIELD_FORMAT': '',
      'IS_EXPAND': '',
      'FIND_TYPE': '7',
      'NUM_TOTAL_DEF': '',
      'searchValue': [{
        'text': 'xxxxxxxxfield1',
        'value': 'value1'
      }, {
        'text': 'yyyyyyyyyfield2',
        'value': 'value2'
      }, {
        'text': 'field3',
        'value': 'value3'
      }]
    }, {
      'FIELD_NAME': 'DISPLAY_INDEX',
      'DISPLAY_TEXT': '显示顺序',
      'URL': '',
      'DISPLAY_INDEX': '2',
      'IS_DISPLAY': '1',
      'IS_ORDER': '1',
      'IS_FIND': '1',
      'FETCH_VALUE_TYPE': '',
      'TITLE_URL': '',
      'FIELD_EVENT': '',
      'FIELD_FORMAT': '',
      'IS_EXPAND': '',
      'FIND_TYPE': '0',
      'NUM_TOTAL_DEF': ''
    }, {
      'FIELD_NAME': '_oper_',
      'DISPLAY_TEXT': '添加;修改;删除',
      'URL': 'test.do;test.do?func_id=$func_id$&f_i=#func_id#&is_find=#is_find#',
      'DISPLAY_INDEX': '1',
      'IS_DISPLAY': '1',
      'IS_ORDER': '1',
      'IS_FIND': '1',
      'FETCH_VALUE_TYPE': '',
      'TITLE_URL': '',
      'FIELD_EVENT': '',
      'FIELD_FORMAT': '',
      'IS_EXPAND': '',
      'FIND_TYPE': '0',
      'NUM_TOTAL_DEF': ''
    }],
    'data': [
      //   {
      //   'FUNC_ID': '1008',
      //   'FIELD_NAME': '客户信息A',
      //   'DISPLAY_INDEX': '1',
      //   'IS_FIND': '1',
      // }, {
      //   'FUNC_ID': '1009',
      //   'FIELD_NAME': '客户信息B',
      //   'DISPLAY_INDEX': '2',
      //   'IS_FIND': '2',
      // }, {
      //   'FUNC_ID': '1010',
      //   'FIELD_NAME': '客户信息C',
      //   'DISPLAY_INDEX': '3',
      //   'IS_FIND': '3',
      // }, 
    ]
  };
  console.log(req.query);
  const reqParam = req.query;
  const currpage = reqParam.current || 1;
  const total = reqParam.total || 200;
  const size = reqParam.pageSize || 10;
  let max = (currpage * size)
  if (max > total) {
    max = total;
  }
  let start = ((currpage - 1) * size);
  // eslint-disable-next-line no-cond-assign
  if (start === 0) {
    start = 1;
  } else {
    start += 1;
  }

  for (let i = start; i <= max; i++) {
    datas.data.push({
      'FUNC_ID': 10000 + i,
      'FIELD_NAME': (`客户信息A-${ i}`),
      'DISPLAY_INDEX': i,
      'IS_FIND': '1',
      // 'children': [{
      //   'FUNC_ID': 11000 + i,
      //   'FIELD_NAME': (`Sub-客户信息A-${i}`),
      //   'DISPLAY_INDEX': i,
      //   'IS_FIND': '1',
      // }]
    });
  }
  // console.log(datas);
  return res.json(datas);
};


export default {
  'GET /uitools/list': fakeFetchData,
  // 'GET /uitoolsList': fakeData,
  '/uitools/oper': {}
};
