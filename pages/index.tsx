import React, { Component } from 'react'
import styled from 'styled-components'
import Layout, {ILayout} from '../components/Layout'
import { $themeColor, $themeColor2 } from '../styles/theme'

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`

interface IIndex extends ILayout {
    common_referrer: string;
}

class Index extends Component<IIndex> {
    static getInitialProps() {}
    render() {
        return (
            <Layout>
                <Container>
                    <H2>Index Page</H2>
                </Container>
            </Layout>
        )
    }
}

export default Index
