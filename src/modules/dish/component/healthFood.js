import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Input, Icon, List, Divider, Breadcrumb, Badge, notification, Spin, Tabs, message, Button } from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';
const Search = Input.Search;
const TabPane = Tabs.TabPane;
const getHealthListUrl = restUrl.ADDR + 'health/getHealthList';
const delHealthUrl = restUrl.ADDR + 'health/delHealth';

class HealthFoodList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            listData_1: [],
            listData_2: [],
            pagination_1: {
                pageSize: 10,
                current: 1,
                total: 0
            },
            pagination_2: {
                pageSize: 10,
                current: 1,
                total: 0
            }
        };
    }

    componentWillMount = () => { 
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
      this.setState({
        loading: true
      });
        let param = {};
        ajax.getJSON(getHealthListUrl, param, data => {
           if(data.success){
               let backData = data.backData;
               let listData_1 = [];
               let listData_2 = [];
               backData.map((item, index) => {
                   if(item.companyId === '1'){
                       listData_1.push(item);
                   }else if(item.companyId === '2'){
                       listData_2.push(item);
                   }
               });
               this.setState({
                   listData_1,
                   listData_2,
                   pagination_1: {
                       total: listData_1.length
                   },
                   pagination_2: {
                       total: listData_2.length
                   },
                   loading: false
               });
           }
        });
    }

    delHealth = id => {
      this.setState({
        loading: true
      });
      let param = {};
      param.id = id;
      ajax.postJSON(delHealthUrl, JSON.stringify(param), data => {
        if(data.success){
          this.setState({
            loading: false
          }, () => {
            this.getList();
          });
          
        }else {

        }
      });
    }

    detailrouter = (id) => {
      return `/frame/dish/dishDetailInfo/${id}`
    }

    editrouter = (id) => {
        return `/frame/dish/editDish/${id}`
    }

  render() {
    const { loading, listData_1, listData_2, pagination_1, pagination_2 } = this.state;

    return (
    <div className="zui-content">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>就餐服务管理</Breadcrumb.Item>
            <Breadcrumb.Item>健康饮食信息管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ibox-title">
            <h5>健康饮食信息列表</h5>
        </div>
        <div className="ibox-content">
          <Spin spinning={loading}>
              <Tabs defaultActiveKey="1">
                  <TabPane tab="一楼食堂" key="1">
                      <List
                          itemLayout="vertical"
                          size="large"
                          pagination={pagination_1}
                          dataSource={listData_1}
                          renderItem={item => (
                              <List.Item
                                  key={item.id}
                                  extra={<img style={{width: 180, height: 120}} alt="logo" src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'} />}
                              >
                                  <List.Item.Meta
                                      title={<Link to={'/frame/dish/editHealth/' + item.id}>{item.health_title}</Link>}
                                      description={item.health_desc}
                                  />
                                  {item.create_time} <Button onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                              </List.Item>
                          )}
                      />
                  </TabPane>
                  <TabPane tab="二楼食堂" key="2">
                      <List
                          itemLayout="vertical"
                          size="large"
                          pagination={pagination_2}
                          dataSource={listData_2}
                          renderItem={item => (
                              <List.Item
                                  key={item.id}
                                  extra={<img style={{width: 180, height: 120}} alt="logo" src={ restUrl.BASE_HOST + 'UpLoadFile/' + item.health_cover + '.png'} />}
                              >
                                  <List.Item.Meta
                                      title={<Link to={'/frame/dish/editHealth/' + item.id}>{item.health_title}</Link>}
                                      description={item.health_desc}
                                  />
                                  {item.create_time} <Button onClick={this.delHealth.bind(null, item.id)}>删除</Button>
                              </List.Item>
                          )}
                      />
                  </TabPane>
              </Tabs>
          </Spin>
        </div>
    </div>
    );
  }
}

HealthFoodList.contextTypes = {  
  router: React.PropTypes.object  
} 

export default HealthFoodList;