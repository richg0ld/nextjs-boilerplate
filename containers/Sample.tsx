import React from 'react';
import withIntl from '../lib/withIntl'
import { connect } from 'react-redux'
import * as sampleActions from '../actions/sample'
import { Map } from 'immutable'
import styled from 'styled-components'

const Button = styled.button.attrs({type: "button"})`
    padding: 14px;
    font-size: 18px;
    font-weight: bold;
    background-color: #7f7f7f;
    color: #ffffff;
    
`

interface ISample {
    sample_api: Map<string, any>;
    sampleApiRequest(): void;
}

class Sample extends React.Component<ISample> {
    render() {
        const {
            sample_api,
            sampleApiRequest
        } = this.props;
        const sample_api_loading = sample_api.get('loading');
        const sample_api_data = sample_api.get('data');
        return (
            <div>
                <div>
                    <Button onClick={sampleApiRequest}>Click!</Button>
                </div>
                {sample_api_loading
                    ? `loading...`
                    : `data: ${JSON.stringify(sample_api_data.toJS())}`
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    sample_api: state.getIn([
        'sample',
        'sample_api',
    ]),
})
const mapDispatchToProps = (dispatch) => ({
    sampleApiRequest: () => dispatch(sampleActions.sampleApiRequest()),
});

export default withIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Sample))