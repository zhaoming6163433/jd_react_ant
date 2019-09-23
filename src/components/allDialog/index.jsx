import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

class AllDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  }
  render() {
    const {
      title,// title
      width,// 宽度
      children,// 弹出框中间内容
      className,// class
      okText,// 确认按钮文字
      cancelText,// 取消按钮文字
      onOk,// 点击确定回调
      onCancel,// 点击取消回调
      maskClosable // 点击蒙层是否允许关闭
    } = this.props;
    return (
      <Modal
        width={width}
        title={title}
        visible={this.state.visible}
        cancelText={cancelText}
        okText={okText}
        className={className}
        maskClosable={maskClosable}
        onOk={onOk}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        {children}
      </Modal>
    );
  }
}
AllDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  widh: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  className: PropTypes.string,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

AllDialog.defaultProps = {
  className: '',
  maskClosable: true,
  onCancel: () => { },
  onOk: () => { },
  okText: 'OK',
  cancelText: 'Cancel'
};
export default AllDialog;