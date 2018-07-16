import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Button, message, Spin, Avatar, Input, List} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import {shifitDate} from "Utils/util";
import '../index.less';

const { TextArea } = Input;
const queryDetailUrl = restUrl.ADDR + 'taste/queryDetail';

const dataDemo = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {},
            commentList: []
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
                                            className="date">{data.create_time ? shifitDate(data.create_time) + '发布' : null}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div style={{textAlign: 'right'}}>
                                        <span style={{marginRight: 30}}><Avatar src={data.avatar ? restUrl.BASE_HOST + data.avatar.filePath : ''}/> {data.creatorName}</span>
                                        <span style={{marginRight: 30}}><Icon type="message"/> {data.commentNum}</span>
                                        <span><Icon type="heart-o"/> {data.likeNum}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='page-content'>
                        <div className='content'>
                            <div style={{margin: '25px 0', textAlign: 'center'}}>
                                <img src={data.tasteCover ? restUrl.BASE_HOST + data.tasteCover.filePath : ''} style={{width: 670}} />
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
                                            <TextArea rows={5} />
                                        </Col>
                                    </Row>
                                    <div style={{marginTop: 15, textAlign: 'right'}}>
                                        <Button>添加评论</Button>
                                    </div>
                                </div>
                                <div className='comment-list'>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={dataDemo}
                                        pagination
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar size='large' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                />
                                            </List.Item>
                                        )}
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