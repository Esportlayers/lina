import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, ReactElement, useCallback, useState } from "react";
import Welcome from "./Sections/Welcome";
import DownloadConfig from "./Sections/DownloadConfig";
import LocateConfig from "./Sections/LocateConfig";
import WaitingForConnection from "./Sections/WaitingForConnection";
import { useRouter } from "next/router";
import FullPageSlider, { FullPageSliderProps } from "../../Ui/fullpageslide/FullPageSlide";
import OverlayLinks from "./Sections/OverlayLinks";


const pages: FC<FullPageSliderProps>[] = [
    Welcome,
    DownloadConfig,
    LocateConfig,
    WaitingForConnection,
    OverlayLinks,
];

export default function WelcomeScreen(): ReactElement {
    const router = useRouter();
    const onFinish = useCallback(() => {
        router.push('/grandCentralTerminal');
    }, [router])

    return <FullPageSlider pages={pages} onFinish={onFinish} />;
}