import React, { Component } from 'react'
import styled from 'styled-components'
import { $themeColor, $themeColor2, $themeCommon } from '../styles/theme'
import Layout, {ILayout} from '../components/Layout'
import withIntl from '../lib/withIntl'
import { InjectedIntlProps } from "react-intl"

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`
const TransContent = styled.div`
    background-color: ${$themeCommon.plus};
    color: yellow;
`

interface IOther extends ILayout, InjectedIntlProps {}

class Other extends Component<IOther> {
    static getInitialProps() {}
    render() {
        const {intl} = this.props;
        return (
            <Layout>
                <Container>
                    <H2>Other Page</H2>
                    <TransContent>{intl.formatMessage({id: "sample.boilerplate"})}</TransContent>
                </Container>
            </Layout>
        )
    }
}

export default withIntl(Other)
