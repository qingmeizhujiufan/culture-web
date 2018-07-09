import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Tree,
    Icon,
    Button,
    Spin,
    message,
    Upload,
    Modal,
    Avatar,
    Steps
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

const Dragger = Upload.Dragger;
const Step = Steps.Step;
const queryListUrl = restUrl.ADDR + 'taste/queryList';
const saveUrl = restUrl.ADDR + 'taste/save';
const delDsihUrl = restUrl.ADDR + 'server/delDish';

const steps = [{
    title: '上传预览',
}, {
    title: '上传成功',
}, {
    title: '审核发布',
}];

class Picture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            loading: false,
            current: 0,
            fileList: [],
            visible: false,
        };
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryList(() => {
            var imgLoad = imagesLoaded('#container', function () {
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
        });
    }

    queryList = (callback) => {
        ajax.getJSON(queryListUrl, null, data => {
            if (data.success) {
                this.setState({
                    dataSource: data.backData
                }, () => {
                    if (typeof callback === 'function') callback();
                });
            } else {
                message.error(data.backMsg);
            }
        })
    }

    showPublishModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleChange = ({fileList}) => {
        this.setState({
            fileList,
        });
    }

    handleOk = () => {
        const {fileList} = this.state;
        const param = {};
        param.tasteCover = fileList.map(item => {
            return item.response.data.id;
        }).join(',');
        param.tasteBrief = '这是描述';
        param.creator = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        this.setState({loading: true});
        ajax.postJSON(saveUrl, JSON.stringify(param), data => {
            if (data.success) {
                message.success('上传图片成功');
                this.setState({
                    loading: false,
                    visible: false
                });
            } else {
                message.error('上传图片失败');
            }
        });
    }

    handleCancel = () => {
        this.setState({visible: false});
    }

    render() {
        const {dataSource, visible, current, loading} = this.state;

        return (
            <div className="page-content">
                <div style={{backgroundColor: '#fff'}}>
                    <div className='clearfix' style={{width: 1200, height: 92, margin: '0 auto', lineHeight: '92px'}}>
                        <div className='zui-pull-left' style={{color: '#170202', fontSize: 20}}>图片展示 / 兴趣圈</div>
                        <div className='zui-pull-right'>
                            <Button type="primary" icon="rocket" className="zui-btn"
                                    onClick={() => this.showPublishModal()}>我要发布</Button>
                            <Modal
                                visible={visible}
                                title="发布美图"
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                                    <Button key="submit" type="primary" loading={loading}
                                            onClick={this.handleOk}>发布</Button>,
                                ]}
                            >
                                <Dragger
                                    action={restUrl.UPLOAD}
                                    onChange={this.handleChange}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <Icon type="inbox"/>
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly
                                        prohibit from uploading company data or other band files</p>
                                </Dragger>
                                <Steps current={current}>
                                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                                </Steps>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div style={{background: 'rgba(237,236,234,1)'}}>
                    <div style={{width: 1200, margin: '0 auto', padding: '25px 0 50px'}}>
                        <div className="grid" id="container">
                            {
                                dataSource.map((item, index) => {
                                    return (
                                        <div key={index} className="grid-item">
                                            <img src={restUrl.BASE_HOST + item.tasteCover.filePath}/>
                                            <div className='info'>
                                                <div className='creator'>
                                                    <Row type="flex" justify="space-between">
                                                        <Col span={11} offset={1}>
                                                            <Avatar style={{
                                                                marginRight: 5,
                                                                verticalAlign: '-7px',
                                                            }} size="small"
                                                                    icon="user"/> 达摩法师
                                                        </Col>
                                                        <Col span={11}>
                                                            <div
                                                                className="date">{item.create_time.substring(0, 10)}</div>
                                                        </Col>
                                                        <Col span={1}/>
                                                    </Row>
                                                </div>
                                                <div className='extra'>
                                                    <Row>
                                                        <Col span={8} offset={2}>
                                                            <Icon type="heart-o"/>
                                                            <span>{item.likeNum}</span>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Icon type="message"/>
                                                            <span>{item.commentNum}</span>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Picture.contextTypes = {
    router: React.PropTypes.object
}

export default Picture;