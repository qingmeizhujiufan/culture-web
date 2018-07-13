import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Input, Icon, Tabs, Avatar, Breadcrumb, Badge, notification, Spin, message, Button} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import defaultUser from 'Img/default-user.jpg';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'news/queryList';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
    }

    render() {

        return (
            <div className='page-contractus' style={{padding: '50px 0 30px'}}>
                <div className="page-content">
                    <div className='content'>
                        <Row>
                            <Col span={7}>
                                <div style={{
                                    padding: 42,
                                    border: '1px solid #DFDDDA',
                                    color: '#170202',
                                    backgroundColor: 'rgba(247,246,242,1)'
                                }}>
                                    <h1>联系我们</h1>
                                    <p>商务合作：</p>
                                    <p>wuwei@tashan.com</p>
                                    <p>用户反馈及帮助：</p>
                                    <p>wangtian@tashan.com</p>
                                    <p>公司地址</p>
                                    <p>武汉市洪山区 他山书院黄兴路120号 邮编：050070 </p>
                                </div>
                            </Col>
                            <Col span={17}>

                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;