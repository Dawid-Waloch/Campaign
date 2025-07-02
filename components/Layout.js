import React from "react";

const Layout = props => {
    return (
        <>
            <h1>Im a header</h1>
            {props.children}
            <h1>Im a footer</h1>
        </>
    );
};

export default Layout;