import React from 'react';
import {Layout, Row, Col} from 'antd';
import './zzFooter.less';
import followPublic from 'Img/followPublic.png';
const {Footer} = Layout;

class ZZFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer className='page-footer'>
                <Row style={{padding: '50px 50px'}}>
                    <Col span={12}>
                        <p>联系我们：商务合作：wuwei@tashan.com</p>
                        <p>用户反馈及帮助：wangtian@tashan.com</p>
                    </Col>
                    <Col span={12}>
                        <img src={followPublic} />
                    </Col>
                </Row>
                <div className='copyright'>
                    ©2014-2018 Created by ZZ
                </div>
            </Footer>
        );
    }
}

export default ZZFooter;
