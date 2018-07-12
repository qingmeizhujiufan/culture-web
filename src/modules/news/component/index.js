import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, message, Button} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'news/queryList';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listData: [],
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0
            }
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        this.setState({
            loading: true
        });
        let param = {};
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                let backData = data.backData;

                this.setState({
                    listData: backData,
                    pagination: {
                        total: backData.length
                    },
                    loading: false
                });
            }
        });
    }

    detailrouter = id => {
        this.context.router.push(`/frame/news/detail/${id}`);
    }

    render() {
        const {loading, listData, pagination} = this.state;

        return (
            <div className='page-news'>
                <div className="page-content news-bg">

                </div>
                <div className="page-content">
                    <div className="content">
                        <Spin spinning={loading} size={"large"}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={pagination}
                                dataSource={listData}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        extra={<Icon type="right"/>}
                                        onClick={() => this.detailrouter(item.id)}
                                    >
                                        <List.Item.Meta
                                            avatar={<img style={{width: 232, height: 180}}
                                                         src={restUrl.BASE_HOST + item.newsCover.filePath}/>}
                                            title={<Link
                                                to={'/frame/news/detail/' + item.id}>{item.newsTitle}</Link>}
                                            description={<div><p>{item.newsBrief}</p><p>{item.create_time}</p></div>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Spin>
                    </div>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;