import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, ReactElement, useCallback, useState } from "react";
import Welcome from "./Sections/Welcome";
import DownloadConfig from "./Sections/DownloadConfig";
import LocateConfig from "./Sections/LocateConfig";
import WaitingForConnection from "./Sections/WaitingForConnection";
import { useRouter } from "next/router";

const variants: Variants = {
    enter: () => {
      return {
        x: '100vw',
        opacity: 0,
        transition: {
          when: 'beforeChildren',
          staggerChildren: 0.5,
          duration: 0.5,
        },
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: () => {
      return {
        zIndex: 0,
        x: '-100vw',
        opacity: 0
      };
    }
};
  
export interface WelcomePageProps {
    onContinue: () => void;
}

const pages: FC<WelcomePageProps>[] = [
    Welcome,
    DownloadConfig,
    LocateConfig,
    WaitingForConnection,
];

export default function WelcomeScreen(): ReactElement {
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const Comp = pages[index];

    const nextStep = useCallback(() => {
        if(index === 2) {
          router.push('/configurationDashboard');
        } else {
          setIndex(index + 1)
        }
      },
      [index, router],
    )
    
    return <div className={'container'}>
        <AnimatePresence initial={false}>
            <motion.div
                key={index}
                variants={variants}
                initial={'enter'}
                animate={'center'}
                exit={'exit'}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
            >
                <div className={'animationContainer'}>
                    <AnimatePresence initial={true}>
                        <Comp onContinue={nextStep}/>
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>

        <style jsx>{`
            .container {
                position: relative;
            }

            .animationContainer {
                position: absolute;
                width: 100vw;
            }
        `}</style>
    </div>;
}