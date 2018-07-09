import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Affix, Icon, Input, Dropdown, Menu, Avatar, Divider, notification} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import './zzHeader.less';

const logoutUrl = restUrl.ADDR + 'server/LoginOut';

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
                    <Row type="flex" justify="space-between" align="middle" style={{height: '100%'}}>
                        <Col span={4}>
                            <div className='logo'>湖北民俗</div>
                        </Col>
                        <Col span={14}>
                            <div className='header-tabs'>
                                <li className='tab tab-active'>首页</li>
                                <li className='tab'>文化展示</li>
                                <li className='tab'>新闻资讯</li>
                                <li className='tab'>图片交流</li>
                                <li className='tab'>在线视频</li>
                                <li className='tab'>VR视频</li>
                                <li className='tab'>联系我们</li>
                            </div>
                        </Col>
                        <Col span={6} style={{textAlign: 'right'}}>
                            <Divider type="vertical" />
                            <Input
                                className="input-search"
                                placeholder="别说话，搜我..."
                                prefix={<Icon type="search"
                                              style={{color: 'rgba(0,0,0,1)', fontSize: 16, fontWeight: 600}}/>}
                                style={{width: 200}}
                            />
                            <Divider type="vertical" />
                            <Avatar style={{verticalAlign: '-6px', backgroundColor: '#666'}} size="small"
                                    icon="user"/> 您好，请登录
                        </Col>
                    </Row>
                </header>
            </Affix>
        );
    }
}

ZZHeader.contextTypes = {
    router: React.PropTypes.object
}

export default ZZHeader;
