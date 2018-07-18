import React from 'react';
import {Layout} from 'antd';
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
            </Layout>
        );
    }
}