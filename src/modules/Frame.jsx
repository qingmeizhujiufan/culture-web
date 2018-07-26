import React from 'react';
import {Layout, Icon, BackTop, Popover} from 'antd';
import ZZHeader from '../containers/zzHeader';
import ZZFooter from 'Comps/zzFooter/zzFooter';
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
                    <div><Icon type="play-circle-o" style={{fontSize: 20}}/></div>
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
                            <Icon type="appstore-o"/>
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