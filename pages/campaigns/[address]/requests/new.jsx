import React from "react";

import Layout from "../../../../components/Layout/Layout";
import NewRequestForm from "../../../../components/NewRequestForm/NewRequestForm";
import { Button } from "semantic-ui-react";
import Link from "next/link";

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
            <Link href={`/campaigns/${address}/requests`}>
                <Button primary>Back</Button>
            </Link>
            <h3>Create a request</h3>
            <NewRequestForm address={address} />
        </Layout>
    );
};

export default NewRequest;