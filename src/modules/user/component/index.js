import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Input, Icon, Tabs, Avatar, Breadcrumb, Badge, Card, Spin, message, Modal} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import defaultUser from 'Img/default-user.jpg';
import {shiftDate} from "../../../util/util";

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'taste/queryUserPic';
const deleteUrl = restUrl.ADDR + 'taste/delete';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            stateList: [{
                active: true,
                state: null,
                label: '全部'
            }, {
                active: false,
                state: 0,
                label: '待审核'
            }, {
                active: false,
                state: 1,
                label: '已通过'
            }, {
                active: false,
                state: -1,
                label: '未通过'
            }],
            myPic: [],
            collectArt: []
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getMyPic();
    }

    getMyPic = () => {
        let param = {};
        param.userId = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        this.setState({loading: true});
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;

                this.setState({
                    myPic: backData
                });
            } else {
                message.error(data.backMsg);
            }
            this.setState({loading: false});
        });
    }

    onStateChange = (item, index) => {
        const {stateList} = this.state;
        if (item.active) return;
        stateList.map(item => {
            item.active = false;
        });
        stateList[index].active = true;

        this.setState({
            stateList
        });
    }

    onDelete = id => {
        Modal.confirm({
            title: '删除图片',
            content: '确认删除吗？删除将不可恢复',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                const param = {};
                param.id = id;
                ajax.postJSON(deleteUrl, JSON.stringify(param), data => {
                    if (data.success) {
                        message.success('删除成功！');
                        const myPic = [...this.state.myPic].filter(item => item.id !== id);
                        this.setState({myPic});
                    } else {
                        message.error(data.backMsg);
                    }
                });
            }
        });
    }

    render() {
        const {loading, myPic, stateList} = this.state;
        const activeState = _.find(stateList, {active: true}).state;
        const filterPic = activeState !== null ? myPic.filter(item => item.state === activeState) : myPic;
        console.log('activeState === ', activeState);
        console.log('filterPic === ', filterPic);
        return (
            <div className='page-user bg-gray' style={{padding: '50px 0 30px'}}>
                <div className="page-content">
                    <div className='content user-bg'>
                        <Avatar size="large" src={defaultUser}/>
                        <span className='nickname'>{'青梅煮酒'}</span>
                        <span className='area'>{'湖北·武汉'}</span>
                    </div>
                    <div className='content'>
                        <div className='user-info clearfix'>
                            <div className='zui-pull-right' style={{marginTop: 30, marginRight: 55}}>
                                <ul className='zui-unstyled inline'>
                                    <li style={{width: 100, textAlign: 'center'}}>
                                        <h1 style={{
                                            color: '#242121',
                                            fontSize: 20,
                                            lineHeight: '28px',
                                            fontWeight: 600
                                        }}>{12}</h1>
                                        <p style={{color: '#7B7B7B', fontSize: 14}}>点赞</p>
                                    </li>
                                    <li style={{width: 100, textAlign: 'center'}}>
                                        <h1 style={{
                                            color: '#242121',
                                            fontSize: 20,
                                            lineHeight: '28px',
                                            fontWeight: 600
                                        }}>{22}</h1>
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
                            <TabPane tab="我的发布" key="1" style={{minHeight: 300}}>
                                <div className='state-group'>
                                    <span>状态</span>
                                    {
                                        stateList.map((item, index) => {
                                            return (
                                                <span key={index} className={item.active ? 'active-state' : null}
                                                      onClick={() => this.onStateChange(item, index)}>{item.label}</span>
                                            )
                                        })
                                    }
                                </div>
                                <Card loading={loading}>
                                    <div className='clearfix'>
                                        {
                                            filterPic.map(item => {
                                                return (
                                                    <div key={item.id} className='zui-card-item'>
                                                        <div className='zui-card-item-header'>
                                                            <Link to={'frame/picture/tasteDetail/' + item.id}>
                                                                <img
                                                                    src={item.tasteCover ? (restUrl.BASE_HOST + item.tasteCover.filePath) : null}/>
                                                            </Link>
                                                        </div>
                                                        <div className='zui-card-item-content'>
                                                            <div>{item.tasteTitle}</div>
                                                            <div className='date'>{shiftDate(item.create_time)}</div>
                                                        </div>
                                                        <div className='zui-card-item-footer'>
                                                            <span><Icon type="star-o"/> {item.likeNum}</span>
                                                            <span style={{marginLeft: 35}}><Icon
                                                                type="message"/> {item.commentNum}</span>
                                                            <a className='delete'
                                                               onClick={() => this.onDelete(item.id)}>删除</a>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Card>
                            </TabPane>
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