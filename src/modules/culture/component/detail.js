import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Badge, message, Spin, Affix} from 'antd';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import {listToTree, shiftDate} from "Utils/util";
import top5 from 'Img/top5.png';
import ZZComment from 'Comps/zzComment/';

const queryDetailUrl = restUrl.ADDR + 'culture/queryDetail';
const queryCommentListUrl = restUrl.ADDR + 'culture/queryCommentList';
const addUrl = restUrl.ADDR + 'culture/add';

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
                    this.setState({
                        data
                    });
                }
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                loading: false
            });
        });
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
                                        <span style={{marginRight: 75, verticalAlign: 'sub'}}>
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
                                        avatar={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : null}
                                        queryUrl={queryCommentListUrl}
                                        saveUrl={addUrl}
                                        params={{cultureId: this.props.params.id}}
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