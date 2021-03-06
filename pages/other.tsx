import React, { Component } from 'react'
import styled from 'styled-components'
import { $themeBg, $themeColor, $themeColor2, $themeCommon, $themeFont } from '../styles/theme'
import Layout, {ILayout} from '../components/Layout'
import withIntl from '../lib/withIntl'
import { InjectedIntlProps } from "react-intl"
import Sample from '../containers/Sample'

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`
const TransContent = styled.div`
    background-color: ${$themeCommon.plus};
    color: yellow;
`
const ThemeColorComp = styled.div`
    background-color: ${$themeBg};
    color: ${$themeFont};
`

interface IOther extends ILayout, InjectedIntlProps {}

class Other extends Component<IOther> {
    static getInitialProps() {}
    render() {
        const {intl} = this.props;
        return (
            <Layout {...this.props}>
                <Container>
                    <H2>Other Page</H2>
                    <TransContent>{intl.formatMessage({id: "sample.boilerplate"})}</TransContent>
                    <ThemeColorComp>1234567890</ThemeColorComp>
                    <Sample />
                </Container>
            </Layout>
        )
    }
}

export default withIntl(Other)
