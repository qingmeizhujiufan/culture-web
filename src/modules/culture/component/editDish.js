import React from 'react';
import { Form, Row, Col, Icon, Input, InputNumber, Dropdown, Menu, Avatar, Select, Divider, Button, Upload, notification, Spin } from 'antd';
import ajax from 'Utils/ajax';
import restUrl from 'RestUrl';
import '../dish.less';

const FormItem = Form.Item;
const Option = Select.Option;

const getDishDetailInfoUrl = restUrl.ADDR + 'server/getDishDetail';
const saveDishtUrl = restUrl.ADDR + 'server/saveAPDish';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

class EditDish extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	data: {},
    	fileList: [],
    	loading: false
    };
  }

  componentDidMount = () => {
  	this.getDishDetailInfo();
  }

  //获取菜品详情
  getDishDetailInfo = (id) => {
  	this.setState({
        loading: true
    });
  	let param = {};
  	param.id = this.props.params.id;
  	ajax.getJSON(getDishDetailInfoUrl, param, (data) => {
  		let backData =  data.backData;
  		const fileList = [{
			uid: -1,
			name: backData.dish_img + '.png',
			status: 'done',
			url: restUrl.BASE_HOST + 'UpLoadFile/' + backData.dish_img + '.png',
            response: {
                data: {
                    id: backData.dish_img
                }
            }
	    }];
        backData.dish_img = fileList;
		this.setState({
			data: backData,
			fileList,
			loading: false
		});
  	});
  }

  handleChange = ({ fileList }) => {
  	let {data} = this.state;
    data.dish_img = fileList;
    this.setState({ 
        fileList,
        data
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    	console.log('Received err: ', err);
      if (!err) {
        console.log('Received values of form: ', values);
        values.id = this.props.params.id;
        values.dish_img = values.dish_img.map((item, index) => {
        	return item.response.data.id;
        }).join(',');
        console.log('handleSubmit  param === ', values);
        
        ajax.postJSON(saveDishtUrl, JSON.stringify(values), (data) => {
        	notification.open({
		        message: '更新菜品信息成功！',
		        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
		    });
		    // this.context.router.push('/frame/product/productList');
        });
      }
    });
  }

  saveProduct = () => {
  	this.setState({
  		loading: true
  	});
  }

  render() {
  	let { data, fileList, loading } = this.state;
  	const { getFieldDecorator, setFieldsValue } = this.props.form;

    return (
      <div className="zui-content">
      	<div className="ibox-title">
            <h5>新增菜品</h5>
        </div>
        <div className="ibox-content">
        	<Spin spinning={loading}>
		      	<Form onSubmit={this.handleSubmit}>
		      		<Row>
		      			<Col span={12}>	    
					        <FormItem
					            label="食堂"
					            {...formItemLayout}
					         >
					          	{getFieldDecorator('companyId', {
				                    rules: [{ required: false }],
				                    initialValue: data.companyId
				                })(				              
						            <Select
						            >
						              <Option value={'1'}>一楼食堂</Option>
						              <Option value={'2'}>二楼食堂</Option>
						            </Select>
						        )}
					        </FormItem>
					    </Col>
					    <Col span={12}>
					        <FormItem
					            label="用餐时间"
					            {...formItemLayout}
					         >
					         	{getFieldDecorator('dish_type', {
				                    rules: [{ required: false }],
				                    initialValue: data.dish_type
				                })(
						            <Select
						            >
						              <Option value={'早餐'}>早餐</Option>
						              <Option value={'午餐'}>午餐</Option>
						              <Option value={'晚餐'}>晚餐</Option>
						            </Select>
						        )}
					        </FormItem>
					    </Col>
				    </Row>
		      		<Row>
		      			<Col span={12}>
					        <FormItem
					            label="菜品名称"
					            {...formItemLayout}
					        >
					        	{getFieldDecorator('dish_title', {
				                    rules: [{ required: true, message: '产品名称不能为空!' }],
				                    initialValue: data.dish_title
				                })(
					            	<Input placeholder="" />
					            )}
					        </FormItem>
					    </Col>
		      			<Col span={12}>
		      				<FormItem
					            label="菜品图片"
					            {...formItemLayout}
					          >
					          	{getFieldDecorator('dish_img', {
					          		valuePropName: 'fileList',
					          		getValueFromEvent: this.normFile,
				                    rules: [{ required: true, message: '菜品图片不能为空!' }],
				                    initialValue: data.dish_img
				                })(
						            <Upload
						            	action={restUrl.UPLOAD}
									    listType={'picture'}
									    className='upload-list-inline'
									    onChange={this.handleChange}
						            >
								    	<Button><Icon type="upload" /> 上传</Button>
								    </Upload>
								)}
					        </FormItem>	      	
		      			</Col>
		      		</Row>
				    <Row>
					    <Col span={12}>
					        <FormItem
					            label="说明"
					            {...formItemLayout}
					        >
					        	{getFieldDecorator('dish_content', {
				                    rules: [{ required: false, message: '菜品说明不能为空!' }],
				                    initialValue: data.dish_content
				                })(
					            	<Input.TextArea autosize={{minRows: 4, maxRows: 6}} />
					           	)}
					        </FormItem>
					    </Col>
				    </Row>
				    <Divider></Divider>
				    <Row type="flex" justify="center">
				    	<Col>
				    		<Button type="primary" htmlType="submit">
					          确认
					        </Button>
				    	</Col>
				    </Row>
		        </Form>
		    </Spin>
	    </div>
      </div>
    );
  }
}

const WrappedEditDish = Form.create()(EditDish);
EditDish.contextTypes = {  
     router:React.PropTypes.object  
} 

export default WrappedEditDish;
