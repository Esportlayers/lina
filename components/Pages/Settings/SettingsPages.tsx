import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";

import Account from "./Pages/Account";
import AntiSnipeOverlay from "./Pages/AntiSnipeOverlay";
import BotCommands from "./Pages/BotCommands";
import ChatAnalyses from "./Pages/ChatAnalyses/ChatAnalyses";
import DraftStats from "./Pages/DraftStats";
import HeroStats from "./Pages/HeroStats";
import KeywordListener from "./Pages/KeywordListener";
import RoshanTimer from "./Pages/RoshanTimer";
import VoteSystem from "./Pages/VoteSystem/VoteSystem";
import WLStats from "./Pages/WLStats/WLStats";

interface Props {
  active: string;
}

export default function SettingsPages({ active }: Props): ReactElement {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className={"content"}>
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {active === "voteSystem" && <VoteSystem />}
          {active === "wLStats" && <WLStats />}
          {active === "antiSnipe" && <AntiSnipeOverlay />}
          {active === "roshanTimer" && <RoshanTimer />}
          {active === "draftStats" && <DraftStats />}
          {active === "heroStats" && <HeroStats />}
          {active === "keywordListener" && <KeywordListener />}
          {active === "chatAnalyses" && <ChatAnalyses />}
          {active === "botCommands" && <BotCommands />}
          {active === "account" && <Account />}
        </motion.div>

        <style jsx>{`
          .container {
            text-align: center;
            padding: 5rem;
          }
        `}</style>
      </div>
    </AnimatePresence>
  );
}
