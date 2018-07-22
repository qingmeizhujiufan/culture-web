import React from 'react';
import {Layout, Icon, BackTop} from 'antd';
import ZZHeader from '../containers/zzHeader';
import ZZFooter from 'Comps/zzFooter/zzFooter';

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
                <BackTop>
                    <div className="zui-up"><Icon type="up" /></div>
                </BackTop>
            </Layout>
        );
    }
}