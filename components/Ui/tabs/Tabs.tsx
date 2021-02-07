import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import debounce from 'lodash/debounce';

export interface Tab {
    name: string;
    value: string;
    view: React.FC;
}

interface Props {
    active: string;
    setActive: (a: string) => void;
    tabs: Tab[];
    relaxedContent?: boolean;
    maxHeight?: boolean;
}

const Underline = ({ activeTabRef, active, finishAnimating, animating }) => {
    const [{ x, width }, setAttributes] = useState({
        x: 0,
        width: 0,
    });

    const updateAttributes = useCallback(() => {
        if (activeTabRef && activeTabRef.current) {
            setAttributes({
                x: activeTabRef.current.offsetLeft,
                width: activeTabRef.current.getBoundingClientRect().width,
            });
        }
    }, [active, activeTabRef])

    useEffect(() => updateAttributes(), [active, activeTabRef, updateAttributes]);
    
    useEffect(() => {
        const recalculateAttrs = debounce(() => {
            updateAttributes();
        }, 500);

        window.addEventListener('resize', recalculateAttrs);

        return () => {
            window.removeEventListener('resize', recalculateAttrs);
        };
    });

    return <>
        <motion.div
            className={'active_tab_border'}
            animate={{x, width}}
            style={{opacity: animating ? 1 : 0}}
            onAnimationComplete={finishAnimating}
        />
        <style global jsx>{`
            .active_tab_border {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 3px;
                background-color: var(--primary-accent);  
            }    
        `}</style>
    </>;
};


export default function Tabs({active, maxHeight, relaxedContent, setActive, tabs}: Props): ReactElement {
    const [animating, setAnimating] = useState(false);

    const tabRefs = tabs.reduce((acc, {value}) => {
        acc[value] = React.createRef();
        return acc;
    }, {});
    const Component = useMemo(() => tabs.find(({value}) => value === active).view, [tabs, active]);

    return <div className={classNames('tabsContainer', {maxHeight})}>
        <div className={'tabs'}>
            {tabs.map(({value, name}) => <div 
                ref={tabRefs[value]}
                key={value}
                onClick={() => {
                    setAnimating(true);
                    setActive(value);
                }}
                className={classNames('tab', {active: active === value, animating})}
            >
                {name}
            </div>)}

            <Underline 
                active={active}
                activeTabRef={tabRefs[active]}
                finishAnimating={() => setAnimating(false)}
                animating={animating}
            />
        </div>

        <AnimatePresence exitBeforeEnter>
            <div className={classNames('content', {relaxedContent})}>
                <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Component />
                </motion.div>
            </div>
        </AnimatePresence>

        <style jsx>{`
            .tabsContainer {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                height: 100%;
            }
            
            .maxHeight {
                height: 100vh;
                overflow: hidden;
            }

            .tabs {
                display: flex;
                border-bottom: 2px solid rgba(0,0,0,.15);
                width: 100%;
                margin-top: .5rem;
                position: relative;
                flex-shrink: 0;
            }

            .tab {
                display: block;
                color: #FFF;
                padding: 1rem 1.25rem;
                text-decoration: none;
                font-weight: bold;
                white-space: nowrap;
                position: relative;
                cursor: pointer;
                margin: 0 1rem;
            }

            .tab:hover {
                color: var(--primary-accent);
            }    

            .tab:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
            }

            .tab.active:after {
                background-color: var(--primary-accent);
            }

            .tab.active.animating:after {
                background-color: transparent;
            }

            .content {
                flex-grow: 1;
                padding: 1.25rem 2rem;
            }

            .maxHeight > .content {
                max-height: 100%;
                overflow-y: scroll;
            }

            .relaxedContent {
                padding: 2rem 2.75rem;
            }
        `}</style>
    </div>
}