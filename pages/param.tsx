import React, { Component } from 'react'
import styled from 'styled-components'
import { $themeColor, $themeColor2, $themeCommon } from '../styles/theme'
import Layout, {ILayout} from '../components/Layout'

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`
const ParamValue = styled.h2`
    background-color: ${$themeCommon.record};
    color: #ffffff;
`

interface IParam extends ILayout {
    something: string;
}

class Param extends Component<IParam> {
    static getInitialProps({ ctx }) {
        const { query } = ctx
        const { something } = query
        return { something }
    }
    render() {
        const { something } = this.props;
        return (
            <Layout {...this.props}>
                <Container>
                    <H2>Param Page</H2>
                    <ParamValue>
                        something : {something}
                    </ParamValue>
                </Container>
            </Layout>
        )
    }
}

export default Param
