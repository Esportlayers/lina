import { ReactElement, useCallback, useState } from "react";
import { getDefaultHeader, post } from "../../../../../../modules/middleware/Network";
import Button from "../../../../../Ui/button/Button";
import { HeroOverview } from "./PickedHero";

interface Props {
    heroId: number;
    heroClass: string;
    rawStats: HeroOverview;
    disabled?: boolean;
    onActivate: () => void;
}

export default function ShowStats({heroId, heroClass, rawStats, disabled, onActivate}: Props): ReactElement {
    const showHeroStats = useCallback(async () => {
        if(!disabled && heroId) {
            await post(process.env.API_URL + '/casting/overlay', {data: {type: 'heroStats', heroId, heroClass, ...rawStats}}, getDefaultHeader());
            onActivate();
        }
    }, [heroId, heroClass, rawStats, disabled, onActivate]);

    return <Button small noDropShadow disabled={disabled} onClick={showHeroStats}>Stats</Button>;
}