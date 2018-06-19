import React from 'react';
import { Layout } from 'antd';
import './zzFooter.less';

const { Footer } = Layout;

class ZZFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        高铁后勤保障服务中心 ©2018 Created by ZZ
      </Footer>
    );
  }
}

export default ZZFooter;
