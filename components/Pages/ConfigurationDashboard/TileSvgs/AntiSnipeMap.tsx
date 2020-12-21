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

const sideVariants: Variants = {
    initial: {pathLength: 0, opacity: 0},
    animate: {pathLength: 1, opacity: 1, transition: {duration: .7, delay: .45, ease: "easeInOut"}},
}

const laneVariants: Variants = {
    initial: {pathLength: 0, opacity: 0},
    animate: {pathLength: 1, opacity: 1, transition: {duration: .5, delay: .9, ease: "easeInOut"}},
}

const secretShopVariants: Variants = {
    initial: {pathLength: 0, opacity: 0},
    animate: {pathLength: 1, opacity: 1, transition: {duration: .24, delay: 1.1, ease: "easeInOut"}},
}

const wardVariants: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .4, delay: 1.1, ease: "easeInOut"}},
}


export default function AntiSnipeMap(): ReactElement {
    return <motion.svg viewBox="0 0 250 200" fill={'none'} xmlns="http://www.w3.org/2000/svg" variants={svgVariants} initial={'initial'} animate={'animate'}>
        <motion.path variants={rectVariants} d="M0.5 30C0.5 13.7076 13.7076 0.5 30 0.5H220C236.292 0.5 249.5 13.7076 249.5 30V170C249.5 186.292 236.292 199.5 220 199.5H30C13.7076 199.5 0.5 186.292 0.5 170V30Z" stroke="white"/>
        <motion.path variants={rectVariants} d="M52.5 31.8667C52.5 30.6221 52.8841 29.5141 53.4817 28.728C54.0791 27.9423 54.868 27.5 55.7 27.5H196.3C197.132 27.5 197.921 27.9423 198.518 28.728C199.116 29.5141 199.5 30.6221 199.5 31.8667V168.133C199.5 169.378 199.116 170.486 198.518 171.272C197.921 172.058 197.132 172.5 196.3 172.5H55.7C54.868 172.5 54.0791 172.058 53.4817 171.272C52.8841 170.486 52.5 169.378 52.5 168.133V31.8667Z" stroke="white"/>

        <motion.path variants={sideVariants} d="M52.5 127.285C57.0068 127.064 61.4026 126.728 65.8953 127.285C69.0433 127.676 72.4255 128.494 75.2579 129.937C78.4357 131.556 81.5962 133.491 84.4354 135.661C86.5362 137.267 88.3443 139.146 89.8104 141.355C91.5547 143.982 92.2147 147.103 92.9655 150.131C93.7429 153.267 94.0272 156.497 94.2399 159.71C94.3373 161.182 94.4557 162.653 94.4557 164.129C94.4557 165.556 94.3004 166.978 94.3221 168.404C94.3466 170.014 94.3737 170.894 94.2399 172.5" stroke="white" strokeLinecap="round" stroke-linejoin="round"/>
        <motion.path variants={sideVariants} d="M199 76.5C192.233 76.879 184.35 77.0758 177.64 76.0492C173.637 75.4366 169.765 73.608 166.305 71.6911C163.624 70.2055 160.923 68.5631 158.668 66.5231C156.453 64.5183 154.258 62.3746 153.124 59.6393C152.034 57.0062 151.201 54.4378 150.792 51.6368C150.315 48.3682 150.211 45.133 150.131 41.8362C150.018 37.2215 150.442 32.5936 150 28" stroke="white" stroke-linecap="round" strokeLinejoin="round"/>


        <motion.path variants={laneVariants} d="M66.5 127.5C68 104.333 69.3826 62.7043 70 59C71 53 76.5 45.6731 85 45.6731L150 47" stroke="white" strokeWidth="4"/>
        <motion.path variants={laneVariants} d="M85.5 136.5L158.5 66.5" stroke="white" strokeWidth="4"/>
        <motion.path variants={laneVariants} d="M94 155C94 155 152.5 155 160.5 155C176 155 182 146 183 137C184 128 184.5 77.8 184.5 77" stroke="white" strokeWidth="4"/>

        <motion.path variants={secretShopVariants} d="M167 111V109H171V111" stroke="white"/>
        <motion.path variants={secretShopVariants} d="M76 85V83H80V85" stroke="white"/>


        <motion.circle variants={wardVariants} cx="159.5" cy="104.5" r="1.5" fill="#24D46A"/>
        <motion.circle variants={wardVariants} cx="145.5" cy="123.5" r="1.5" fill="#24D46A"/>
        <motion.circle variants={wardVariants} cx="121.5" cy="89.5" r="1.5" fill="#24D46A"/>
        <motion.circle variants={wardVariants} cx="86.5" cy="91.5" r="1.5" fill="#24D46A"/>
        <motion.circle variants={wardVariants} cx="98.5" cy="54.5" r="1.5" fill="#24D46A"/>
    </motion.svg>;
}