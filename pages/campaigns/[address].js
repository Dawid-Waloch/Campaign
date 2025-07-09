import React from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";

const CampaignShow = () => {
    const router = useRouter();
    const { address } = router.query;

    const getStaticProps = async () => {
        const campaign = Campaign(address);
        
    }

    return (
        <Layout>
            <h2>Campaign show</h2>
            {address}
        </Layout>
    );
};

export default CampaignShow;