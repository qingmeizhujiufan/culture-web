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

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {},
            commentList: []
        };

        this.handleCommentList = this.handleCommentList.bind(this);
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail();
    }

    //获取球馆详情
    queryDetail = () => {
        let param = {};
        param.id = this.props.params.id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryDetailUrl, param, (data) => {
            if (data.success) {
                data = data.backData;
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

    render() {
        const {loading, data, commentList} = this.state;

        return (
            <div className='page-picture'>
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
                                        <span style={{marginRight: 30}}><Icon type="message"/> {commentList.length}</span>
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
                                params={{tasteId: this.props.params.id}}
                                commentList={this.handleCommentList}
                            />
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