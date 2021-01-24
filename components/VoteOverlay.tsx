import { useVoteValue } from "@esportlayers/io";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactElement } from "react";
import ChatParticipations from "./VoteOverlay/ChatParticipations";
import Distribution from "./VoteOverlay/Distribution";
import Participants from "./VoteOverlay/Participants";
import Status from "./VoteOverlay/Status";

const variants: Variants = {
    hidden: {width: 0, transition: {duration: .24}},
    visible: {width: 'auto', transition: {duration: .24}},
}

export default function VoteOverlay(): ReactElement {
    const [voteState] = useVoteValue();
    return <AnimatePresence>
        {voteState && <motion.div initial={'hidden'} animate={'visible'} exit={'hidden'} variants={variants} className={'voteSideBar'}>
            <div className={'voteOverlay'}>
                <h2>Voting</h2>
                <div className={'voteDataGrid'}>
                    <Status />
                    <Participants />
                    <ChatParticipations />
                    <Distribution />
                </div>
            </div>

            <style jsx global>{`
                .voteSideBar {
                    background-color: var(--anthrazit);
                    box-shadow: -2px 0 10px rgba(0,0,0,.2);
                    padding: .75rem 1rem;
                    position: relative;
                    z-index: 1;
                }    

                h2 {
                    font-size: 1.25rem;
                    text-transform: uppercase;
                    color: var(--secondary-accent);
                }

                .voteDataGrid {
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-row-gap: 2rem;
                }
            `}</style>
            <style jsx>{`
            `}</style>
        </motion.div>}
    </AnimatePresence>;
}