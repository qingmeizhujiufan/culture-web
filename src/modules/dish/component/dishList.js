import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Tree,
    Table,
    Icon,
    List,
    Divider,
    Breadcrumb,
    Badge,
    notification,
    Menu,
    Dropdown,
    Spin,
    Tabs,
    message,
    Modal,
    Select
} from 'antd';
import Masonry from 'masonry-layout';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';
const delDsihUrl = restUrl.ADDR + 'server/delDish';

class DishList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        var msnry = new Masonry('.grid', {
            columnWidth: 200,
            itemSelector: '.grid-item',     // 要布局的网格元素
            gutter: 10,                    // 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置
            percentPosition: true,           // 使用columnWidth对应元素的百分比尺寸
            stamp: '.grid-stamp',             // 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方
            fitWidth: true,                  // 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示
            originLeft: true,                // 默认true网格左对齐，设为false变为右对齐
            originTop: true,                 // 默认true网格对齐顶部，设为false对齐底部
            containerStyle: {
                position: 'relative'
            },     // 设置容器样式
            transitionDuration: '0.8s',      // 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式
            stagger: '0.03s',                // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间
            resize: true,                  // 改变窗口大小将不会影响布局
            initLayout: false,                // 初始化布局，设未true可手动初试化布局
        });
    }

    render() {

        return (
            <div className="zui-content dishList">
                <div className="breadcrumb-block">
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
                        <Breadcrumb.Item>菜品列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ibox-title">
                    <h5>所有菜单</h5>
                </div>
                <div className="ibox-content">
                    <div className="grid">
                        <div className="grid-item" style={{width: 100, height: 100, backgroundColor: 'red'}}>1</div>
                        <div className="grid-item" style={{width: 100, height: 80, backgroundColor: 'blue'}}>2</div>
                        <div className="grid-item" style={{width: 100, height: 150, backgroundColor: 'yellow'}}>3</div>
                        <div className="grid-item" style={{width: 100, height: 150, backgroundColor: 'green'}}>4</div>
                        <div className="grid-item" style={{width: 100, height: 150, backgroundColor: 'pink'}}>5</div>
                        <div className="grid-item" style={{width: 100, height: 150, backgroundColor: 'orange'}}>6</div>
                    </div>
                </div>
            </div>
        );
    }
}

DishList.contextTypes = {
    router: React.PropTypes.object
}

export default DishList;