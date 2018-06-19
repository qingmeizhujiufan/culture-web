import React from 'react';
import { Form, Row, Col, Breadcrumb, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../dish.less';

const FormItem = Form.Item;
const Option = Select.Option;

const getDishDetailInfoUrl = restUrl.ADDR + 'server/getDishDetail';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class ProductDetailInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	attachesFileList: [],
    	coverAttachesFileList: [],
    };
  }

  componentDidMount = () => {
  	this.getDishDetailInfo();
  }

  //获取菜品详情
  getDishDetailInfo = (id) => {
  	let param = {};
  	param.id = this.props.params.id;
  	ajax.getJSON(getDishDetailInfoUrl, param, (data) => {
  		data =  data.backData;
  		data.dish_img = restUrl.BASE_HOST + 'UpLoadFile/' + data.dish_img + '.png';
		this.setState({
			data
		});
  	});
  }

  render() {
  	let { data } = this.state;

    return (
      <div className="zui-content">
      	<div className="breadcrumb-block">
	    	<Breadcrumb>
	            <Breadcrumb.Item>首页</Breadcrumb.Item>
	            <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
	            <Breadcrumb.Item>菜单列表</Breadcrumb.Item>
	            <Breadcrumb.Item>菜单详情</Breadcrumb.Item>
	        </Breadcrumb>
	    </div>
      	<div className="ibox-title">
            <h5>菜单详情</h5>
        </div>
        <div className="ibox-content">
	      	<Form>
	      		<Row>
	      			<Col span={12}>	    
				        <FormItem
				            label="食堂"
				            {...formItemLayout}
				        >
				          	<Select value={data.companyId}>
					            <Option value={'1'}>一楼食堂</Option>
					            <Option value={'2'}>二楼食堂</Option>
					        </Select>
				        </FormItem>
				    </Col>
				    <Col span={12}>
				        <FormItem
				            label="用餐时间"
				            {...formItemLayout}
				         >
				         	<Select value={data.dish_type}>
				                <Option value={'早餐'}>早餐</Option>
				                <Option value={'午餐'}>午餐</Option>
				                <Option value={'晚餐'}>晚餐</Option>
				            </Select>
				        </FormItem>
				    </Col>
			    </Row>
	      		<Row>
	      			<Col span={12}>
				        <FormItem
				            label="菜品名称"
				            {...formItemLayout}
				        >
				        	<Input value={data.dish_title} disabled />
				        </FormItem>
				    </Col>
	      			<Col span={12}>
	      				<FormItem
				            label="菜品图片"
				            {...formItemLayout}
				          >
				          	<ul className="unstyled inline detail-imglist">
				            	<li>
	            					<img src={data.dish_img} />
	            				</li>
				            </ul>
				        </FormItem>	      	
	      			</Col>
	      		</Row>
			    <Row>
				    <Col span={12}>
				        <FormItem
				            label="说明"
				            {...formItemLayout}
				        >
				        	<Input.TextArea autosize={{minRows: 4, maxRows: 6}} value={data.dish_content} disabled />
				        </FormItem>
				    </Col>
			    </Row>
	        </Form>
	    </div>
      </div>
    );
  }
}

export default ProductDetailInfo;
