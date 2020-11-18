import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: ReactNode;
    onClose?: () => void;
    open: boolean;
    closeOnBackdropClick?: boolean;
    size?: 'normal';
}

const backdropVariants: Variants = {
    hidden: {opacity: 0, transition: {duration: .24}},
    visible: {opacity: 1, transition: {duration: .24, delayChildren: .17}},
}

const modalVariants: Variants = {
    hidden: {scale: 0, transition: {duration: .17}},
    visible: {scale: 1, transition: {duration: .17}},
}

export default function Modal({children, closeOnBackdropClick, open, onClose, size = 'normal'}: Props): ReactElement {
    return createPortal(
        <AnimatePresence>
            {open && <motion.div key={'backdrop'} className={'backdrop'} variants={backdropVariants} initial={'hidden'} animate={'visible'} exit={'hidden'} onClick={() => onClose && closeOnBackdropClick && onClose()}>
                    <motion.div key={'modal'} className={classNames('modal', `modalSize-${size}`)} variants={modalVariants} initial={'hidden'} animate={'visible'} exit={'hidden'}>
                        {children}
                    </motion.div>
            </motion.div>}

            <style jsx global>{`
                .backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .modal {
                    background-color: var(--anthrazit);
                    padding: 2rem 2.5rem;
                    border-radius: 1rem;
                    box-shadow: 2px 2px 20px rgba(0,0,0,0.5), 2px 2px 5px 2px rgba(0,0,0,0.2);
                }

                .modalSize-normal {
                    width: 35rem;
                    min-height: 15rem;
                }
            `}</style>
        </AnimatePresence>,
        document.querySelector('body'),
    )
}