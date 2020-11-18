import { Variants } from "framer-motion";
import { ReactElement, ReactNode } from "react";
import BaseMotion from './BaseMotion';

const animationVariants: Variants = {
    hidden: {opacity: 0, y: 25},
    visible: {opacity: 1, y: 0},
}

interface Props {
    children: ReactNode;
    delay?: number;
}

export default function NudgeFromBottom({children, delay = 0}: Props): ReactElement {
    return <BaseMotion initial={'hidden'} animate={'visible'} variants={animationVariants} transition={{delay}}>
        {children}
    </BaseMotion>;
}