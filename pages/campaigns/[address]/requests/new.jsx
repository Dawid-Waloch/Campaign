import React from "react";

import Layout from "../../../../components/Layout/Layout";
import NewRequestForm from "../../../../components/NewRequestForm/NewRequestForm";

export const getServerSideProps = (context) => {
    const { address } = context.query;

    return {
        props: {
            address
        }
    }
}

const NewRequest = ({ address }) => {
    return (
        <Layout>
            <h3>Create a request</h3>
            <NewRequestForm address={address} />
        </Layout>
    );
};

export default NewRequest;