import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Icon,
    List,
    Divider,
    Breadcrumb,
    Badge,
    notification,
    Spin,
    message,
    Button,
    BackTop
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';

const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'news/queryList';

const cityList = [
    {
        id: '1',
        name: '湖北'
    },
    {
        id: '2',
        name: '武汉市'
    },
    {
        id: '3',
        name: '宜昌市'
    },
    {
        id: '4',
        name: '孝感市'
    },
    {
        id: '5',
        name: '荆门市'
    },
    {
        id: '6',
        name: '鄂州市'
    },
    {
        id: '7',
        name: '黄冈市'
    },

];

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            listData: [],
            conditionText: '',
            activeCity: '1'
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.setState({loading: true});
        this.getList(data => {
            this.setState({
                listData: data.backData,
                loading: false
            });
        });
    }

    onChangeCity = id => {
        const city = _.find(cityList, {id: id});
        if(this.state.activeCity === city) return;
        this.setState({activeCity: id});
    }

    getList = callback => {
        const {pageNumber, conditionText} = this.state;
        let param = {};
        param.pageNumber = pageNumber;
        param.pageSize = 10;
        param.conditionText = conditionText;
        ajax.getJSON(queryListUrl, param, data => {
            if (data.success) {
                if (typeof callback === 'function') callback(data);

            } else {
                message.error(data.backMsg);
            }
        });
    }

    onLoadMore = () => {
        let {listData, pageNumber, total} = this.state;
        this.setState({
            loadingMore: true,
            pageNumber: ++pageNumber
        }, () => {
            this.getList((data) => {
                const _data = listData.concat(data.backData);
                this.setState({
                    listData: _data,
                    loadingMore: false,
                });
            });
        });
    }

    onSearch = value => {
        const {conditionText} = this.state;
        if(value === conditionText) return;

        this.setState({
            loading: true,
            pageNumber: 1,
            conditionText: value
        }, () => {
            this.getList(data => {
                this.setState({
                    listData: data.backData,
                    loading: false
                });
            });
        });
    }

    detailrouter = id => {
        this.context.router.push(`/frame/news/detail/${id}`);
    }

    render() {
        const {loading, showLoadingMore, loadingMore, listData, activeCity} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}><Icon type="plus"/> 加载更多</Button>}
            </div>
        ) : null;

        return (
            <div className='page-news'>
                <div className="page-content news-bg">
                    <Row>
                        <Col span={10} offset={7}>
                            <Row type="flex" justify="center" align="middle" style={{paddingTop: 60}}>
                                <Col>
                                    <span style={{marginRight: 30, fontSize: 22, color: '#fff'}}>民俗新闻</span>
                                </Col>
                                <Col>
                                    <Search
                                        placeholder="请输入搜索的内容"
                                        enterButton={<span><Icon type="search"/> 搜索</span>}
                                        size="large"
                                        onSearch={value => this.onSearch(value)}
                                        style={{width: 600}}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="page-content city-section">
                    <div className="content clearfix">
                        <ul className='zui-unstyled inline zui-pull-left city-list'>
                            {
                                cityList.map(item => {
                                    return (
                                        <li key={item.id} className={item.id === activeCity ? 'active' : null} onClick={() => this.onChangeCity(item.id)}>{item.name}</li>
                                    )
                                })
                            }
                        </ul>
                        <div className='zui-pull-right'>
                            <span>更多</span>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="content">
                        <Spin spinning={loading} size={"large"}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                loadMore={loadMore}
                                dataSource={listData}
                                renderItem={item => (
                                    <List.Item
                                        key={item.id}
                                        extra={<div className='extra'>
                                            <Row type="flex" justify="space-between" align="middle">
                                                <Col span={6}>
                                                    <Divider type='vertical'/>
                                                </Col>
                                                <Col span={12}>
                                                    <div>
                                                        <div style={{
                                                            fontSize: 22,
                                                            color: '#2D2D2D'
                                                        }}>{item.create_time.substring(5, 10)}</div>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: '#7B7B7B'
                                                        }}>{item.create_time.substring(0, 4)}</div>
                                                    </div>
                                                </Col>
                                                <Col span={6} style={{textAlign: 'right'}}>
                                                    <Icon type="right"/>
                                                </Col>
                                            </Row>
                                        </div>}
                                        onClick={() => this.detailrouter(item.id)}
                                    >
                                        <List.Item.Meta
                                            avatar={<img style={{width: 232, height: 180}}
                                                         src={restUrl.BASE_HOST + item.newsCover.filePath}/>}
                                            title={<Link
                                                to={'/frame/news/detail/' + item.id}>{item.newsTitle}</Link>}
                                            description={<div>
                                                <p>{item.newsBrief}</p>
                                                <p className='read-info'><Icon type="eye-o" /> {127}人</p>
                                            </div>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Spin>
                    </div>
                </div>
                <BackTop>
                    <div className="zui-up"><Icon type="up"/></div>
                </BackTop>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;