import React from 'react';
import {Row, Col, Icon, message, Spin, Affix} from 'antd';
import draftToHtml from 'draftjs-to-html';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import {shiftDate} from "Utils/util";
import top5 from 'Img/top5.png';
import ZZComment from 'Comps/zzComment/';

const queryDetailUrl = restUrl.ADDR + 'culture/queryDetail';
const queryCommentListUrl = restUrl.ADDR + 'culture/queryCommentList';
const addUrl = restUrl.ADDR + 'culture/add';
const collectUrl = restUrl.ADDR + 'culture/collect';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {}
        };
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail();
    }

    //获取文化详情
    queryDetail = () => {
        let param = {};
        param.id = this.props.params.id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryDetailUrl, param, (data) => {
            if (data.success) {
                data = data.backData;
                if (data.cultureContent && data.cultureContent !== '') {
                    data.cultureContent = JSON.parse(data.cultureContent);
                    data.contentHtml = draftToHtml(data.cultureContent);
                }
                this.setState({
                    data
                });
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                loading: false
            });
        });
    }

    collect = () => {
        const param = {};
        param.cultureId = this.props.params.id;
        param.userId = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        ajax.postJSON(collectUrl, JSON.stringify(param), data => {
            if (data.success) {
                const data = this.state.data;
                const isCollect = data.isCollect;
                data.isCollect = !isCollect;
                if (isCollect) {
                    message.success('已取消收藏');
                } else {
                    message.success('已收藏');
                }

                this.setState({
                    data
                });
            } else {
                message.error(data.backMsg);
            }
        })
    }

    scrollToAnchor = anchorName => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if(anchorElement) { anchorElement.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            }); }
        }
    }

    render() {
        const {loading, data} = this.state;

        return (
            <div className='page-culture-detail'>
                <Spin spinning={loading} size={"large"}>
                    <div className="page-content" style={{borderBottom: '1px solid #EAEAEA'}}>
                        <div className="content">
                            <Row type='flex' justify="space-between" align="middle" style={{height: 140}}>
                                <Col span={16}>
                                    <div className='base-info'>
                                        <h1 className="title">{data.cultureTitle}</h1>
                                        <span
                                            className="date">{data.create_time ? shiftDate(data.create_time) + '发布' : null}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div style={{textAlign: 'right', lineHeight: '24px'}}>
                                        <span style={{marginRight: 75, verticalAlign: 'sub', cursor: 'pointer'}}
                                            onClick={() => this.scrollToAnchor('comment')}>
                                            <Icon type="form" style={{
                                                marginRight: 10,
                                                fontSize: 24,
                                                color: '#FFA600',
                                                verticalAlign: 'sub',
                                            }}/>评论
                                        </span>
                                        <span style={{verticalAlign: 'sub', cursor: 'pointer'}}
                                              onClick={() => this.collect()}>
                                            <Icon
                                                type={data.isCollect ? "star" : "star-o"}
                                                style={{
                                                    marginRight: 10,
                                                    fontSize: 24,
                                                    color: '#FFA600',
                                                    verticalAlign: 'sub'
                                                }}/>收藏
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="page-content">
                        <div className="content">
                            <Row type='flex' justify="space-between" align="top" style={{marginTop: 50}}>
                                <Col style={{width: 900}}>
                                    <div className="wrap-html">
                                        <div dangerouslySetInnerHTML={{__html: data.contentHtml}}></div>
                                    </div>
                                    <ZZComment
                                        id='comment'
                                        avatar={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : null}
                                        queryUrl={queryCommentListUrl}
                                        saveUrl={addUrl}
                                        queryParams={{cultureId: this.props.params.id}}
                                    />
                                </Col>
                                <Col>
                                    <Affix offsetTop={100}>
                                        <div className='top5'>
                                            <h1 className='title'><img src={top5}/></h1>
                                        </div>
                                    </Affix>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

Detail.contextTypes = {
    router: React.PropTypes.object
}

export default Detail;