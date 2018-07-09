import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect, hashHistory} from 'react-router'

import App from '../modules/App';
import Frame from '../modules/Frame';

/* 首页 */
import Home from '../modules/home/component/home';
/* 登录 */
import Login from '../modules/login/component/login';
/* 菜单管理 */
import DishList from '../modules/culture/component/dishList';
import DishDetailInfo from '../modules/culture/component/dishDetailInfo';
import EditDish from '../modules/culture/component/editDish';
import AddDish from '../modules/culture/component/addDish';
import HealthFood from '../modules/culture/component/healthFood';
import AddHealthFood from '../modules/culture/component/addHealthFood';
import EditHealth from '../modules/culture/component/editHealth';
import DishSurvey from '../modules/culture/component/survey';
import BrandAdmin from '../modules/culture/component/brandAdmin';
/* 图片交流 */
import Picture from '../modules/picture/component/';

module.exports = (
    <Router path="/" history={hashHistory}>
        <IndexRedirect to="frame"/>
        <Route path="frame" component={Frame}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home}/>
            <Route path="dish/dishList" component={DishList}/>
            <Route path="dish/dishDetailInfo/:id" component={DishDetailInfo}/>
            <Route path="dish/editDish/:id" component={EditDish}/>
            <Route path="dish/AddDish" component={AddDish}/>
            <Route path="dish/healthFood" component={HealthFood}/>
            <Route path="dish/addHealthFood" component={AddHealthFood}/>
            <Route path="dish/editHealth/:id" component={EditHealth}/>
            <Route path="dish/survey" component={DishSurvey}/>
            <Route path="dish/brandAdmin" component={BrandAdmin}/>
            <Route path="picture/show" component={Picture}/>
        </Route>
        <Route path="login" component={Login}/>
    </Router>
);
