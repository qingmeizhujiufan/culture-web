import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Badge, message, Spin, Affix, Breadcrumb, Button} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import {shiftDate} from "Utils/util";
import top5 from 'Img/top5.png';
import ZZComment from 'Comps/zzComment/';

const queryDetailUrl = restUrl.ADDR + 'art/queryDetail';
const queryCommentListUrl = restUrl.ADDR + 'art/queryCommentList';
const addUrl = restUrl.ADDR + 'art/add';
const queryRecommendTop3Url = restUrl.ADDR + 'art/queryRecommendTop3';

class ArtDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recommendLoading: false,
            data: {},
            recommendList: [],
            currentPreview: {}
        };
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail();
        this.queryRecommendTop3();
    }

    //获取艺术品详情
    queryDetail = () => {
        let param = {};
        param.id = this.props.params.id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryDetailUrl, param, (data) => {
            if (data.success) {
                data = data.backData;
                data.artCover.map(item => {
                    item.active = false;
                });
                data.artCover[0].active = true;
                this.setState({
                    data,
                    currentPreview: data.artCover[0]
                });
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                loading: false
            });
        });
    }

    //获取Top3 推荐
    queryRecommendTop3 = () => {
        this.setState({
            recommendLoading: true
        });
        ajax.getJSON(queryRecommendTop3Url, null, data => {
            if (data.success) {
                data = data.backData;
                this.setState({
                    recommendList: data
                });
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                recommendLoading: false
            });
        });
    }

    onChangePreview = (item, index) => {
        let {data, currentPreview} = this.state;
        if(item.active) return;
        data.artCover.map(i => {
            i.active = false;
        });
        item.active = true;
        data.artCover[index] = item;
        currentPreview = item;
        this.setState({
            data,
            currentPreview
        });
    }

    render() {
        const {loading, recommendLoading, data, recommendList, currentPreview} = this.state;

        return (
            <div className='page-culture-artdetail'>
                <Spin spinning={loading} size={"large"}>
                    <div className="page-content">
                        <div className="content">
                            <Row type='flex' justify="space-between" align="top" style={{marginTop: 50}}>
                                <Col style={{width: 900}}>
                                    <div className='clearfix'>
                                        <div className='preview'>
                                            <div className='preview-active'>
                                                <img src={currentPreview.filePath ? (restUrl.BASE_HOST + currentPreview.filePath) : null}/>
                                            </div>
                                            <Row type='flex' justify="space-between" align="center"
                                                 className='preview-list'>
                                                {
                                                    data.artCover && data.artCover.map((item, index) => {
                                                        return (
                                                            <Col key={item.id}
                                                                 className={item.active ? 'active-preivew' : null}
                                                                 onClick={() => this.onChangePreview(item, index)}
                                                            >
                                                                <img
                                                                    src={restUrl.BASE_HOST + item.filePath}/>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>
                                        </div>
                                        <div className='art-info'>
                                            <Row type='flex' justify="start">
                                                <Col>
                                                    <Breadcrumb separator=">" className='zui-breadcrumb'>
                                                        <Breadcrumb.Item
                                                            href="#/frame/culture/list/2">艺术品</Breadcrumb.Item>
                                                        <Breadcrumb.Item>{data.cityName}</Breadcrumb.Item>
                                                    </Breadcrumb>
                                                </Col>
                                                <Col style={{marginLeft: 45}}>
                                                    <span
                                                        className="date">{data.create_time ? shiftDate(data.create_time) + '发布' : null}</span>
                                                </Col>
                                                <Col style={{marginLeft: 20}}>
                                                    <span className='read-info'><Icon type="eye-o"/> {127}人</span>
                                                </Col>
                                            </Row>
                                            <div className='art-title'>{data.artTitle}</div>
                                            <div
                                                className='art-money'>{data.artMoney ? `¥${data.artMoney.toFixed(2)}` : '¥--'}</div>
                                            <div style={{
                                                margin: '20px 0 30px',
                                                fontSize: 14,
                                                color: '#313131',
                                                lineHeight: '24px'
                                            }}>
                                                <span style={{marginRight: 40, verticalAlign: 'sub'}}>
                                                    <Icon type="form" style={{
                                                        marginRight: 10,
                                                        fontSize: 24,
                                                        color: '#FFA600',
                                                        verticalAlign: 'sub'
                                                    }}/>评论
                                                </span>
                                                <span style={{verticalAlign: 'sub'}}>
                                                    <Icon type="star-o" style={{
                                                        marginRight: 10,
                                                        fontSize: 24,
                                                        color: '#FFA600',
                                                        verticalAlign: 'sub'
                                                    }}/>收藏
                                                </span>
                                            </div>
                                            <Button icon='shop' href={data.buyUrl} target='_blank'>去商城查看</Button>
                                        </div>
                                    </div>
                                    <div className="img-list">
                                        {
                                            data.artContent && data.artContent.map(item => {
                                                return (
                                                    <div key={item.id} className='wrap-img'>
                                                        <img key src={restUrl.BASE_HOST + item.filePath}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <ZZComment
                                        avatar={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : null}
                                        queryUrl={queryCommentListUrl}
                                        saveUrl={addUrl}
                                        queryParams={{artId: this.props.params.id}}
                                    />
                                </Col>
                                <Col>
                                    <div className='other-ad'>
                                        <h1 className='title'>其他推荐</h1>
                                        <div className='recommend-list'>
                                            <Spin spinning={recommendLoading}>
                                                {
                                                    recommendList.map(item => {
                                                        return (
                                                            <div key={item.id} className='zui-card-item'>
                                                                <Link to={'frame/culture/artDetail/' + item.id}>
                                                                    <div className='zui-card-item-header'>
                                                                        <img
                                                                            src={item.artCover ? (restUrl.BASE_HOST + item.artCover[0].filePath) : null}/>
                                                                    </div>
                                                                    <div className='zui-card-item-content'>
                                                                        <div>{item.artTitle}</div>
                                                                        <div
                                                                            className='price'>{item.artMoney ? `¥${item.artMoney.toFixed(2)}` : '¥--'}</div>
                                                                    </div>
                                                                    <div className='zui-card-item-footer'>
                                                                        <span><Icon type="eye-o"/> {127}人</span>
                                                                        <span style={{marginLeft: 35}}><Icon
                                                                            type="star-o"/> {25}人</span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Spin>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

ArtDetail.contextTypes = {
    router: React.PropTypes.object
}

export default ArtDetail;