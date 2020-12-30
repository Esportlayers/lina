import React, { ReactElement } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import VoteSystem from "./Pages/VoteSystem/VoteSystem";


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
            </motion.div>
        </div>
    </AnimatePresence>
}