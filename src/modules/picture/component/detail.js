import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Button, message, Spin, Avatar, Input, List, Divider} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import _ from 'lodash';
import {listToTree, shiftDate} from "Utils/util";
import ZZComment from 'Comps/zzComment/';
import '../index.less';

const {TextArea} = Input;
const queryDetailUrl = restUrl.ADDR + 'taste/queryDetail';
const queryCommentListUrl = restUrl.ADDR + 'taste/queryCommentList';
const addUrl = restUrl.ADDR + 'taste/add';
const queryUserOtherPicUrl = restUrl.ADDR + 'taste/queryUserOtherPic';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {},
            commentList: [],
            otherShow: []
        };

        this.handleCommentList = this.handleCommentList.bind(this);
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.id !== this.props.params.id) {
            this.queryDetail(nextProps.params.id);
        }
    }

    //获取图片详情
    queryDetail = id => {
        let param = {};
        param.id = id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryDetailUrl, param, (data) => {
            if (data.success) {
                data = data.backData;
                this.queryUserOtherPic(data.creator);

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

    handleCommentList = commentList => {
        this.setState({commentList});
    }

    queryUserOtherPic = userId => {
        const param = {};
        param.userId = userId;
        param.tasteId = this.props.params.id;
        ajax.getJSON(queryUserOtherPicUrl, param, data => {
            if (data.success) {
                this.setState({
                    otherShow: data.backData
                });
            } else {
                message.error(data.backMsg);
            }
        });
    }

    render() {
        const {loading, data, commentList, otherShow} = this.state;

        return (
            <div className='page-picture-detail'>
                <Spin spinning={loading} size={"large"}>
                    <div className="page-content" style={{borderBottom: '1px solid #EAEAEA'}}>
                        <div className="content">
                            <Row type='flex' justify="space-between" align="middle" style={{height: 140}}>
                                <Col span={16}>
                                    <div className='base-info'>
                                        <h1 className="title">{data.tasteBrief}</h1>
                                        <span
                                            className="date">{data.create_time ? shiftDate(data.create_time) + '发布' : null}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div style={{textAlign: 'right'}}>
                                        <span style={{marginRight: 30}}><Avatar
                                            src={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : ''}/> {data.creatorName}</span>
                                        <span style={{marginRight: 30}}><Icon
                                            type="message"/> {commentList.length}</span>
                                        <span><Icon type="heart-o"/> {data.likeNum}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='page-content'>
                        <div className='content'>
                            <div
                                style={{width: 900, margin: '25px 0', textAlign: 'center', backgroundColor: '#f5f5f5'}}>
                                <img src={data.tasteCover ? restUrl.BASE_HOST + data.tasteCover.filePath : ''}
                                     style={{maxWidth: '100%'}}/>
                            </div>
                            <p style={{fontSize: 14, color: '#7D7D7D'}}>{data.tasteBrief}</p>
                            <ZZComment
                                avatar={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : null}
                                queryUrl={queryCommentListUrl}
                                saveUrl={addUrl}
                                queryParams={{tasteId: this.props.params.id}}
                                commentList={this.handleCommentList}
                            />
                        </div>
                    </div>
                    <div className='page-content' style={{backgroundColor: '#FAFAFA'}}>
                        <div className='content' style={{backgroundColor: 'transparent'}}>
                            <div style={{
                                fontSize: 16,
                                color: '#666',
                                lineHeight: '66px',
                                borderBottom: '1px solid #dedede',
                                textAlign: 'center'
                            }}>他最近的其他发布
                            </div>
                            <Row type="flex" justify="space-between" align='top' className="grid">
                                {
                                    otherShow.map((item, index) => {
                                        return (
                                            <Col key={item.id + index} className="grid-item">
                                                <Link to={`frame/picture/detail/${item.id}`}>
                                                    <img src={restUrl.BASE_HOST + item.tasteCover.filePath}/>
                                                    <div className='info'>
                                                        <div className='creator'>
                                                            <Row type="flex" justify="space-between">
                                                                <Col span={11} offset={1}>
                                                                    <Avatar style={{
                                                                        marginRight: 5,
                                                                        verticalAlign: '-7px',
                                                                    }} size="small"
                                                                            src={restUrl.BASE_HOST + item.avatar.filePath}
                                                                    /> {item.creatorName}
                                                                </Col>
                                                                <Col span={11}>
                                                                    <div
                                                                        className="date">{shiftDate(item.create_time)}</div>
                                                                </Col>
                                                                <Col span={1}/>
                                                            </Row>
                                                        </div>
                                                        <div className='extra'>
                                                            <Row>
                                                                <Col span={8} offset={1}>
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
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
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