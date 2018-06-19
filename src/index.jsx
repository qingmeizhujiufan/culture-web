import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from 'routes/index'
import './index.less'//全局样式
import './assets/css/iconfont.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
    	<Router history={hashHistory} routes={routes}/>
    </Provider>, window.document.getElementById('main')
);