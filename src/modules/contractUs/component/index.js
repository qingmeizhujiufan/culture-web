import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Row, Col, Input, Icon, Tabs, Avatar, Breadcrumb, Badge, notification, Spin, message, Button} from 'antd';
import {Map} from 'react-amap';
import Marker from 'react-amap/lib/marker';
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
        const markerEvents = {
            created: (ins) => {console.log(ins)},
            click: e => {
                const lnglat = e.lnglat;
                let url = `https://uri.amap.com/marker?position=${lnglat.lng},${lnglat.lat}`;
                window.open(url);
            }
        }

        return (
            <div className='page-contractus'>
                <div className="page-content">
                    <div className='content wrap-box'>
                        <Row type='flex' justify="space-around" align="middle">
                            <Col span={7}>
                                <div style={{
                                    height: 400,
                                    padding: 42,
                                    color: '#170202',
                                    backgroundColor: '#F7F6F2'
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
                                <div style={{height: 400}}>
                                    <Map
                                        amapkey='540e9b2c0349b6a56b5c74d021aa28e5'
                                        zoom={12}
                                        plugins={['ToolBar']}
                                        center={{longitude: 114.304063, latitude: 30.595826}}
                                    >
                                        <Marker
                                            position={{
                                                longitude: 114.304063,
                                                latitude: 30.595826
                                            }}
                                            clickable
                                            events={markerEvents}
                                        />
                                    </Map>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;