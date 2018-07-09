import React from 'react';
import { Row, Col, Icon, Divider, Breadcrumb, Input, Button, Spin, notification, message  } from 'antd';
import _ from 'lodash';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../dish.less';

const getBrandGroupUrl = restUrl.ADDR + 'Product/getBrandList';
const saveBrandUrl = restUrl.ADDR + 'Product/saveBrand';
const delBrandUrl = restUrl.ADDR + 'Product/delBrand';

const Search = Input.Search;

class BrandAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectStructuralSectionOptions: [],
      selectHardwareOptions: [],
      selectSealantOptions: [],
      loading_1: true,
      loading_2: true,
      loading_3: true
    };
  }

  componentWillMount = () => { 
  }

  componentDidMount = () => { 
    this.getBrandGroup(1);
    this.getBrandGroup(2);
    this.getBrandGroup(3);
  }

  //获取型材、五金、密封胶品牌，type选择
  getBrandGroup = (type) => {
    let param = {};
    param.type = type;
    ajax.getJSON(getBrandGroupUrl, param, (data) => {
      data =  eval('(' + data.backData + ')');
      if(type === 1){
        this.setState({
          selectStructuralSectionOptions: data,
          loading_1: false
        });
      } else if(type === 2) {
        this.setState({
          selectHardwareOptions: data,
          loading_2: false
        });
      } else {
        this.setState({
          selectSealantOptions: data,
          loading_3: false
        });
      }
    });
  }

  saveBrand = (name, type) => {
    let param = {};
    param.name = name;
    param.type = type;
    if(name === ''){
      message.warning('品牌名称不能为空！');
      return;
    }
    if(type === 1){
      if(_.find(this.state.selectStructuralSectionOptions, {name: name})){
        message.warning('不能重复添加同一品牌！');
        return;
      }
      this.setState({loading_1: true});
    } else if(type === 2) {
      if(_.find(this.state.selectHardwareOptions, {name: name})){
        message.warning('不能重复添加同一品牌！');
        return;
      }
      this.setState({loading_2: true});
    } else {
      if(_.find(this.state.selectSealantOptions, {name: name})){
        message.warning('不能重复添加同一品牌！');
        return;
      }
      this.setState({loading_3: true});
    }

    ajax.postJSON(saveBrandUrl, JSON.stringify(param), (data) => {
      if(type === 1){
        this.getBrandGroup(1);
      } else if(type === 2) {
        this.getBrandGroup(2);
      } else {
        this.getBrandGroup(3);
      }

      notification.open({
        message: '添加成功！',
        description: '品牌添加完毕，注意查看',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      });
    });
  }

  delBrand = (item, type) => {
    let param = {};
    param.id = item.id;
    if(type === 1){
      this.setState({loading_1: true});
    } else if(type === 2) {
      this.setState({loading_2: true});
    } else {
      this.setState({loading_3: true});
    }
    console.log('delBrand param == ', param);
    ajax.postJSON(delBrandUrl, JSON.stringify(param), (data) => {
      if(type === 1){
        this.getBrandGroup(1);
      } else if(type === 2) {
        this.getBrandGroup(2);
      } else {
        this.getBrandGroup(3);
      }

      notification.open({
        message: '删除成功！',
        description: '品牌删除完毕，注意查看',
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
      });
    });
  }

  render() {
    const { selectStructuralSectionOptions, selectHardwareOptions, selectSealantOptions, loading_1, loading_2, loading_3 } = this.state;
    console.log('selectStructuralSectionOptions === ', selectStructuralSectionOptions);
    return (
      <div className="zui-content brandAdmin">
        <div className="breadcrumb-block">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>产品管理</Breadcrumb.Item>
            <Breadcrumb.Item>品牌管理</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row gutter={16}>
          <Col span={8}>
            <div className="ibox-title">
                <h5>门窗品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => this.saveBrand(value, 1)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <Spin spinning={loading_1} indicator={<Icon type="loading" />}>
                <ul className="unstyled inline brands">
                  {
                    selectStructuralSectionOptions.map((item, index) => {
                      return <li key={index}>
                        <span>{item.name}</span>
                        <span className="del" onClick={ () => this.delBrand(item, 1)}><Icon type="close-square" /></span>
                      </li>
                    })
                  }
                </ul>
              </Spin>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                <h5>五金配件品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => this.saveBrand(value, 2)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <Spin spinning={loading_2} indicator={<Icon type="loading" />}>
                <ul className="unstyled inline brands">
                  {
                    selectHardwareOptions.map((item, index) => {
                      return <li key={index}>
                        <span>{item.name}</span>
                        <span className="del" onClick={ () => this.delBrand(item, 2)}><Icon type="close-square" /></span>
                      </li>
                    })
                  }
                </ul>
              </Spin>
            </div>
          </Col>
          <Col span={8}>
            <div className="ibox-title">
                <h5>密封胶品牌</h5>
            </div>
            <div className="ibox-content">
              <Search
                placeholder="请输入品牌名称..."
                onSearch={value => this.saveBrand(value, 3)}
                enterButton={<div><Icon type="plus" />添加</div>}
              />
              <Spin spinning={loading_3} indicator={<Icon type="loading" />}>
                <ul className="unstyled inline brands">
                  {
                    selectSealantOptions.map((item, index) => {
                      return <li key={index}>
                        <span>{item.name}</span>
                        <span className="del" onClick={ () => this.delBrand(item, 3)}><Icon type="close-square" /></span>
                      </li>
                    })
                  }
                </ul>
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

BrandAdmin.contextTypes = {  
  router: React.PropTypes.object  
} 

export default BrandAdmin;