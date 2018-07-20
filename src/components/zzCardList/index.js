import React from 'react';
import {Row, Col, Icon, Button, message, Spin, List} from 'antd';
import restUrl from 'RestUrl';
import _ from 'lodash';
import './index.less';
import ajax from "Utils/ajax";

class ZZCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            queryParams: this.props.queryParams,
            pageNumber: 1,
            listData: [],
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
        };
    }

    componentDidMount = () => {
        this.getList(this.props.queryParams, data => {
            this.setState({
                listData: data.backData
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if ('queryParams' in nextProps && JSON.stringify(nextProps.queryParams) !== JSON.stringify(this.state.queryParams)) {
            this.setState({queryParams: nextProps.queryParams}, () => {
                this.getList(nextProps.queryParams, data => {
                    this.setState({
                        listData: data.backData
                    });
                });
            });
        }
    }

    getList = (queryParams, callback) => {
        const {queryUrl} = this.props;
        const {pageNumber} = this.state;
        const param = _.assign({}, queryParams);
        param.pageNumber = pageNumber;
        param.pageSize = 10;
        this.setState({loading: true});
        ajax.getJSON(queryUrl, param, data => {
            if (data.success) {
                if(typeof callback === 'function') callback(data);
            } else {
                message.error(data.backMsg);
            }
            this.setState({loading: false});
        });
    }

    onLoadMore = () => {
        let {queryParams, listData, pageNumber, total} = this.state;
        this.setState({
            loadingMore: true,
            pageNumber: ++pageNumber
        }, () => {
            this.getList(queryParams, data => {
                const _data = listData.concat(data.backData);
                this.setState({
                    listData: _data,
                    loadingMore: false,
                });
            });
        });
    }

    render() {
        const {renderItem} = this.props;
        const {loading, showLoadingMore, loadingMore, listData} = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                {loadingMore && <Spin/>}
                {!loadingMore && <Button onClick={this.onLoadMore}><Icon type="plus"/> 加载更多</Button>}
            </div>
        ) : null;

        return (
            <div className='zui-zzCardList'>
                <Spin spinning={loading} size={"large"}>
                    {
                        listData.map(renderItem)
                    }
                </Spin>
                {
                    loadMore
                }
            </div>
        );
    }
}

export default ZZCardList;
