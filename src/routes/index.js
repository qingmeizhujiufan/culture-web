import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 文化展示 */
import Culture from '../modules/culture/component/';
import CultureDetail from '../modules/culture/component/detail';
/* 新闻资讯 */
import News from '../modules/news/component/';
import NewsDetail from '../modules/news/component/detail';
/* 图片展示 */
import Picture from '../modules/picture/component/';
import PictureDetail from '../modules/picture/component/detail';
/* 在线视频 */
import Video from '../modules/video/component/';
/* VR视频 */
/* 联系我们 */
import ContractUs from '../modules/contractUs/component/';
/* 个人中心 */
import User from '../modules/user/component/';

/* 登录 */
import Login from '../modules/login/component/login';

module.exports = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="frame"/>
            <Route path="frame" component={Frame}>
                <IndexRoute component={Home}/>
                <route path="culture/list" component={Culture}/>
                <route path="culture/detail/:id" component={CultureDetail}/>
                <route path="news/list" component={News}/>
                <route path="news/detail/:id" component={NewsDetail}/>
                <route path="picture/list" component={Picture}/>
                <route path="picture/detail/:id" component={PictureDetail}/>
                <route path="video/list" component={Video}/>
                <route path="contractus" component={ContractUs}/>
                <route path="personal" component={User}/>
            </Route>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
);
