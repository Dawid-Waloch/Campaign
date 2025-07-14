import React from 'react';

import Header from '../Header';
import { StyledContainer } from './LayoutStyled';

const Layout = (props) => {
    return (
        <StyledContainer>
            <Header />
            {props.children}
        </StyledContainer>
    );
};

export default Layout;
