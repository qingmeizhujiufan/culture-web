import React from 'react';
import {Layout, Menu, Icon, Row, Col, Steps, Carousel, Progress, List, Card, BackTop} from 'antd';
import '../home.less';
import banner1 from 'Img/test/banner1.jpg';
import news from 'Img/test/news.jpg';
import part1 from 'Img/test/part1.jpg';
import part2 from 'Img/test/part2.jpg';
import part3 from 'Img/test/part3.jpg';

const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
const Step = Steps.Step;
const {Meta} = Card;


const data = [
    {
        title: '字字珠玑！习近平为青年传“经”授“诀”',
    },
    {
        title: '韩提议送还在华川蜀埋葬志愿军遗骸2.4… ',
    },
    {
        title: '韩进集团会长赵亮稿将受训，涉嫌贪污',
    },
    {
        title: '字字珠玑！习近平为青年传“经”授“诀”',
    },
];

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div className="page-content home">
                <div className="slider-box">
                    <Carousel autoplay>
                        <div><img src={banner1}/></div>
                        <div><img src={banner1}/></div>
                    </Carousel>
                </div>
                <Row style={{margin: '50px 0px 80px'}}>
                    <Col span={7} offset={2}>
                        <h2 style={{color: '#CB0909'}}>新闻<span style={{fontSize: 14}}>news</span></h2>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="2018-07-08"
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={3}/>
                    <Col span={10}>
                        <Carousel className='news-list'>
                            <div className='wrap-img'><img src={news}/></div>
                        </Carousel>
                    </Col>
                </Row>
                <Row style={{margin: '0px 0px 80px'}}>
                    <Col span={20} offset={2}>
                        <img src={part1} />
                    </Col>
                </Row>
                <Row style={{margin: '0px 0px 80px'}}>
                    <Col span={20} offset={2}>
                        <img src={part2} />
                    </Col>
                </Row>
                <Row style={{margin: '0px 0px 80px'}}>
                    <Col span={20} offset={2}>
                        <img src={part3} />
                    </Col>
                </Row>
                <BackTop>
                    <div className="ant-back-top-inner"><Icon type="up" /></div>
                </BackTop>
            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;
