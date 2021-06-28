import React from 'react'

import styled from 'styled-components';

const FooterWrapper = styled.div`
    width: 100vw;
    height: 1vh;
    padding-bottom: 20px;
    background-color: inherit;
    position: absolute;
    bottom: 0;
`
const FooterContent = styled.h3`
    text-align: center;
    color: #064366;
    font-size: 1em;
    opacity: 1;
    font-family: 'Lato',Avenir, Georgia, 'Times New Roman', Times, serif;
    font-weight: 100;
    bottom: 0;
    position:'absolute';
`
class Footer extends React.Component {
    render() {
        return(
            <FooterWrapper>
                <FooterContent>built using react.js · react-beautiful-dnd · styled components · material-ui</FooterContent>
            </FooterWrapper>
        )
    }
}

export default Footer