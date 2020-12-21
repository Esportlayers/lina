import { motion, Variants } from "framer-motion";
import { ReactElement } from "react";

const svgVariants: Variants = {
    initial: {opacity: .5},
    animate: {opacity: 1, transition: {duration: .5, ease: "easeInOut"}},
};

const rectVariants: Variants = {
    initial: {pathLength: 0, opacity: 0},
    animate: {pathLength: 1, opacity: 1, transition: {duration: .5, delay: .3, ease: "easeInOut"}},
}

const sliderBorderVariant: Variants = {
    initial: {pathLength: 0, opacity: 0},
    animate: {pathLength: 1, opacity: 1, transition: {duration: .7, delay: .45, ease: "easeInOut"}},
}

const minuteVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .6, delay: .8, ease: "easeInOut"}},
}


const hourVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .6, delay: .8, ease: "easeInOut"}},
}


export default function RoshanTimer(): ReactElement {
    return <motion.svg viewBox="0 0 250 200" fill={'none'} xmlns="http://www.w3.org/2000/svg" variants={svgVariants} initial={'initial'} animate={'animate'}>
        <motion.path variants={rectVariants} d="M30 0.5H220C236.292 0.5 249.5 13.7076 249.5 30V170C249.5 186.292 236.292 199.5 220 199.5H30C13.7076 199.5 0.5 186.292 0.5 170V30C0.5 13.7076 13.7076 0.5 30 0.5Z" stroke="white"/>
        <motion.path variants={rectVariants} d="M30 25.5H220C222.485 25.5 224.5 27.5147 224.5 30V170C224.5 172.485 222.485 174.5 220 174.5H30C27.5147 174.5 25.5 172.485 25.5 170V30C25.5 27.5147 27.5147 25.5 30 25.5Z" stroke="white"/>

        <motion.path variants={sliderBorderVariant} d="M160.5 100C160.5 119.606 144.606 135.5 125 135.5C105.394 135.5 89.5 119.606 89.5 100C89.5 80.3939 105.394 64.5 125 64.5C144.606 64.5 160.5 80.3939 160.5 100Z" stroke="white"/>
        <motion.path style={{originX: '125.5px', originY: '100px', rotate: 80}} variants={minuteVariant} d="M124 70H126.5V100C126 100 126 101 125 101C125 101 124 100 124 100V70Z" fill="#24D46A"/>
        <motion.path style={{originX: 1, originY: 1}} variants={hourVariant}  d="M124 89H126.5V100C126 100 126 101 125 101C125 101 124 100 124 100V89Z" fill="#24D46A"/>
    </motion.svg>;
}