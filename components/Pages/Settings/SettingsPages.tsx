import React, { ReactElement } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import VoteSystem from "./Pages/VoteSystem/VoteSystem";
import WLStats from "./Pages/WLStats/WLStats";
import AntiSnipeOverlay from "./Pages/AntiSnipeOverlay";
import RoshanTimer from "./Pages/RoshanTimer";
import DraftStats from "./Pages/DraftStats";
import HeroStats from "./Pages/HeroStats";

interface Props {
    active: string;
}

export default function SettingsPages({active}: Props): ReactElement {
    return <AnimatePresence exitBeforeEnter>
        <div className={'content'}>
            <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {active === 'voteSystem' && <VoteSystem />}
                {active === 'wLStats' && <WLStats />}
                {active === 'antiSnipe' && <AntiSnipeOverlay />}
                {active === 'roshanTimer' && <RoshanTimer />}
                {active === 'draftStats' && <DraftStats />}
                {active === 'heroStats' && <HeroStats />}
            </motion.div>
        </div>
    </AnimatePresence>
}