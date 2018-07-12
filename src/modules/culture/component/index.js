import React from 'react';
import {Link} from 'react-router';
import {
    Row,
    Col,
    Tree,
    Table,
    Icon,
    List,
    Divider,
    Breadcrumb,
    Badge,
    notification,
    Menu,
    Dropdown,
    Spin,
    Tabs,
    message,
    Modal,
    Select
} from 'antd';
import _ from 'lodash';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../dish.less';

const TabPane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const getDishListUrl = restUrl.ADDR + 'server/getDishList';
const onlineStateChangeUrl = restUrl.ADDR + 'server/onlineStateChange';
const delDsihUrl = restUrl.ADDR + 'server/delDish';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount = () => {
    }

    componentDidMount = () => {

    }

    render() {

        return (
            <div className="page-content">

            </div>
        );
    }
}

Index.contextTypes = {
    router: React.PropTypes.object
}

export default Index;