import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
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
    Button
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import ZZList from 'Comps/zzList/';
import '../index.less';
import newsLogo from 'Img/news-logo.png';

const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'news/queryList';
const queryCityListUrl = restUrl.ADDR + 'city/queryList';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            cityList: [{
                id: '',
                cityName: '湖北'
            }],
            listData: [],
            conditionText: '',
            activeCity: ''
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

    componentWillReceiveProps = nextProps => {
        this.setState({
            loading: true,
            conditionText: sessionStorage.getItem('searchValue') ? sessionStorage.getItem('searchValue') : ''
        })
    }

    getList = callback => {
        const {pageNumber, conditionText, activeCity} = this.state;
        let param = {};
        param.pageNumber = pageNumber;
        param.pageSize = 10;
        param.conditionText = conditionText;
        param.cityId = activeCity;
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
        if (value === conditionText) return;

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

    renderItem = item => {
        return (
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
                        to={'/frame/news/detail/' + item.id}
                        className='zui-ellipsis-2'
                    >{item.newsTitle}</Link>}
                    description={<div>
                        <p>{item.newsBrief.length > 100 ? `${item.newsBrief.substring(0, 100)}...` : item.newsBrief}</p>
                        <p className='read-info'><Icon type="eye-o"/> {item.readNum}人</p>
                    </div>}
                />
            </List.Item>
        )
    }

    detailrouter = id => {
        this.context.router.push(`/frame/news/detail/${id}`);
    }

    render() {
        const {conditionText, activeCity, cityList} = this.state;

        return (
            <div className='page-news'>
                <div className="page-content news-bg">
                    <Row type="flex" justify="center" align="middle" style={{paddingTop: 60}}>
                        <Col>
                            <span style={{marginRight: 15}}><img src={newsLogo}/></span>
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
                </div>
                <div className="page-content">
                    <div className="content">
                        <ZZList
                            renderItem={this.renderItem}
                            queryUrl={queryListUrl}
                            queryParams={{
                                conditionText: conditionText,
                                cityId: activeCity
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Index.contextTypes = {
    router: PropTypes.object
}

export default Index;