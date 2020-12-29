import classNames from "classnames";
import { motion } from "framer-motion";
import { ReactElement, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    ghost?: boolean;
    big?: boolean;
    del?: boolean;
    small?: boolean;
    noDropShadow?: boolean;
    disabled?: boolean;
}

export default function Button({big, children, del, ghost, onClick, small, disabled, noDropShadow}: Props): ReactElement {
    return <motion.div whileHover={{scale: disabled ? 1 : 1.05}} whileTap={{scale: disabled ? 1 : 0.95}}>
        <div className={classNames('btn', {big, del, disabled, ghost, noDropShadow, small})} onClick={onClick}>
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
            transition: all 120ms ease-in-out;
            user-select: none;
            display: inline-flex;
        }

        .ghost {
            box-shadow: none;
            background: transparent;
        }

        .disabled {
            box-shadow: none;
            pointer-events: none;
            filter: grayscale(.8);
        }

        .del {
            background-color: var(--delete-red);
        }

        .big {
            padding: 1.5rem 2rem;
            font-size: 1.2rem;
        }

        .small {
            padding: .4rem .5rem;
            font-size: .8rem;
        }

        .btn:hover:not(.noDropShadow):not(.disabled) {
            box-shadow: 2px 2px 1.2rem 0 rgba(0,0,0,0.8);
        }

        .noDropShadow {
            box-shadow: none;
        }
        `}</style>
    </motion.div>
}