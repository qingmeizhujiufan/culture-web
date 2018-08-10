import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Icon, Row, Col, Steps, Progress, List, Button, Carousel} from 'antd';
import '../index.css';
import '../home.less';
import banner1 from 'Img/banner1.jpg';
import banner2 from 'Img/banner2.jpg';
import banner3 from 'Img/banner3.jpg';

import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';

const queryNewsListUrl = restUrl.ADDR + 'news/queryList';
const queryHomeCulutreDetail = restUrl.ADDR + 'Server/queryHomeCulutreDetail';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textNews: [],
            pictureNews: [],
            cultureList: []
        };
    }

    componentDidMount = () => {
        this.getNewsList();
        this.queryHomeCultureDetail();
    }

    getNewsList = callback => {
        let param = {};
        param.pageNumber = 1;
        param.pageSize = 7;
        param.conditionText = '';
        param.cityId = null;
        ajax.getJSON(queryNewsListUrl, param, data => {
            if (data.success) {
                data = data.backData;
                this.setState({
                    textNews: data.slice(0,4),
                    pictureNews: data.slice(4)
                });
                console.log("data ===", data)
            } else {
                message.error(data.backMsg);
            }
        });
    }

    queryHomeCultureDetail = () => {
        ajax.getJSON(queryHomeCulutreDetail, '', (data) => {
            if (data.success) {
                const cultureList = [];
                data = data.backData;
                for (let key in data) {
                    cultureList.push(data[key]);
                }

                this.setState({
                    cultureList
                });
            } else {
                message.error(data.backMsg);
            }
        });
    }


    render() {
        const {cultureList, textNews, pictureNews} = this.state;
        const arrowProps = {
            currentSlide: 1,
            slideCount: 3
        };

        return (
            <div className="page-home">
                <div className="slider-box">
                    <Carousel
                        autoplay
                        autoplaySpeed={5000}
                        arrows
                        infinite
                    >
                        <div>
                            <div className='banner' style={{backgroundImage: `url(${banner1})`}}>
                                <div className='carousel-content'>
                                    <h1>湖北民俗文化</h1>
                                    <p>专注名俗文化传播，传承湖北民俗文化</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='banner' style={{backgroundImage: `url(${banner2})`}}>
                                <div className='carousel-content'>
                                    <h1>湖北民俗文化</h1>
                                    <p>专注名俗文化传播，传承湖北民俗文化</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='banner' style={{backgroundImage: `url(${banner3})`}}>
                                <div className='carousel-content'>
                                    <h1>湖北民俗文化</h1>
                                    <p>专注名俗文化传播，传承湖北民俗文化</p>
                                </div>
                            </div>
                        </div>
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
                                            dataSource={textNews}
                                            renderItem={item => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={<a>{item.newsTitle}</a>}
                                                        description={item.create_time.slice(0,10)}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                    <Col style={{width: 600, height: 370}}>
                                        <Carousel autoplay className='news-list-image'>
                                            {
                                                pictureNews.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className='wrap-img'>
                                                                <img src={restUrl.BASE_HOST + item.newsCover.filePath}/>
                                                                <div className='news-title'>{item.newsTitle}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Carousel>
                                    </Col>
                                </Row>
                            </article>
                        </section>
                        <section className='plate'>
                            <h1>文化展示</h1>
                            <p>最全面民俗旅游介绍、民俗艺术品的赏析</p>
                            <article className='box culture'>
                                <Carousel autoplay autoplaySpeed={5000}>
                                    {
                                        cultureList.map((item, index) => {
                                            if (index % 3 === 0) {
                                                return (
                                                    <div key={index}>
                                                        <div className='img-list'>
                                                            <Row type='flex'>
                                                                <Col className='wrap-img'>
                                                                    <img
                                                                        src={restUrl.BASE_HOST + cultureList[index].filePath}/>
                                                                </Col>
                                                                <Col className='wrap-img' style={{margin: '0 18px'}}>
                                                                    <img
                                                                        src={restUrl.BASE_HOST + cultureList[index + 1].filePath}/>
                                                                </Col>
                                                                <Col className='wrap-img'>
                                                                    <img
                                                                        src={restUrl.BASE_HOST + cultureList[index + 2].filePath}/>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
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
    router: PropTypes.object
}

export default Index;
