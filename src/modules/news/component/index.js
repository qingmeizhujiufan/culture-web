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

    detailrouter = (id) => {
        return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
    }

    render() {
        const {loading, listData, pagination} = this.state;

        return (
            <div className="page-content">
                <Spin spinning={loading}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={pagination}
                        dataSource={listData}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                            >
                                <List.Item.Meta
                                    avatar={<img style={{width: 180, height: 120}} alt="logo"
                                                 src={restUrl.BASE_HOST + item.newsCover.filePath}/>}
                                    title={<Link
                                        to={'/frame/news/detail/' + item.id}>{item.newsTitle}</Link>}
                                    description={item.newsBrief}
                                />
                                {item.create_time}
                            </List.Item>
                        )}
                    />
                </Spin>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;