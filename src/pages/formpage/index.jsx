/* eslint-disable @typescript-eslint/no-unused-vars */
import { connect } from 'dva';
import { Form, Input, Button, Checkbox, Upload, Icon } from 'antd';
import React, { Component } from 'react';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

@Form.create()
class DynamicRule extends Component {
  state = {
    checkNick: false,
  };

  componentDidMount() {
    console.info("formpost componentDidMount...,{}", this.props);
  };

  check = e => {
    // 阻止事件传递
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.info('success');
        const { dispatch } = this.props;
        dispatch({
          type: 'formpage/post',
          payload: {
            ...values
          },
        });
      }
    });
  };

  handleChange = e => {
    this.setState(
      {
        checkNick: e.target.checked,
      },
      () => {
        this.props.form.validateFields(['nickname'], { force: true });
      },
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form>
          <Form.Item {...formItemLayout} label="Name">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your name',
                },
              ],
            })(<Input placeholder="Please input your name" />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="Nickname">
            {getFieldDecorator('nickname', {
              rules: [
                {
                  required: this.state.checkNick,
                  message: 'Please input your nickname',
                },
              ],
            })(<Input placeholder="Please input your nickname" />)}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Checkbox checked={this.state.checkNick} onChange={this.handleChange}>
              Nickname is required
          </Checkbox>
          </Form.Item>
          <Form.Item label="Upload" extra="long" {...formTailLayout}>
            {getFieldDecorator('upload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>,
            )}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button type="primary" onClick={(() => this.check.bind(this))()}>
              Check
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.info("formdata mapStateToProps table...");
  // console.log("mapto=", uitools);
  // const { form } = formpage;
  // const { location } = action;
  // const columns = convert(fields, location.query);
  const {
    checkBranches
  } = state.formpage
  return {
    // loading: loading.models.formpage,
    // form: formpage,
    checkBranches
  };
}

export default connect()(DynamicRule);

// const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);
// ReactDOM.render(<WrappedDynamicRule />, mountNode);