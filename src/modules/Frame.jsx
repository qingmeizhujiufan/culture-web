import React from 'react';
import {Layout, Icon, BackTop, Popover} from 'antd';
import ReactPlayer from 'react-player';
import ZZHeader from '../containers/zzHeader';
import ZZFooter from 'Comps/zzFooter/zzFooter';
// import Audio from '../assets/Say-Something.mp3';
import followPublic from 'Img/followPublic.png';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <ZZHeader/>
                {this.props.children}
                <ZZFooter/>
                <div className='fix-music'>
                    <div>
                        <Icon type="play-circle-o" style={{fontSize: 20}}/>
                        <ReactPlayer
                            url={'../src/assets/Say-Something.mp3'}
                            playing
                            width={0}
                            height={0}
                        />
                    </div>
                </div>
                <Popover
                    placement="left"
                    content={(
                        <div style={{textAlign: 'center'}}>
                            <img src={followPublic} style={{width: 100}}/>
                            <p style={{margin: '10px 0 0', color: '#47340B', fontSize: 12}}>扫一扫关注服务号</p>
                        </div>)}
                >
                    <div className='fix-qrcode'>
                        <div>
                            <span className='iconfont icon-code'></span>
                        </div>
                    </div>
                </Popover>
                <BackTop>
                    <div className="zui-up"><Icon type="up"/></div>
                </BackTop>
            </Layout>
        );
    }
}