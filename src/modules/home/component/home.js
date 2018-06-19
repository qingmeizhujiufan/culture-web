import React from 'react';
import { Layout, Menu, Icon, Row, Col, Steps, Carousel, Progress, Timeline, Card } from 'antd';
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import ZZHeader from 'Comps/zzHeader/zzHeader';
import ZZLeftSide from 'Comps/zzLeftSide/zzLeftSide';
import '../home.less';
import profile from 'Img/profile-cover.jpg';
import cover from 'Img/cover.jpg';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Step = Steps.Step;
const { Meta } = Card;

class Index extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount = () => {
    this.getCharts();
  }

  getCharts = () => {
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('类目' + i);
        data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    }

    let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#ddd'
            }
        },
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
            color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    },
    legend: {
        right: 20,
        orient: 'vertical',
        data: ['今日','昨日']
    },
    xAxis: {
        type: 'category',
        data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
        boundaryGap: false,
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: ['#D4DFF5']
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#609ee9'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: ['#D4DFF5']
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#609ee9'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        }
    },
    series: [{
        name: '今日',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(199, 237, 250,0.5)'
                }, {
                    offset: 1,
                    color: 'rgba(199, 237, 250,0.2)'
                }], false)
            }
        },
        itemStyle: {
            normal: {
                color: '#f7b851'
            }
        },
        lineStyle: {
            normal: {
                width: 3
            }
        }
    }, {
        name: '昨日',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(216, 244, 247,1)'
                }, {
                    offset: 1,
                    color: 'rgba(216, 244, 247,1)'
                }], false)
            }
        },
        itemStyle: {
            normal: {
                color: '#58c8da'
            }
        },
        lineStyle: {
            normal: {
                width: 3
            }
        }
    }]
};

    let chart = this.refs.chart.id;
    let myChart = echarts.init(document.getElementById(chart));
    myChart.setOption(option);
  }

  render() {
    return (
      <div className="zui-content home">
        <Row type="flex" justify="space-between" align="middle" className="base-info">
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="cloud" className="icon" style={{backgroundColor: '#2dcb73', color: '#c0efd5'}} /></Col>
                <Col>
                  <h3>5468</h3>
                  <span>New signups</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="html5" className="icon" style={{backgroundColor: '#ff604f', color: '#ffcfca'}} /></Col>
                <Col>
                  <h3>2,300</h3>
                  <span>Total equity</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="youtube" className="icon" style={{backgroundColor: '#dde1e7', color: '#424445'}} /></Col>
                <Col>
                  <h3>3,823</h3>
                  <span>Views today</span>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={6}>
            <div className="base-box">
              <Row type="flex" align="middle">
                <Col><Icon type="twitter" className="icon" style={{backgroundColor: 'transparent', color: '#000'}} /></Col>
                <Col>
                  <h3>12</h3>
                  <span>Fog Overcast</span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={9}>
            <div className="slider-box">
              <Carousel autoplay>
                <div><img src={profile} /></div>
                <div><img src={cover} /></div>
              </Carousel>
              <div className="footer">这是首页轮播图</div>
            </div>
          </Col>
          <Col span={10}>
            <div className="ibox-title">
                <h5>订单情况</h5>
            </div>
            <div className="ibox-content">
              <Row type="flex" justify="space-between" align="top">
                <Col span={8}>
                  <Progress type="dashboard" percent={75} format={(percent)=> percent + '%'} style={{margin: '25px 0'}} />
                  <div>
                    <h3>完成率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={70} status="exception" format={(percent)=> percent + '%'} style={{margin: '25px 0'}} />
                  <div>
                    <h3>取消率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={80} status="success" format={(percent)=> percent + '%'} style={{margin: '25px 0'}} />
                  <div>
                    <h3>支付达成率</h3>
                    <p>这是说明</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={5}>
            <div className="ibox-title">
                <h5>项目进度</h5>
            </div>
            <div className="ibox-content">
              <Steps direction="vertical" current={1}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{marginTop: '15px'}}>
          <Col span={7}>
            <div className="ibox-title" style={{backgroundColor: '#fc5a59'}}>
                <h5 style={{color: '#fff'}}>这是标题</h5>
            </div>
            <div className="ibox-content">
              <Timeline>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>
            </div>
          </Col>
          <Col span={12}>
            <div className="ibox-title" style={{backgroundColor: '#6495ed'}}>
                <h5 style={{color: '#fff'}}>这是图表</h5>
            </div>
            <div className="ibox-content" style={{padding: 0}}>
              <div ref="chart" id="chart" style={{width: '90%', height: '400px'}}></div>
            </div>
          </Col>
          <Col span={5}>
            <Card
              hoverable
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Index.contextTypes = {  
     router:React.PropTypes.object  
} 

export default  Index;
