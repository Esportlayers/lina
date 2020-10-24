import { motion, MotionProps } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface Props extends MotionProps{
    children: ReactNode;
}

export default function BaseMotion({children, ...props}: Props): ReactElement {
    return <motion.div transition={{default: { duration: .25 }}} {...props}>
        {children}
    </motion.div>
    
}