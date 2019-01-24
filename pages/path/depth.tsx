import React, { Component } from 'react'
import styled from 'styled-components'
import { $themeColor, $themeColor2 } from '../../styles/theme'
import Layout, {ILayout} from '../../components/Layout'

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`

interface IDepth extends ILayout {}

class Depth extends Component<IDepth> {
    static getInitialProps() {}
    render() {
        return (
            <Layout>
                <Container>
                    <H2>Depth Page</H2>
                </Container>
            </Layout>
        )
    }
}

export default Depth
