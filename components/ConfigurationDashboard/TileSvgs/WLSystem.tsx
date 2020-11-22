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

const pointsVariants: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .24, delay: .8, ease: "easeInOut"}},
}


export default function WLSystem(): ReactElement {
    return <motion.svg viewBox="0 0 250 200" fill={'none'} xmlns="http://www.w3.org/2000/svg" variants={svgVariants} initial={'initial'} animate={'animate'}>
        <motion.path variants={rectVariants} d="M30 0.5H220C236.292 0.5 249.5 13.7076 249.5 30V170C249.5 186.292 236.292 199.5 220 199.5H30C13.7076 199.5 0.5 186.292 0.5 170V30C0.5 13.7076 13.7076 0.5 30 0.5Z" stroke="white"/>
        <motion.path variants={rectVariants} d="M30 25.5H220C222.485 25.5 224.5 27.5147 224.5 30V170C224.5 172.485 222.485 174.5 220 174.5H30C27.5147 174.5 25.5 172.485 25.5 170V30C25.5 27.5147 27.5147 25.5 30 25.5Z" stroke="white"/>

        <motion.path variants={sliderBorderVariant} d="M94 75H60V65H104V83.5V105H70V125H104.5V135.5H60V95H77H94V75Z" stroke="#24D46A"/>
        <motion.path variants={sliderBorderVariant} d="M154 111V65H164V102H178V81H187.5V102H199V111H187.5V135H178V111H154Z" stroke="white"/>

        <motion.path variants={pointsVariants} d="M125.5 87.5H134.5V96.5H125.5V87.5Z" stroke="white"/>
        <motion.path variants={pointsVariants} d="M125.5 109.5H134.5V118.5H125.5V109.5Z" stroke="white"/>
    </motion.svg>;
}