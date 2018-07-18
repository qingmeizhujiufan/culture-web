import React from 'react';
import {Row, Col, Icon, Button, message, Spin, Avatar, Input, List, Divider} from 'antd';
import restUrl from 'RestUrl';
import _ from 'lodash';
import {listToTree, shiftDate} from "Utils/util";
import './index.less';
import ajax from "Utils/ajax";

const {TextArea} = Input;
const sort = (a, b) => new Date(a.create_time).getTime() < new Date(b.create_time).getTime();

class ZZComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: this.props.avatar,
            commentList: [],
            commentTree: [],
            commentText: '',
            loading: false
        };
    }

    componentDidMount = () => {
        this.queryCommentList();
    }

    componentWillReceiveProps = (nextProps) => {
        const {editorState} = nextProps;
        if (editorState) {
            this.setState({editorState});
        }
    }

    //获取评论列表
    queryCommentList = () => {
        const {params, queryUrl} = this.props;
        const param = _.assign({}, params);
        this.setState({
            loading: true
        });
        ajax.getJSON(queryUrl, param, (data) => {
            if (data.success) {
                const commentList = data.backData;
                commentList.map(item => {
                    item.create_time = shiftDate(item.create_time);
                    item.openReply = false;
                    item.collapsed = false;
                });
                this.setState({
                    loading: false,
                    commentList,
                    commentTree: listToTree(commentList).sort(sort)
                });

                if ('commentList' in this.props) {
                    return this.props.commentList(commentList);
                }
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
        const {params, saveUrl} = this.props;
        const param = _.assign({}, params);
        param.pId = pId;
        param.userId = 'fd6dd05d-4b9a-48a2-907a-16743a5125dd';
        param.comment = this.state.commentText;
        ajax.postJSON(saveUrl, JSON.stringify(param), data => {
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
                itemLayout="vertical"
                dataSource={subItem}
                renderItem={subItem => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar
                                icon="user"
                                src={(subItem.avatar && subItem.avatar.filePath) ? restUrl.BASE_HOST + subItem.avatar.filePath : null}/>}
                            title={
                                <a>{`${subItem.userName}  ${subItem.create_time}`}</a>}
                            description={<div>
                                <div>{subItem.comment}//<a>@{item.userName}: </a><span>{item.comment}</span>
                                </div>
                                <div>
                                    <a onClick={() => this.openReply(subItem.id)}>{subItem.openReply ? '取消' : '回复'}</a>
                                </div>
                                {
                                    subItem.openReply ? (<div style={{marginTop: 16}}>
                                                                                <TextArea rows={5} value={commentText}
                                                                                          onChange={this.saveCommentText}/>
                                        <div style={{marginTop: 16, textAlign: 'right'}}>
                                            <Button
                                                onClick={() => this.addComment(subItem.id)}>回复评论</Button>
                                        </div>
                                    </div>) : null
                                }
                            </div>}
                        />
                        {
                            subItem.children && subItem.children.length > 0 ? (
                                <div style={{marginTop: 16}}>
                                    {renderSubItem(subItem, subItem.children)}
                                </div>) : null
                        }
                    </List.Item>
                )}
            />
        );

        return (
            <List.Item className="top-item">
                <List.Item.Meta
                    avatar={<Avatar
                        size='large'
                        icon="user"
                        src={(item.avatar && item.avatar.filePath) ? restUrl.BASE_HOST + item.avatar.filePath : null}/>}
                    title={<a>{`${item.userName}  ${item.create_time}`}</a>}
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
                            item.collapsed ? (
                                <div style={{marginTop: 16}}>
                                    {renderSubItem(item, item.children)}
                                </div>) : null
                        }
                        {
                            item.openReply ? (<div style={{marginTop: 10}}>
                                <TextArea rows={5} value={commentText} onChange={this.saveCommentText}/>
                                <div style={{marginTop: 16, textAlign: 'right'}}>
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
        const {loading, avatar, commentList, commentTree, commentText} = this.state;

        return (
            <div className='comment-box'>
                <div className='comment-dialog'>
                    <div className='title'>评论（{commentList.length}）</div>
                    <Row type='flex' justify="space-between" align="middle">
                        <Col style={{width: 56}}>
                            <Avatar
                                size="large"
                                icon="user"
                                src={avatar ? avatar : null}
                            />
                        </Col>
                        <Col style={{width: 814}}>
                            <TextArea rows={5} value={commentText} onChange={this.saveCommentText}/>
                        </Col>
                    </Row>
                    <div style={{marginTop: 16, textAlign: 'right'}}>
                        <Button onClick={() => this.addComment(null, 1)}>评论</Button>
                    </div>
                </div>
                <div className='comment-list'>
                    <Spin spinning={loading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={commentTree}
                            pagination
                            renderItem={item => this.renderItem(item)}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}

export default ZZComment;
