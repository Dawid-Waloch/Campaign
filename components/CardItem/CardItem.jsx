import React from "react";

import { CampaignShowCardStyled } from "./CardItemStyled";
import { Card } from "semantic-ui-react";

const CardItem = ({ header, meta, description }) => (
        <CampaignShowCardStyled>
            <Card.Content>
                <Card.Header>{header}</Card.Header>
                <Card.Meta>{meta}</Card.Meta>
                <Card.Description>{description}</Card.Description>
            </Card.Content>
        </CampaignShowCardStyled>
);

export default CardItem;