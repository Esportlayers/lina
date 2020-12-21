import { AnimatePresence, motion, Variants } from "framer-motion";
import { FC, ReactElement, useCallback, useState } from "react";

const variants: Variants = {
    enter: () => {
        return {
            y: '100vh',
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
        y: 0,
        opacity: 1,
    },
    exit: () => {
        return {
            zIndex: 0,
            y: '100vh',
            opacity: 0
        };
    }
};

export interface FullPageSliderProps {
    onContinue: () => void;
}

interface Props {
    pages: FC<FullPageSliderProps>[];
    onFinish: () => void;
}

export default function FullPageSlider({pages, onFinish}: Props): ReactElement {
    const [index, setIndex] = useState(0);
    const Comp = pages[index];

    const nextStep = useCallback(() => {
            if(index === pages.length - 1) {
                onFinish();
            } else {
                setIndex((i) => i + 1);
            }
        },
        [index, onFinish],
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