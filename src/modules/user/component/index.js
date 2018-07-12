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

        this.state = {
            loading: false,
            listData: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0
            }
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;

                this.setState({
                    listData: backData,
                    pagination: {
                        total: backData.length
                    },
                    loading: false
                });
            }
        });
    }

    render() {
        const {loading, listData, pagination} = this.state;

        return (
            <div className='page-user bg-gray' style={{padding: '50px 0 30px'}}>
                <div className="page-content">
                    <div className='content user-bg'>
                        <Avatar size="large" src={defaultUser} />
                        <span className='nickname'>{'青梅煮酒'}</span>
                        <span className='area'>{'湖北·武汉'}</span>
                    </div>
                    <div className='content'>
                        <div className='user-info clearfix'>
                            <div className='zui-pull-right' style={{marginTop: 30, marginRight: 55}}>
                                <ul className='zui-unstyled inline'>
                                    <li style={{width: 100, textAlign: 'center'}}>
                                        <h1 style={{color: '#242121', fontSize: 20, lineHeight: '28px', fontWeight: 600}}>{12}</h1>
                                        <p style={{color: '#7B7B7B', fontSize: 14}}>点赞</p>
                                    </li>
                                    <li style={{width: 100, textAlign: 'center'}}>
                                        <h1 style={{color: '#242121', fontSize: 20, lineHeight: '28px', fontWeight: 600}}>{22}</h1>
                                        <p style={{color: '#7B7B7B', fontSize: 14}}>收藏</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content" style={{marginTop: 20}}>
                    <div className="content">
                        <Tabs>
                            <TabPane tab="我的发布" key="1" style={{minHeight: 300}}></TabPane>
                            <TabPane tab="我收藏的优品" key="2" style={{minHeight: 300}}></TabPane>
                            <TabPane tab="我收藏的民俗" key="3" style={{minHeight: 300}}></TabPane>
                        </Tabs>
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