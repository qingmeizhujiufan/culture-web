import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Input,
    Icon,
    BackTop
} from 'antd';
import restUrl from 'RestUrl';
import ZZCardList from "Comps/zzCardList";
import '../index.less';

const Search = Input.Search;
const queryArtListUrl = restUrl.ADDR + 'art/queryList';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            conditionText: '',
        };
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {
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
            <div key={item.id} className='zui-card-item'>
                <div className='zui-card-item-header'>
                    <img src={item.artCover ? (restUrl.BASE_HOST + item.artCover.filePath) : null}/>
                </div>
                <div className='zui-card-item-footer'>
                    <span><Icon type="eye-o"/> {127}人</span>
                </div>
            </div>
        );
    }

    render() {
        const {conditionText} = this.state;

        return (
            <div className='page-culture'>
                <div className="page-content culture-bg">
                    <Row>
                        <Col span={10} offset={7}>
                            <Row type="flex" justify="center" align="middle" style={{paddingTop: 60}}>
                                <Col>
                                    <span style={{marginRight: 30, fontSize: 22, color: '#fff'}}>民俗视频</span>
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
                <div className="page-content">
                    <div className="content">
                        <ZZCardList
                            renderItem={this.renderItem}
                            queryUrl={queryArtListUrl}
                            queryParams={{
                                conditionText: conditionText
                            }}
                        />
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