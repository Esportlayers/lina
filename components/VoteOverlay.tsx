import { useVoteValue } from "@esportlayers/io";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactElement } from "react";

const variants: Variants = {
    hidden: {y: '100%', transition: {duration: .24}},
    visible: {y: 0, transition: {duration: .24}},
}

export default function VoteOverlay(): ReactElement {
    const [voteState] = useVoteValue();

    return <AnimatePresence>
        {voteState && <motion.div initial={'hidden'} animate={'visible'} exit={'hidden'} variants={variants}>
            <div className={'voteOverlay'}>
                udfguidfg
            </div>
            <style jsx>{`
                .voteOverlay {
                    position: fixed;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: var(--anthrazit);
                    box-shadow: -2px 0 10px rgba(0,0,0,.2);
                    
                }    
            `}</style>
        </motion.div>}
    </AnimatePresence>;
}