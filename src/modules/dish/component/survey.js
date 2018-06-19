import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, Table, message, Avatar } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const getSurveyListUrl = restUrl.ADDR + 'survey/getSurveyList';

class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '满意程度',
            dataIndex: 'satisfaction',
            key: 'satisfaction',
        }, {
            title: '电话号码',
            dataIndex: 'telephone',
            key: 'telephone',
        }, {
            title: '建议内容',
            dataIndex: 'suggestion',
            key: 'suggestion',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }];

        this.state = {
            loading: false,
            data_1: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
            data_2: {
                satisfaction: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                dish: {
                    A: 0,
                    B: 0,
                    C: 0
                },
                clean: {
                    A: 0,
                    B: 0,
                    C: 0
                }
            },
        };
    }

    componentWillMount = () => { 
    }

    componentDidMount = () => {
      this.getSurveyList();
    }

    getSurveyList = () => {
      this.setState({
        loading: true
      });
      ajax.getJSON(getSurveyListUrl, null, data => {
        if(data.success){
          let data_1 = {
              satisfaction: {
                  A: 0,
                  B: 0,
                  C: 0
              },
              dish: {
                  A: 0,
                  B: 0,
                  C: 0
              },
              clean: {
                  A: 0,
                  B: 0,
                  C: 0
              }
          }, data_2 = {
              satisfaction: {
                  A: 0,
                  B: 0,
                  C: 0
              },
              dish: {
                  A: 0,
                  B: 0,
                  C: 0
              },
              clean: {
                  A: 0,
                  B: 0,
                  C: 0
              }
          };
          data = data.backData;
          data.map(item => {
            item.key = item.id;
            if(item.companyId === '1') {
                if (item.satisfaction === '满意') data_1.satisfaction.A++;
                else if (item.satisfaction === '一般') data_1.satisfaction.B++;
                else data_1.satisfaction.C++;

                if (item.dish === '满意') data_1.dish.A++;
                else if (item.dish === '一般') data_1.dish.B++;
                else data_1.dish.C++;

                if (item.clean === '满意') data_1.clean.A++;
                else if (item.clean === '一般') data_1.clean.B++;
                else data_1.clean.C++;
            }
            if(item.companyId === '2'){
                if (item.satisfaction === '满意') data_2.satisfaction.A++;
                else if (item.satisfaction === '一般') data_2.satisfaction.B++;
                else data_2.satisfaction.C++;

                if (item.dish === '满意') data_2.dish.A++;
                else if (item.dish === '一般') data_2.dish.B++;
                else data_2.dish.C++;

                if (item.clean === '满意') data_2.clean.A++;
                else if (item.clean === '一般') data_2.clean.B++;
                else data_2.clean.C++;
            }
          });
          this.setState({
            data_1,
            data_2
          });
        }
        this.setState({
          loading: false
        });
      });
    }

  render() {
    const { data_1, data_2, loading } = this.state;

    return (
    <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>就餐服务管理</Breadcrumb.Item>
            <Breadcrumb.Item>满意度调查管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>满意度调查管理</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
            
            <Tabs defaultActiveKey="1">
              <TabPane tab="一楼食堂" key="1">
                  <Row gutter={32} className="survey-result">
                      <Col span={8}>
                          <h1>服务</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_1.satisfaction.A}</span></h2>
                          <h2><span>一般:</span><span>{data_1.satisfaction.B}</span></h2>
                          <h2><span>差:</span><span>{data_1.satisfaction.C}</span></h2>
                      </Col>
                      <Col span={8}>
                          <h1>菜品</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_1.dish.A}</span></h2>
                          <h2><span>一般:</span><span>{data_1.dish.B}</span></h2>
                          <h2><span>差:</span><span>{data_1.dish.C}</span></h2>
                      </Col>
                      <Col span={8}>
                          <h1>卫生</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_1.clean.A}</span></h2>
                          <h2><span>一般:</span><span>{data_1.clean.B}</span></h2>
                          <h2><span>差:</span><span>{data_1.clean.C}</span></h2>
                      </Col>
                  </Row>
              </TabPane>
              <TabPane tab="二楼食堂" key="2">
                  <Row gutter={32} className="survey-result">
                      <Col span={8}>
                          <h1>服务</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_2.satisfaction.A}</span></h2>
                          <h2><span>一般:</span><span>{data_2.satisfaction.B}</span></h2>
                          <h2><span>差:</span><span>{data_2.satisfaction.C}</span></h2>
                      </Col>
                      <Col span={8}>
                          <h1>菜品</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_2.dish.A}</span></h2>
                          <h2><span>一般:</span><span>{data_2.dish.B}</span></h2>
                          <h2><span>差:</span><span>{data_2.dish.C}</span></h2>
                      </Col>
                      <Col span={8}>
                          <h1>卫生</h1>
                          <Divider />
                          <h2><span>满意:</span><span>{data_2.clean.A}</span></h2>
                          <h2><span>一般:</span><span>{data_2.clean.B}</span></h2>
                          <h2><span>差:</span><span>{data_2.clean.C}</span></h2>
                      </Col>
                  </Row>
              </TabPane>
            </Tabs>
          </Spin>
        </div>
    </div>
    );
  }
}

Survey.contextTypes = {  
  router: React.PropTypes.object  
} 

export default Survey;