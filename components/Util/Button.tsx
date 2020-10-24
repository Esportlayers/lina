import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    ghost?: boolean;
}

export default function Button({children, ghost, onClick}: Props): ReactElement {
    return <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
        <div className={classNames('btn', {ghost})} onClick={onClick}>
            {children}
        </div>
        <style jsx>{`
        .btn {
            padding: .75rem 1rem;
            border-radius: .2rem;
            background-color: var(--primary-accent);
            cursor: pointer;
            text-transform: uppercase;
            font-size: .9rem;
            font-weight: bold;
            box-shadow: 2px 2px 1rem 0 rgba(0,0,0,0.5);
            transition: box-shadow 120ms ease-in-out;
            user-select: none;
        }

        .ghost {
            box-shadow: none;
            background: transparent;
        }

        .btn:hover {
            box-shadow: 2px 2px 1.2rem 0 rgba(0,0,0,0.8);
        }
        `}</style>
    </motion.div>
}