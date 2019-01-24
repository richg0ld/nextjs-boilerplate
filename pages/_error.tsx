import React from 'react'
import styled, { css } from 'styled-components'
import { $themeColor, $themeCommon } from '../styles/theme'
import { trackerOopsVisit } from '../lib/tracker'

const Container = styled.div``

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }
    render() {
        const { statusCode }: any = this.props
        return (
            <Container>
                Error!
                {statusCode}
            </Container>
        )
    }
}
