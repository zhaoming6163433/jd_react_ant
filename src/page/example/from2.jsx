import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import { connect } from 'react-redux';
class demoFrom2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 4
                },
                sm: {
                    span: 4
                },
            },
            wrapperCol: {
                xs: {
                    span: 20
                },
                sm: {
                    span: 20
                },
            },
        };
        return (
            <div className="from">
                <Form {...formItemLayout}>
                    <Form.Item label="name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入name!', }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入email!', }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Select" hasFeedback>
                        {getFieldDecorator('select', {
                            rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                            <Select placeholder="Please select a country">
                                <Option value="china">China</Option>
                                <Option value="usa">U.S.A</Option>
                            </Select>,
                        )}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const demoFromCt2 = Form.create()(demoFrom2);
export default connect((state) => {
    return { ...state };
})(demoFromCt2);