import React from 'react';
import {Layout, Menu, Icon, Row, Col, Steps, Progress, List, Card, Carousel} from 'antd';
import Slider from 'react-slick';
import '../index.css';
import '../home.less';
import banner1 from 'Img/test/banner1.png';
import banner2 from 'Img/cover.jpg';
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

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "red"}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{...style, display: "block", background: "green"}}
            onClick={onClick}
        />
    );
}


class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <div className="page-home">
                <div className="slider-box">
                    <Carousel autoplay>
                        {
                            [1, 2, 3].map((item, index) => (
                                <div key={index}>
                                    <div className='banner' style={{backgroundImage: `url(${banner1})`}}>
                                        <div className='carousel-content'>
                                            <h1>湖北民俗文化</h1>
                                            <p>专注名俗文化传播，传承湖北民俗文化</p>
                                            <span className='follow'><Icon type="wechat"/> 关注公众号</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <div className='page-content'>
                    <div className='content'>
                        <section className='plate'>
                            <h1>民俗新闻</h1>
                            <p>最全面、最前沿的民俗文化新闻资讯</p>
                            <article className='box news'>
                                <Row type="flex" justify="center" align="middle">
                                    <Col style={{width: 464, margin: '0 52px'}}>
                                        <List
                                            className='news-list'
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
                                    <Col style={{width: 600, height: 370}}>
                                        <Carousel className='news-list-image'>
                                            <div className='wrap-img'><img src={news}/></div>
                                        </Carousel>
                                    </Col>
                                </Row>
                            </article>
                        </section>
                        <section className='plate'>
                            <h1>文化展示</h1>
                            <p>最全面民俗旅游介绍、民俗艺术品的赏析</p>
                            <article className='box culture'>
                                <Carousel>
                                    <div>
                                        <div className='img-list'>
                                            <Row type='flex'>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img' style={{margin: '0 18px'}}>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='img-list'>
                                            <Row type='flex'>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img' style={{margin: '0 18px'}}>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='img-list'>
                                            <Row type='flex'>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img' style={{margin: '0 18px'}}>
                                                    <img src={banner2}/>
                                                </Col>
                                                <Col className='wrap-img'>
                                                    <img src={banner2}/>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Carousel>
                            </article>
                        </section>
                        <section className='plate'>
                            <h1>民俗特色</h1>
                            <p>最全面民俗旅游介绍、民俗艺术品的赏析</p>
                            <article className='box art'>

                            </article>
                        </section>
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
