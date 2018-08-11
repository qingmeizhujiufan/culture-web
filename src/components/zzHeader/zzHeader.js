import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Affix,
    Icon,
    Input,
    Dropdown,
    Menu,
    Avatar,
    Divider,
    notification,
    Badge,
    Select,
    Modal,
    List
} from 'antd';
import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import './zzHeader.less';
import defaultUser from 'Img/default-user.jpg';
import {shiftDate} from "Utils/util";

const logoutUrl = restUrl.ADDR + 'server/LoginOut';
const queryMessageListUrl = restUrl.ADDR + 'message/queryList';
const deleteUrl = restUrl.ADDR + 'message/delete';
const Option = Select.Option;

const tabs = [{
    active: false,
    title: '首页',
    link: ''
}, {
    active: false,
    title: '文化展示',
    link: '/frame/culture/list'
}, {
    active: false,
    title: '新闻资讯',
    link: '/frame/news/list'
}, {
    active: false,
    title: '图片展示',
    link: '/frame/picture/list'
}, {
    active: false,
    title: '在线视频',
    link: '/frame/video/list'
}, {
    active: false,
    title: 'VR视频',
    link: '/frame/vr/list'
}, {
    active: false,
    title: '联系我们',
    link: '/frame/ContractUs'
}];

class ZZHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs,
            openSearch: false,
            messageList: [],
            visible: false
        };
    }

    componentWillMount = () => {
        const {tabs} = this.state;
        const router = this.context.router;
        const pathname = router.location.pathname;
        const path = pathname.split('/');
        console.log('path == ', path);
        if (!path[2] || path[2] === '' || path[2] === 'home') {
            this.setActiveTab(0);
            return;
        }
        const regexp = '/frame/' + path[2];
        _.forEach(tabs, (item, index) => {
            if (item.link !== '' && item.link.indexOf(regexp) > -1) {
                this.setActiveTab(index);
                return;
            }
        });
    }

    componentDidMount = () => {
        this.queryMessageList();
    }

    queryMessageList = () => {
        const param = {};
        param.userId = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        ajax.getJSON(queryMessageListUrl, param, data => {
            if (data.success) {
                this.setState({
                    messageList: data.backData
                });
            }
        });
    }

    onDelete = id => {
        const param = {};
        param.id = id;
        ajax.postJSON(deleteUrl, JSON.stringify(param), data => {
            if (data.success) {
                const messageList = [...this.state.messageList].filter(item => item.id !== id);
                this.setState({
                    messageList
                });
            } else {
                message.error(data.backMsg);
            }
        });
    }

    setActiveTab = index => {
        const {tabs} = this.state;
        tabs.map(tab => {
            tab.active = false;
        });
        tabs[index].active = true;

        this.setState({tabs});

    }

    changeTab = index => {
        const {tabs} = this.state;
        tabs.map(item => item.active = false);
        tabs[index].active = true;

        this.setState({
            tabs,
        });

        this.context.router.push(tabs[index].link);
    }

    logout = () => {
        let param = {};
        param.userId = localStorage.userId;
        ajax.postJSON(logoutUrl, JSON.stringify(param), (data) => {
            if (data.success) {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                message.success('已安全退出！');
                this.context.router.push('/login');
            } else {
                message.error(data.backMsg);
            }
        });
    }

    onSearch = (value, event) => {
        this.setState({
            openSearch: !this.state.openSearch
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {openSearch, messageList, visible} = this.state;

        return (
            <Affix>
                <header className="zui-header">
                    <div>
                        <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                            <Col style={{width: 162}}>
                                <div className='logo'><span className='iconfont icon-hubeiminsu'></span></div>
                            </Col>
                            <Col style={{width: 705}}>
                                <div className='header-tabs'>
                                    {
                                        tabs.map((item, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className={`tab ${item.active ? 'tab-active' : ''}`}
                                                    onClick={() => this.changeTab(index)}
                                                >{item.title}</span>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                            <Col style={{width: 433, textAlign: 'right'}}>
                                <Row type="flex" justify="space-between" align="middle">
                                    <Col style={{width: 240, height: 32}}>
                                        <Divider type="vertical"/>
                                        {
                                            openSearch ? (
                                                <div style={{display: 'inline-block'}}>
                                                    <Select defaultValue="culture" style={{width: 82}}>
                                                        <Option value="culture">文化</Option>
                                                        <Option value="news">新闻</Option>
                                                        <Option value="picture">图片</Option>
                                                        <Option value="video">视频</Option>
                                                    </Select>
                                                    <Divider type="vertical"/>
                                                </div>
                                            ) : null
                                        }
                                        <Input.Search
                                            className="input-search"
                                            placeholder={openSearch ? "请输入搜索内容" : ""}
                                            style={{
                                                width: openSearch ? 155 : 45,
                                                transition: 'width 0.2s ease-in'
                                            }}
                                            onSearch={(value, event) => this.onSearch(value, event)}
                                        />
                                        <Divider type="vertical"/>
                                    </Col>
                                    <Col style={{width: 60, textAlign: 'center'}} onClick={this.showModal}>
                                        <Badge count={messageList.length}>
                                            <Icon type="bell" className='fontsize-20 message'/>
                                        </Badge>
                                    </Col>
                                    <Col style={{width: 130}}>
                                        <Avatar size="small" src={defaultUser}
                                                style={{marginRight: 10, verticalAlign: -7}}/>
                                        <Dropdown placement="bottomCenter" overlay={(
                                            <Menu>
                                                <Menu.Item>
                                                    <Link to="frame/personal">个人中心</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <span onClick={this.logout}>退出登录</span>
                                                </Menu.Item>
                                            </Menu>
                                        )}>
                                            <a className="ant-dropdown-link">青梅煮酒 <Icon type="down"/></a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </header>
                <Modal
                    title="消息列表"
                    wrapClassName='zui-message-modal'
                    maskStyle={{
                        background: 'rgba(237,236,234, 0.5373)'
                    }}
                    visible={visible}
                    onCancel={this.hideModal}
                    footer={null}
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={messageList}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[<a
                                    onClick={() => this.onDelete(item.id)}>删除</a>]}
                                style={{
                                    padding: 0,
                                    backgroundColor: '#fff'
                                }}
                            >
                                <List.Item.Meta
                                    avatar={<Icon type="notification" />}
                                    title={(<div>
                                        {item.messageTitle}
                                        <span style={{
                                            marginLeft: 8,
                                            fontSize: 12,
                                            color: '#7D7D7D'
                                        }}>{shiftDate(item.create_time)}</span>
                                    </div>)}
                                    description={item.messageContent}
                                />
                            </List.Item>
                        )}
                    />
                </Modal>
            </Affix>
        );
    }
}

ZZHeader.contextTypes = {
    router: PropTypes.object
}

export default ZZHeader;
