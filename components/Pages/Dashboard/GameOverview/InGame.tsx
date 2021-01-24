import { ReactElement } from "react";
import HeroStats from "./Components/InGame/HeroStats/HeroStats";
import HerosTopBar from "./Components/InGame/PickedHeroes";

export default function InGame(): ReactElement {
    return <>
        <HerosTopBar />
        <HeroStats />
    </>;
}