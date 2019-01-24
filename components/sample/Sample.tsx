import React from 'react';
import styled from 'styled-components';
import { $themeColor } from '../../styles/theme'

const Container = styled.div`
    padding: 5px 10px 6px;
    border-radius: 13px;
    color: ${$themeColor};
    font-size: 11px;
    text-align: center;
`;

class Sample extends React.Component {
    render() {
        const {txt} = this.props;
        return (
            <Container>
                {txt}
            </Container>
        )
    }
}

export default Sample;