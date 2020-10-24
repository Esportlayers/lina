import { Variants } from "framer-motion";
import { ReactElement, ReactNode, useMemo } from "react";
import BaseMotion from "./BaseMotion";

const animationVariants: Variants = {
    hidden: {width: '0px'},
    visible: {width: '100%'},
};

interface Props {
    children: ReactNode;
}

export default function ExpandFullWidth({children}: Props): ReactElement {
    return <BaseMotion initial={'hidden'} animate={'visible'} variants={animationVariants} style={useMemo(() => ({display: 'flex', justifyContent: 'center', margin: '0 auto'}), [])}>
        <div style={useMemo(() => ({flexGrow: 1}), [])}>
            {children}
        </div>
    </BaseMotion>;
}