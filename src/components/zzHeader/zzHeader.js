import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Affix, Icon, Input, Dropdown, Menu, Avatar, Divider, notification, Badge, Select} from 'antd';
import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import './zzHeader.less';
import logo from 'Img/logo.png';
import defaultUser from 'Img/default-user.jpg';

const logoutUrl = restUrl.ADDR + 'server/LoginOut';
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

        this.menu = (
            <Menu>
                <Menu.Item>
                    <span onClick={this.logout}>退出登录</span>
                </Menu.Item>
            </Menu>
        );

        this.state = {
            tabs,
            openSearch: false
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
                notification.open({
                    message: '已安全退出！',
                    icon: <Icon type="smile-circle" style={{color: '#108ee9'}}/>,
                });
                this.context.router.push('/login');
            } else {
                notification.warning({
                    message: data.backMsg
                });
            }
        });
    }

    onSearch = (value, event) => {
        this.setState({
            openSearch: !this.state.openSearch
        });
    }

    render() {
        const {openSearch} = this.state;

        return (
            <Affix>
                <header className="zui-header">
                    <div>
                        <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                            <Col style={{width: 162}}>
                                <div className='logo'><img src={logo}/></div>
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
                                    <Col style={{width: 60, textAlign: 'center'}}>
                                        <Badge count={5}>
                                            <Icon type="bell" className='fontsize-20 message'/>
                                        </Badge>
                                    </Col>
                                    <Col style={{width: 130}}>
                                        <Avatar size="small" src={defaultUser}
                                                style={{marginRight: 10, verticalAlign: -7}}/>
                                        <Dropdown overlay={(
                                            <Menu>
                                                <Menu.Item>
                                                    <Link to="frame/personal">个人中心</Link>
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
            </Affix>
        );
    }
}

ZZHeader.contextTypes = {
    router: React.PropTypes.object
}

export default ZZHeader;
