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
    Button,
    Spin,
    Tabs,
    message,
    Modal,
    Select
} from 'antd';
import imagesLoaded from 'imagesLoaded';
import Masonry from 'masonry-layout';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import demo from 'Img/demo.jpg';
import demo1 from 'Img/demo1.jpg';
import demo2 from 'Img/demo2.jpg';
import demo3 from 'Img/demo3.jpg';
import demo4 from 'Img/demo4.jpg';
import demo5 from 'Img/demo5.jpg';
import demo6 from 'Img/demo6.jpg';
import demo7 from 'Img/demo7.jpg';
import demo8 from 'Img/demo8.jpg';
import demo9 from 'Img/demo9.jpg';
import demo10 from 'Img/demo10.jpg';


const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';
const delDsihUrl = restUrl.ADDR + 'server/delDish';

class Picture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        var imgLoad = imagesLoaded( '#container', function() {
            // 图片加载后执行的方法
            var grid = document.querySelector('.grid');
            var msnry = new Masonry(grid, {
                columnWidth: 220,
                itemSelector: '.grid-item',     // 要布局的网格元素
                gutter: 25,                    // 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置
                percentPosition: false,           // 使用columnWidth对应元素的百分比尺寸
                stamp: '.grid-stamp',             // 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方
                fitWidth: true,                  // 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示
                originLeft: true,                // 默认true网格左对齐，设为false变为右对齐
                originTop: true,                 // 默认true网格对齐顶部，设为false对齐底部
                containerStyle: {
                    position: 'relative'
                },     // 设置容器样式
                transitionDuration: '0.5s',      // 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式
                stagger: '0.03s',                // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间
                resize: true,                  // 改变窗口大小将不会影响布局
                initLayout: true,                // 初始化布局，设未true可手动初试化布局
            });
        });
    }

    render() {

        return (
            <div className="page-content">
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <div className='clearfix' style={{height: 92, lineHeight: '92px', backgroundColor: '#fff'}}>
                            <div className='zui-pull-left' style={{color: '#170202', fontSize: 20}}>图片展示 / 兴趣圈</div>
                            <div className='zui-pull-right'>
                                <Button type="primary" icon="rocket">我要发布</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{background: 'rgba(237,236,234,1)'}}>
                    <Col span={3}></Col>
                    <Col span={18} style={{margin: '25px 0 50px 0'}}>
                        <div>
                            <div className="grid" id="container">
                                <div className="grid-item">
                                    <img src={demo}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo1}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo2}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo3}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo4}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo5}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo6}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo7}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo8}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo9}/>
                                </div>
                                <div className="grid-item">
                                    <img src={demo10}/>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        );
    }
}

Picture.contextTypes = {
    router: React.PropTypes.object
}

export default Picture;