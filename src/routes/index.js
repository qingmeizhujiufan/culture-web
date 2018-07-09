import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 文化展示 */
import Culture from '../modules/culture/component/';
/* 新闻资讯 */
import News from '../modules/news/component/';
/* 图片展示 */
import Picture from '../modules/picture/component/';
/* 在线视频 */
import Video from '../modules/video/component/';
/* VR视频 */
/* 联系我们 */
import ContractUs from '../modules/ContractUs/component/';

/* 登录 */
import Login from '../modules/login/component/login';

module.exports = (
    <Router path="/" history={hashHistory}>
        <IndexRedirect to="frame"/>
        <Route path="frame" component={Frame}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="culture/show" component={Culture}/>
            <Route path="news/list" component={News}/>
            <Route path="picture/show" component={Picture}/>
            <Route path="video/show" component={Video}/>
            <Route path="ContractUs" component={ContractUs}/>
        </Route>
        <Route path="login" component={Login}/>
    </Router>
);
