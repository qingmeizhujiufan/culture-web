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
import videoLogo from 'Img/video-logo.png';

const Search = Input.Search;
const queryListUrl = restUrl.ADDR + 'video/queryList';

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
        this.context.router.push(`/frame/video/detail/${id}`);
    }


    renderItem = item => {
        return (
            <div key={item.id} className='zui-card-item'>
                <div className='zui-card-item-header'>
                    <img src={item.artCover ? (restUrl.BASE_HOST + item.artCover[0].filePath) : null}/>
                    <span className='title'><span className='iconfont icon-bofang'></span>{item.artTitle}</span>
                    <span className='sub-title'>这是副标题</span>
                    <span className='mask'></span>
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
            <div className='page-video'>
                <div className="page-content video-bg">
                    <Row type="flex" justify="center" align="middle" style={{paddingTop: 60}}>
                        <Col>
                            <span style={{marginRight: 15}}><img src={videoLogo}/></span>
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
                        <ZZCardList
                            renderItem={this.renderItem}
                            queryUrl={queryListUrl}
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