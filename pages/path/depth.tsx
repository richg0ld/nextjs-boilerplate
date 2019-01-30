import React, { Component } from 'react'
import styled from 'styled-components'
import { $themeColor, $themeColor2 } from '../../styles/theme'
import Layout, {ILayout} from '../../components/Layout'
import { connect } from 'react-redux'
import * as sampleActions from '../../actions/sample'
import {Map} from 'immutable';

const Container = styled.div``
const H2 = styled.h2`
    background-color: ${$themeColor};
    color: ${$themeColor2};
`

interface IDepth extends ILayout {
    sample_api_loaded: Map<string, any>;
    sampleApiRequest(): void;
}

class Depth extends Component<IDepth> {
    static getInitialProps() {}
    componentDidMount() {
        const {sample_api_loaded, sampleApiRequest} = this.props;
        if(!sample_api_loaded) {
            sampleApiRequest();
        }
    }
    render() {
        return (
            <Layout {...this.props}>
                <Container>
                    <H2>Depth Page</H2>
                </Container>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    sample_api_loaded: state.getIn([
        'sample',
        'sample_api',
        'loaded'
    ]),
})
const mapDispatchToProps = (dispatch) => ({
    sampleApiRequest: () => dispatch(sampleActions.sampleApiRequest()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Depth)
