import React, { Component } from 'react'
import styled from 'styled-components'
import Layout, {ILayout} from '../components/Layout'
import { $themeColor, $themeColor2 } from '../styles/theme'
import * as sampleActions from '../actions/sample'

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`

interface IIndex extends ILayout {
    common_referrer: string;
}

class Index extends Component<IIndex> {
    static getInitialProps({ ctx }) {
        const { store } = ctx
        const state = store.getState();
        const sample_api_loaded = state.getIn(['sample', 'sample_api', 'loaded']);
        if(!sample_api_loaded) {
            store.dispatch(sampleActions.sampleApiRequest())
        }
    }
    render() {
        return (
            <Layout {...this.props}>
                <Container>
                    <H2>Index Page</H2>
                </Container>
            </Layout>
        )
    }
}

export default Index
