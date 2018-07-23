import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Affix, Icon, Input, Dropdown, Menu, Avatar, Divider, notification} from 'antd';
import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import './zzHeader.less';
import logo from 'Img/logo.png';

const logoutUrl = restUrl.ADDR + 'server/LoginOut';

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
        };
    }

    componentWillMount = () => {
        const {tabs} = this.state;
        const router = this.context.router;
        const pathname = router.location.pathname;
        const path = pathname.split('/');
        console.log('path == ', path);
        if(path[2] === '' || path[2] === 'home'){
            this.setActiveTab(0);
            return;
        }
        const regexp = '/frame/' + path[2];
        _.forEach(tabs, (item, index) => {
            if(item.link !== '' && item.link.indexOf(regexp) > -1) {
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

    render() {

        return (
            <Affix>
                <header className="zui-header">
                    <div>
                        <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                            <Col span={3}>
                                <div className='logo'><img src={logo}/></div>
                            </Col>
                            <Col span={15}>
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
                            <Col span={6} style={{textAlign: 'right'}}>
                                <Divider type="vertical"/>
                                <Input
                                    className="input-search"
                                    placeholder="别说话，搜我..."
                                    prefix={<Icon type="search"
                                                  style={{color: 'rgba(0,0,0,1)', fontSize: 16, fontWeight: 600}}/>}
                                    style={{width: 40}}
                                />
                                <Divider type="vertical"/>
                                <Avatar style={{verticalAlign: '-6px', backgroundColor: '#666'}} size="small"
                                        icon="user"/> 您好，请<Link to="login">登录</Link>
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
