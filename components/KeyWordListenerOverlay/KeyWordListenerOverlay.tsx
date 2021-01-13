import { EventTypes, KeywordMessage, useTetherMessageListener } from "@esportlayers/io";
import classNames from "classnames";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDefaultHeader, post } from "../../modules/middleware/Network";
import { updateCurrentUser } from "../../modules/reducer/Ui";
import { useCurrentUser } from "../../modules/selector/UiSelector";
import Input from '../Ui/input/Input';

const variants: Variants = {
    hidden: {x: '-100%', transition: {duration: .24}},
    visible: {x: 0, transition: {duration: .24}},
}

function mergeQuestions(oldState: KeywordMessage['value'][], newState: KeywordMessage['value'][]): KeywordMessage['value'][] {
    if(newState.length) {
        const newQuestions = newState.filter(({message}) => !oldState.find(({message: oldMessage}) => oldMessage === message));
        if(newQuestions.length) {
            return [...newQuestions, ...oldState];
        }
    }
    return oldState;
}

export default function KeyWordListenerOverlay(): ReactElement {
    const user = useCurrentUser();
    const dispatch = useDispatch();
    const [stopped, setStopped] = useState(false);
    const [activeOverlay, setActiveOverlay] = useState(false);

    const changeKeyword = useCallback((keywordListener) => {
        dispatch(updateCurrentUser({keywordListener}));
    }, [dispatch]);

    const [questions, setQuestions] = useState([]);
    const [queue, setQueue] = useState([]);
    const {value} = useTetherMessageListener<KeywordMessage>(EventTypes.keyword_message);

    useEffect(() => {
        if(value) {
            if(stopped) {
                setQueue((q) => mergeQuestions(q, [value]));
            } else {
                setQuestions((q) => mergeQuestions(q, [value]));
            }
        }
    }, [stopped, value]);

    useEffect(() => {
        if(!stopped && queue.length > 0) {
            setQuestions((q) => mergeQuestions(q, queue));
            setQueue([]);
        }
    }, [stopped, queue]);

    const onShowOverlay = useCallback(async (...data) => {
        setActiveOverlay(true);

        if(!activeOverlay) {
            await post(process.env.API_URL + '/live/keywordQuestion', {data}, getDefaultHeader());
        }

        setTimeout(() => setActiveOverlay(false), 10000);
    }, [dispatch]);

    return <AnimatePresence>
        {user?.useKeywordListener && <motion.div initial={'hidden'} animate={'visible'} exit={'hidden'} variants={variants} className={'keywordListenerOverlay'}>
            <div className={'voteOverlay'} onMouseEnter={() => setStopped(true)} onMouseLeave={() => setStopped(false)}>
                <h2>Keyword Listener</h2>

                <div className={'input'}>
                    <Input value={user.keywordListener} label={'Keyword'} onChange={changeKeyword}  />
                </div>

                <div className={'gridContainer'}>
                    <div className={'grid'}>
                        {questions.map(({name, message, logo, time}) => <React.Fragment key={'message'}>
                            <div className={'logo'}>
                                <img src={logo} alt={'Logo ' + name} />
                            </div>
                            <div className={'question'}>
                                <div className={'name'}>{name}</div>
                                <div className={'message'}>{message}</div>
                            </div>
                            <svg width={'30'} viewBox="0 0 576 384" fill="none" xmlns="http://www.w3.org/2000/svg" className={classNames('showOverlay', {activeOverlay})} onClick={() => onShowOverlay(name, message, logo, time)}>
                                <path d="M572.519 177.4C518.289 71.59 410.929 0 287.999 0C165.069 0 57.6795 71.64 3.47945 177.41C1.19187 181.935 0 186.935 0 192.005C0 197.075 1.19187 202.075 3.47945 206.6C57.7095 312.41 165.069 384 287.999 384C410.929 384 518.319 312.36 572.519 206.59C574.807 202.065 575.999 197.065 575.999 191.995C575.999 186.925 574.807 181.925 572.519 177.4V177.4ZM287.999 336C259.519 336 231.678 327.555 207.997 311.732C184.317 295.909 165.86 273.419 154.961 247.106C144.062 220.794 141.21 191.84 146.766 163.907C152.323 135.974 166.037 110.315 186.176 90.1766C206.315 70.0379 231.973 56.3232 259.906 50.7669C287.84 45.2107 316.793 48.0623 343.106 58.9613C369.418 69.8604 391.908 88.3172 407.731 111.998C423.554 135.679 431.999 163.519 431.999 192C432.009 210.913 428.29 229.642 421.057 247.117C413.823 264.592 403.217 280.47 389.843 293.844C376.47 307.217 360.592 317.824 343.117 325.057C325.642 332.291 306.912 336.009 287.999 336V336ZM287.999 96C279.431 96.1198 270.917 97.3946 262.689 99.79C269.472 109.007 272.726 120.349 271.863 131.759C271 143.17 266.076 153.893 257.984 161.985C249.893 170.077 239.169 175 227.759 175.864C216.348 176.727 205.006 173.472 195.789 166.69C190.541 186.026 191.489 206.521 198.498 225.29C205.508 244.059 218.227 260.158 234.866 271.32C251.504 282.481 271.224 288.145 291.249 287.512C311.275 286.879 330.598 279.983 346.498 267.793C362.399 255.603 374.077 238.734 379.888 219.56C385.699 200.386 385.351 179.872 378.892 160.906C372.434 141.94 360.191 125.476 343.886 113.833C327.581 102.19 308.035 95.9528 287.999 96V96Z" fill="currentColor"/>
                            </svg>
                        </React.Fragment>)}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .keywordListenerOverlay {
                    position: fixed;
                    left: 0;
                    top: 55px;
                    bottom: 0;
                    background-color: var(--anthrazit);
                    box-shadow: 2px 0 10px rgba(0,0,0,.2);
                    padding: .75rem 0 0 0;
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                }

                h2 {
                    font-size: 1rem;
                    text-transform: uppercase;
                    color: var(--secondary-accent);
                    margin-top: 0;
                    flex: 0;
                    padding: 0 1rem;
                }

                .input {
                    flex: 0;
                    padding: 0 1rem;
                }

                .gridContainer {
                    flex: 1;
                    overflow-y: scroll;
                    padding: 1rem;
                    max-height: calc(100vh - 170px);
                }

                .grid {
                    display: grid;
                    grid-template-columns: 30px minmax(200px, 1fr) max-content;
                    align-items: center;
                    grid-column-gap: 10px;
                    grid-row-gap: 20px;
                }

                .logo {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .name {
                    font-size: .8rem;
                    color: var(--primary-accent);
                }

                .message {
                    font-size: .7rem;
                }

                .showOverlay {
                    cursor: pointer;
                    color: #FFF;
                    transition: fill 120ms ease-in-out;
                }

                .activeOverlay {
                    cursor: default;
                    pointer-events: none;
                    color: #AAA;
                }
            `}</style>
        </motion.div>}
    </AnimatePresence>;
}