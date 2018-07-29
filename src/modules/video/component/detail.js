import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Icon, Badge, message, Spin, Affix, Breadcrumb, Button} from 'antd';
import restUrl from 'RestUrl';
import ajax from 'Utils/ajax';
import '../index.less';
import {shiftDate} from "Utils/util";
import {Player} from 'video-react';
import "video-react/dist/video-react.css";

const queryDetailUrl = restUrl.ADDR + 'video/queryDetail';

class VideoDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {}
        };
    }

    componentWillMount = () => {
    }

    componentDidMount() {
        this.queryDetail();
    }

    //获取艺术品详情
    queryDetail = () => {
        let param = {};
        param.id = this.props.params.id;
        this.setState({
            loading: true
        });
        ajax.getJSON(queryDetailUrl, param, (data) => {
            if (data.success) {
                data = data.backData;
                this.setState({
                    data
                });
            } else {
                message.error(data.backMsg);
            }

            this.setState({
                loading: false
            });
        });
    }

    scrollToAnchor = anchorName => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            }
        }
    }

    render() {
        const {loading, data} = this.state;

        return (
            <div className='page-video-detail'>
                <Spin spinning={loading} size={"large"}>
                    <div className="page-content video-bg">
                        <div className='content'>
                            <div style={{padding: '20px 0 20px 20px'}}>
                                <h2>{data.videoTitle}</h2>
                                <p>{shiftDate(data.create_time)}</p>
                            </div>
                            <Player
                                autoplay
                                src={data.videoFile ? restUrl.BASE_HOST + data.videoFile.filePath : null}
                                style={{height: 400}}
                            />
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

VideoDetail.contextTypes = {
    router: React.PropTypes.object
}

export default VideoDetail;