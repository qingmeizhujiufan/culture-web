import React from 'react';
import { Layout } from 'antd';
import ZZHeader from '../containers/zzHeader';
import ZZLeftSide from '../containers/zzLeftSide';
import ZZFooter from 'Comps/zzFooter/zzFooter';
import { Scrollbars } from 'react-custom-scrollbars';

export default class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <ZZLeftSide />
                <Layout>
                    <ZZHeader />
                    <Scrollbars style={{ height: 'calc(100vh - 50px)'}}>
                        {this.props.children}
                        <ZZFooter />
                    </Scrollbars>
                </Layout>
            </Layout>
        );
    }
}