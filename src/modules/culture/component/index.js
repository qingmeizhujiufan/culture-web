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
    Card,
    BackTop
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import ZZList from 'Comps/zzList/';
import ZZCardList from "Comps/zzCardList";
import '../index.less';

const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'culture/queryList';
const queryArtListUrl = restUrl.ADDR + 'art/queryList';
const queryCityListUrl = restUrl.ADDR + 'city/queryList';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            type: this.props.params.type ? parseInt(this.props.params.type) : 1,
            cityList: [{
                id: '',
                cityName: '湖北'
            }],
            showMoreCity: false,
            conditionText: '',
            activeCity: ''
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
        this.getCityList();
    }

    componentWillReceiveProps = nextProps => {
        this.setState({
            loading: true,
            conditionText: sessionStorage.getItem('searchValue') ? sessionStorage.getItem('searchValue') : ''
        })
    }

    getCityList = () => {
        let param = {};
        ajax.getJSON(queryCityListUrl, param, data => {
            if (data.success) {
                let cityList = [...this.state.cityList].concat(data.backData);
                this.setState({
                    cityList,
                });
            }
        });
    }

    onChangeType = type => {
        this.setState({type});
    }

    onMoreCity = () => {
        this.setState({
            showMoreCity: !this.state.showMoreCity
        });
    }

    onChangeCity = id => {
        const {cityList, activeCity} = this.state;
        const city = _.find(cityList, {id: id});
        if (activeCity === city) return;
        this.setState({
            activeCity: id,
            conditionText: ''
        });
    }

    onSearch = value => {
        const {conditionText} = this.state;
        if (value === conditionText) return;

        this.setState({
            loading: true,
            conditionText: value
        });
    }

    detailrouter = id => {
        this.context.router.push(`/frame/culture/detail/${id}`);
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
                                 src={restUrl.BASE_HOST + item.cultureCover.filePath}/>}
                    title={<Link
                        to={'/frame/culture/detail/' + item.id}>{item.cultureTitle}</Link>}
                    description={<div>
                        <p>{item.cultureBrief.length > 100 ? `${item.cultureBrief.substring(0, 100)}...` : item.cultureBrief}</p>
                        <p className='read-info'><Icon type="eye-o"/> {item.readNum}人<span
                            style={{marginLeft: 35}}><Icon
                            type="star-o"/> {item.collectNum}人</span></p>
                    </div>}
                />
            </List.Item>
        );
    }

    renderArtItem = item => {
        return (
            <div key={item.id} className='zui-card-item'>
                <Link to={'frame/culture/artDetail/' + item.id}>
                    <div className='zui-card-item-header'>
                        <img src={item.artCover ? (restUrl.BASE_HOST + item.artCover[0].filePath) : null}/>
                    </div>
                    <div className='zui-card-item-content'>
                        <div className='zui-ellipsis'>{item.artTitle}</div>
                        <div className='price'>{`¥${item.artMoney.toFixed(2)}`}</div>
                    </div>
                    <div className='zui-card-item-footer'>
                        <span><Icon type="eye-o"/> {item.readNum}人</span>
                        <span style={{marginLeft: 35}}><Icon type="star-o"/> {item.collectNum}人</span>
                    </div>
                </Link>
            </div>
        );
    }

    render() {
        const {activeCity, cityList, type, conditionText, showMoreCity} = this.state;

        return (
            <div className='page-culture'>
                <div className="page-content culture-bg">
                    <Row>
                        <Col span={10} offset={7}>
                            <Row type="flex" justify="center" align="middle" style={{paddingTop: 36}}>
                                <Col>
                                    <div className='type-group'>
                                        <span className={type === 1 ? 'type-active' : null}
                                              onClick={() => this.onChangeType(1)}>旅游</span>
                                        <span className={type === 2 ? 'type-active' : null}
                                              onClick={() => this.onChangeType(2)}>艺术品</span>
                                    </div>
                                    <Search
                                        placeholder="请输入搜索的内容"
                                        defaultValue={conditionText}
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
                <div className="page-content city-section"
                     style={{height: showMoreCity ? 'auto' : 53}}
                >
                    <div className="content clearfix">
                        <ul className='zui-unstyled inline zui-pull-left city-list'>
                            {
                                cityList.map(item => {
                                    return (
                                        <li key={item.id} className={item.id === activeCity ? 'active' : null}
                                            onClick={() => this.onChangeCity(item.id)}>{item.cityName}</li>
                                    )
                                })
                            }
                        </ul>
                        <div className='content-more' onClick={this.onMoreCity}>
                            <span>更多<Icon type ={showMoreCity ? 'up': 'down'} style={{marginLeft:5}}></Icon></span>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    <div className="content">
                        {
                            type === 1 ? (
                                <ZZList
                                    renderItem={this.renderItem}
                                    queryUrl={queryListUrl}
                                    queryParams={{
                                        conditionText: conditionText,
                                        cityId: activeCity
                                    }}
                                />
                            ) : (
                                <ZZCardList
                                    renderItem={this.renderArtItem}
                                    queryUrl={queryArtListUrl}
                                    queryParams={{
                                        conditionText: conditionText,
                                        cityId: activeCity
                                    }}
                                />
                            )
                        }
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
    router: PropTypes.object
}

export default Index;