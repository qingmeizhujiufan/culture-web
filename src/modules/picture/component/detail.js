import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Button, message, Spin, Avatar, Input, List, Divider} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import _ from 'lodash';
import {listToTree, shiftDate} from "Utils/util";
import '../index.less';

const {TextArea} = Input;
const queryDetailUrl = restUrl.ADDR + 'taste/queryDetail';
const queryCommentListUrl = restUrl.ADDR + 'taste/queryCommentList';
const addUrl = restUrl.ADDR + 'taste/add';

const sort = (a, b) => new Date(a.create_time).getTime() < new Date(b.create_time).getTime();

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {},
            commentList: [],
            commentTree: [],
            commentText: ''
        };
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail();
        this.queryCommentList();
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

    //获取评论列表
    queryCommentList = () => {
        let param = {};
        param.tasteId = this.props.params.id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryCommentListUrl, param, (data) => {
            if (data.success) {
                const commentList = data.backData;
                commentList.map(item => {
                    item.openReply = false;
                    item.collapsed = false;
                });
                this.setState({
                    commentList,
                    commentTree: listToTree(commentList).sort(sort)
                });
                console.log('commentTree === ', this.state.commentTree);
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                loading: false
            });
        });
    }

    saveCommentText = value => {
        this.setState({
            commentText: value.target.value
        });
    }

    openReply = id => {
        const {commentList} = this.state;
        commentList.map(item => {
            if (item.id === id) {
                item.openReply = !item.openReply;
            }
        });

        this.setState({
            commentList,
            commentTree: listToTree(commentList).sort(sort)
        });
    }

    openReplyList = id => {
        const {commentList} = this.state;
        commentList.map(item => {
            if (item.id === id) {
                item.collapsed = !item.collapsed;
            }
        });

        this.setState({
            commentList,
            commentTree: listToTree(commentList).sort(sort)
        });
    }


    addComment = (pId) => {
        const param = {};
        param.pId = pId;
        param.tasteId = this.props.params.id;
        param.userId = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        param.comment = this.state.commentText;
        ajax.postJSON(addUrl, JSON.stringify(param), data => {
            if (data.success) {
                this.setState({
                    commentText: ''
                });
                this.queryCommentList();
            }
        });
    }

    renderItem = item => {
        const {commentText} = this.state;

        const renderSubItem = (item, subItem) => (
            <List
                itemLayout="horizontal"
                dataSource={subItem}
                renderItem={subItem => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={restUrl.BASE_HOST + subItem.avatar.filePath}/>}
                            title={
                                <a>{`${subItem.userName}  ${shiftDate(subItem.create_time)}`}</a>}
                            description={<div>
                                <div>{subItem.comment}//<a>@{item.userName}: </a><span>{item.comment}</span>
                                </div>
                                <div>
                                    <a onClick={() => this.openReply(subItem.id)}>{subItem.openReply ? '取消' : '回复'}</a>
                                </div>
                                {
                                    subItem.children && subItem.children.length > 0 ? (<div style={{marginTop: 15}}>
                                        <div style={{marginTop: 15}}>
                                            {renderSubItem(subItem, subItem.children)}
                                        </div>
                                    </div>) : null
                                }
                                {
                                    subItem.openReply ? (<div style={{marginTop: 15}}>
                                                                                <TextArea rows={5} value={commentText}
                                                                                          onChange={this.saveCommentText}/>
                                        <div style={{marginTop: 15, textAlign: 'right'}}>
                                            <Button
                                                onClick={() => this.addComment(subItem.id)}>回复评论</Button>
                                        </div>
                                    </div>) : null
                                }
                            </div>}
                        />
                    </List.Item>
                )}
            />
        );

        return (
            <List.Item className="top-item">
                <List.Item.Meta
                    avatar={<Avatar size='large'
                                    src={restUrl.BASE_HOST + item.avatar.filePath}/>}
                    title={<a>{`${item.userName}  ${shiftDate(item.create_time)}`}</a>}
                    description={<div>
                        <div>{item.comment}</div>
                        <div>
                            <a onClick={() => this.openReply(item.id)}>{item.openReply ? '取消' : '回复'}</a>
                            {
                                item.children && item.children.length > 0 ? (
                                    <span>
                                        <Divider type="vertical"/>
                                        <a onClick={() => this.openReplyList(item.id)}>
                                            {item.children.length}条回复 <Icon
                                            type={item.collapsed ? 'up' : 'down'}/>
                                        </a>
                                    </span>
                                ) : null
                            }
                        </div>
                        {
                            item.collapsed ? (<div style={{marginTop: 15}}>
                                <div style={{marginTop: 15}}>
                                    {renderSubItem(item, item.children)}
                                </div>
                            </div>) : null
                        }
                        {
                            item.openReply ? (<div style={{marginTop: 15}}>
                                <TextArea rows={5} value={commentText} onChange={this.saveCommentText}/>
                                <div style={{marginTop: 15, textAlign: 'right'}}>
                                    <Button
                                        onClick={() => this.addComment(item.id)}>回复评论</Button>
                                </div>
                            </div>) : null
                        }
                    </div>}
                />
            </List.Item>
        );
    }

    render() {
        const {loading, data, commentList, commentTree, commentText} = this.state;

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
                            <div className='comment-box'>
                                <div className='comment-dialog'>
                                    <div className='title'>评论（{commentList.length}）</div>
                                    <Row type='flex' justify="space-between" align="middle">
                                        <Col style={{width: 100}}>
                                            <Avatar
                                                size="large"
                                                src={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : ''}
                                                style={{width: 48, height: 48, borderRadius: 100}}
                                            />
                                        </Col>
                                        <Col style={{width: 770}}>
                                            <TextArea rows={5} value={commentText} onChange={this.saveCommentText}/>
                                        </Col>
                                    </Row>
                                    <div style={{marginTop: 15, textAlign: 'right'}}>
                                        <Button onClick={() => this.addComment(null, 1)}>添加评论</Button>
                                    </div>
                                </div>
                                <div className='comment-list'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={commentTree}
                                        pagination
                                        renderItem={item => this.renderItem(item)}
                                    />
                                </div>
                            </div>
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