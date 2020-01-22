import { connect } from 'dva';
import { Table, Divider, Input, Button, Icon } from 'antd';
import React, { Component } from 'react';
// import Highlighter from 'react-highlight-words';

const Action = `_oper_`;
const OpenSelect = '3';
const OpenMultiSelect = '7';
function* entries(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key of Object.keys(obj)) {
    yield key;
  }
}
/**
 * 获取对象属性值，忽略key的大小，找不到返回defaultval
 * @param {*} props 
 * @param {*} key 
 * @param {*} defaultVal 
 */
const getValueIg = (props, key, defaultVal) => {
  if (props) {
    // eslint-disable-next-line no-restricted-syntax
    for (const k of entries(props)) {
      if (k.toLowerCase() === key.toLowerCase()) {
        return props[k];
      }
    }
  }
  return defaultVal;
}
// const getValue = (props, key, defaultVal) => {
//   if (props) {
//     return props[key.toLowerCase()];
//   }
//   return defaultVal;
// }
/**
 * 对url中的参数进行格式化处理，#xxxx# 表示从当前数据记录取值，$xxxx$ 表示从当前req对象取值
 * @param {*} url 
 * @param {*} record 当前数据记录对
 * @param {*} req 当前request.params对象
 */
const formatUrl = (url, record, req) => {
  const REC_FIELD = /#(\w+)#/ig;
  const REQ_FIELD = /\$(\w+)\$/ig;
  url = url.replace(REC_FIELD, ($1, $2) => { return getValueIg(record, $2, ""); });
  url = url.replace(REQ_FIELD, ($1, $2) => { return req[$2] || "" })
  return url;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  // this.setState({
  //   searchText: selectedKeys[0],
  //   searchedColumn: dataIndex,
  // });
};

const handleReset = clearFilters => {
  clearFilters();
  // this.setState({ searchText: '' });
};
/**
 * 
 * @param {*} dataIndex 
 */
const getColumnSearchProps = (dataIndex, title) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        // ref={node => {
        // this.searchInput = node;
        // }}
        placeholder={`Search ${title}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: filtered => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  // onFilter: (value, record) =>
  //   record[dataIndex]
  //     .toString()
  //     .toLowerCase()
  //     .includes(value.toLowerCase()),
  // onFilterDropdownVisibleChange: visible => {
  //   if (visible) {
  // setTimeout(() => searchInput.select());
  // }
  // },
  // render: text =>
  // this.state.searchedColumn === dataIndex ? (
  //   <Highlighter
  //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
  //     searchWords={[this.state.searchText]}
  //     autoEscape
  //     textToHighlight={text.toString()}
  //   />
  // ) :
  // (
  //   text
  // ),
});

/**
 * 转换后台数据到antd table组件的数据结构
 * @param {*} fields 
 */
const convert = (fields = [], reqParams = {}) => {
  if (Array.isArray(fields) === false) {
    fields = [];
  }
  return fields/* .filter(field => {
    return field.FIELD_NAME !== Action;
  }) */.map(field => {
    let column = {};
    column.title = field.DISPLAY_TEXT;
    column.dataIndex = field.FIELD_NAME;
    column.key = field.FIELD_NAME;
    // column.render = text => <a>{text}</a>;
    if (field.IS_FIND === '1' && field.FIELD_NAME !== Action) {
      column.findType = field.FIND_TYPE;
      switch (field.FIND_TYPE) {
        case OpenSelect:
          // column.filters = [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }];
          column.filters = field.searchValue;
          column.filterMultiple = false;
          break;
        case OpenMultiSelect:
          column.filters = field.searchValue;
          column.filterMultiple = true;
          break;
        default:
          column = Object.assign(column, getColumnSearchProps(column.dataIndex, column.title));
      }
    }
    column.sorter = field.IS_ORDER === '1';
    // field.FIND_TYPE

    //
    if (field.FIELD_NAME === Action) {

      const titles = field.DISPLAY_TEXT.split(";");
      const urls = field.URL.split(";");
      column.title = titles[0];
      column.key = 'action';
      column.sorter = false;
      column.render = (_, record) => {
        const acts = urls => urls.map((url, index) => {
          return (<span><a href={formatUrl(url, record, reqParams)}>{titles[index + 1]}</a><Divider type="vertical" /></span>)
        });

        return (
          <span>
            {acts(urls)}
          </span>
        )
      };
    }
    return column;
  });
};




/**
 * 
 */
class UIToolsListForm extends Component {

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };


  componentDidMount() {
    console.info("uitool componentDidMount table...");
    const { dispatch, pagination, location } = this.props;
    dispatch({
      type: 'uitools/list',
      payload: {
        ...location.query,
        ...pagination,
      },
    });
  };

  // eslint-disable-next-line react/sort-comp
  componentDidCatch({ errorInfo }) {
    console.log("errorInfo=", errorInfo);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleTableChange = (pagination, filters, sorter, extra) => {
    console.info("uitool handleTableChange table...");
    console.log(extra);
    const { dispatch, location, columns } = this.props;
    const searchOpers = [];
    const newFilters = Object.entries(filters).filter(([, value]) => value.length > 0
      // eslint-disable-next-line no-return-assign
    ).reduce((newFilters, [key, value]) => (newFilters[key] = value, newFilters), {});
    filters = newFilters;
    columns.forEach(column => {
      if (Object.keys(filters).includes(column.dataIndex)) {
        searchOpers.push(column.findType);
      }
    });

    dispatch({
      type: 'uitools/list',
      payload: {
        ...location.query,
        ...pagination,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
        searchField: Object.keys(filters),
        searchOper: searchOpers,
      },
    });
  };

  onExpand = (expanded, record) => {
    console.log(expanded, record);
  };

  render() {
    const { page, data, pagination, columns, loading } = this.props;
    // eslint-disable-next-line prefer-const
    //
    // console.log("===========", data);
    console.info("uitool reander table...");
    return (
      <Table columns={columns} dataSource={data} bordered
        title={() => getValueIg(page, "FUNC_TITLE", "")}
        rowKey={record => record.FUNC_ID}
        pagination={pagination}
        onExpand={this.onExpand}
        expandRowByClick
        // pagination={false}
        // scroll={{ y: 240 }}
        rowSelection={this.rowSelection}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

// export default Form.create()(UIToolsListForm);
// const WarpForm = Form.create({
// onValuesChange(props, changedFields) {
//   // 表单项变化时请求数据
//   // 模拟查询表单生效
//   const { dispatch } = props;
//   dispatch({
//     type: 'uitools/list',
//     payload: {
//       count: 8,
//       ...changedFields,
//     },
//   });
// },
// })(UIToolsListForm);

function mapStateToProps({ uitools, loading }, action) {
  console.info("uitool mapStateToProps table...");
  // console.log("mapto=", uitools);
  const { list: { data = [], fields = [], page = {} }, pagination } = uitools;
  const { location } = action;
  const columns = convert(fields, location.query);
  return {
    loading: loading.models.uitools,
    data,
    pagination,
    columns,
    page,
  };
}

// export default connect(({ uitools, loading }) => ({
//   uitools,
//   // loading: loading.models.uitools,
// }))(UIToolsListForm);
export default connect(mapStateToProps)(UIToolsListForm);