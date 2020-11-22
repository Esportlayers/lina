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
    animate: {pathLength: 1, opacity: 1, transition: {duration: .5, delay: .45, ease: "easeInOut"}},
}

const sliderContentVariant: Variants = {
    initial: {scaleX: 0, opacity: 0},
    animate: {scaleX: 1, opacity: 1, transition: {duration: .4, delay: .65, ease: "easeInOut"}},
}

const sliderDistVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .25, delay: .9, ease: "easeInOut"}},
}

const numberVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .3, delay: .45, ease: "easeInOut"}},
}

const numberVariant1: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .3, delay: .65, ease: "easeInOut"}},
}

const numberVariant2: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .3, delay: .85, ease: "easeInOut"}},
}

const barVariant: Variants = {
    initial: {x: 20, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: .25, delay: .55, ease: "easeInOut"}},
}

const barVariant1: Variants = {
    initial: {x: 20, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: .25, delay: .75, ease: "easeInOut"}},
}

const barVariant2: Variants = {
    initial: {x: 20, opacity: 0},
    animate: {x: 0, opacity: 1, transition: {duration: .25, delay: .95, ease: "easeInOut"}},
}

const countdownBoxVariant: Variants = {
    initial: {scale: 0, opacity: 0},
    animate: {scale: 1, opacity: 1, transition: {duration: .75, delay: .45, ease: "easeInOut"}},
}

const countdownFontVariant: Variants = {
    initial: {y: 10, opacity: 0},
    animate: {y: 0, opacity: 1, transition: {duration: .25, delay: .5, ease: "easeInOut"}},
}

const countdownFontVariant1: Variants = {
    initial: {y: 10, opacity: 0},
    animate: {y: 0, opacity: 1, transition: {duration: .25, delay: .65, ease: "easeInOut"}},
}

const countdownFontVariant2: Variants = {
    initial: {y: 10, opacity: 0},
    animate: {y: 0, opacity: 1, transition: {duration: .25, delay: .8, ease: "easeInOut"}},
}

const countdownFontVariant3: Variants = {
    initial: {y: 10, opacity: 0},
    animate: {y: 0, opacity: 1, transition: {duration: .25, delay: .95, ease: "easeInOut"}},
}

export default function VoteSystem(): ReactElement {
    return <motion.svg viewBox="0 0 250 200" fill={'none'} xmlns="http://www.w3.org/2000/svg" variants={svgVariants} initial={'initial'} animate={'animate'}>
        <motion.path variants={rectVariants} d="M30 0.5H220C236.292 0.5 249.5 13.7076 249.5 30V170C249.5 186.292 236.292 199.5 220 199.5H30C13.7076 199.5 0.5 186.292 0.5 170V30C0.5 13.7076 13.7076 0.5 30 0.5Z" stroke="white"/>
        <motion.path variants={rectVariants} d="M30 25.5H220C222.485 25.5 224.5 27.5147 224.5 30V170C224.5 172.485 222.485 174.5 220 174.5H30C27.5147 174.5 25.5 172.485 25.5 170V30C25.5 27.5147 27.5147 25.5 30 25.5Z" stroke="white"/>

        <motion.path variants={sliderBorderVariant} d="M45.5 54C45.5 52.067 47.067 50.5 49 50.5H201C202.933 50.5 204.5 52.067 204.5 54V56C204.5 57.933 202.933 59.5 201 59.5H49C47.067 59.5 45.5 57.933 45.5 56V54Z" stroke="white"/>
        <motion.path style={{originX: 0, originY: 0.5}} variants={sliderContentVariant} width={'104px'} d="M45 54C45 51.7909 46.7909 50 49 50H121C123.209 50 125 51.7909 125 54V56C125 58.2091 123.209 60 121 60H49C46.7909 60 45 58.2091 45 56V54Z" fill="#DDDDDD"/>
        <motion.path variants={sliderDistVariant} d="M123 49H127V61H123V49Z" fill="#24D46A"/>

        <motion.path variants={barVariant} d="M57 115H99V121H57V115Z" fill="#24D46A"/>
        <motion.path variants={barVariant1} d="M57 129H87V135H57V129Z" fill="#24D46A"/>
        <motion.path variants={barVariant2} d="M57 143H107V149H57V143Z" fill="#24D46A"/>
        <motion.path variants={numberVariant} d="M49.2715 122H48.1816V114.775L45.9961 115.578V114.594L49.1016 113.428H49.2715V122Z" fill="#DDDDDD"/>
        <motion.path variants={numberVariant1} d="M51.2988 136H45.709V135.221L48.6621 131.939C49.0996 131.443 49.4004 131.041 49.5645 130.732C49.7324 130.42 49.8164 130.098 49.8164 129.766C49.8164 129.32 49.6816 128.955 49.4121 128.67C49.1426 128.385 48.7832 128.242 48.334 128.242C47.7949 128.242 47.375 128.396 47.0742 128.705C46.7773 129.01 46.6289 129.436 46.6289 129.982H45.5449C45.5449 129.197 45.7969 128.562 46.3008 128.078C46.8086 127.594 47.4863 127.352 48.334 127.352C49.127 127.352 49.7539 127.561 50.2148 127.979C50.6758 128.393 50.9062 128.945 50.9062 129.637C50.9062 130.477 50.3711 131.477 49.3008 132.637L47.0156 135.115H51.2988V136Z" fill="#DDDDDD"/>
        <motion.path variants={numberVariant2} d="M47.2852 145.207H48.0996C48.6113 145.199 49.0137 145.064 49.3066 144.803C49.5996 144.541 49.7461 144.188 49.7461 143.742C49.7461 142.742 49.248 142.242 48.252 142.242C47.7832 142.242 47.4082 142.377 47.127 142.646C46.8496 142.912 46.7109 143.266 46.7109 143.707H45.627C45.627 143.031 45.873 142.471 46.3652 142.025C46.8613 141.576 47.4902 141.352 48.252 141.352C49.0566 141.352 49.6875 141.564 50.1445 141.99C50.6016 142.416 50.8301 143.008 50.8301 143.766C50.8301 144.137 50.709 144.496 50.4668 144.844C50.2285 145.191 49.9023 145.451 49.4883 145.623C49.957 145.771 50.3184 146.018 50.5723 146.361C50.8301 146.705 50.959 147.125 50.959 147.621C50.959 148.387 50.709 148.994 50.209 149.443C49.709 149.893 49.0586 150.117 48.2578 150.117C47.457 150.117 46.8047 149.9 46.3008 149.467C45.8008 149.033 45.5508 148.461 45.5508 147.75H46.6406C46.6406 148.199 46.7871 148.559 47.0801 148.828C47.373 149.098 47.7656 149.232 48.2578 149.232C48.7812 149.232 49.1816 149.096 49.459 148.822C49.7363 148.549 49.875 148.156 49.875 147.645C49.875 147.148 49.7227 146.768 49.418 146.502C49.1133 146.236 48.6738 146.1 48.0996 146.092H47.2852V145.207Z" fill="#DDDDDD"/>

        <motion.path variants={countdownBoxVariant} d="M158 91C158 89.3431 159.343 88 161 88H192C193.657 88 195 89.3431 195 91V104C195 105.657 193.657 107 192 107H161C159.343 107 158 105.657 158 104V91Z" fill="#DDDDDD" fillOpacity="0.2"/>
        <motion.path variants={countdownFontVariant} d="M169.271 102H168.182V94.7754L165.996 95.5781V94.5938L169.102 93.4277H169.271V102Z" fill="#24D46A"/>
        <motion.path variants={countdownFontVariant1} d="M172.523 101.432C172.523 101.244 172.578 101.088 172.688 100.963C172.801 100.838 172.969 100.775 173.191 100.775C173.414 100.775 173.582 100.838 173.695 100.963C173.812 101.088 173.871 101.244 173.871 101.432C173.871 101.611 173.812 101.762 173.695 101.883C173.582 102.004 173.414 102.064 173.191 102.064C172.969 102.064 172.801 102.004 172.688 101.883C172.578 101.762 172.523 101.611 172.523 101.432ZM172.529 96.2578C172.529 96.0703 172.584 95.9141 172.693 95.7891C172.807 95.6641 172.975 95.6016 173.197 95.6016C173.42 95.6016 173.588 95.6641 173.701 95.7891C173.818 95.9141 173.877 96.0703 173.877 96.2578C173.877 96.4375 173.818 96.5879 173.701 96.709C173.588 96.8301 173.42 96.8906 173.197 96.8906C172.975 96.8906 172.807 96.8301 172.693 96.709C172.584 96.5879 172.529 96.4375 172.529 96.2578Z" fill="#24D46A"/>
        <motion.path variants={countdownFontVariant2} d="M180.943 102H175.354V101.221L178.307 97.9395C178.744 97.4434 179.045 97.041 179.209 96.7324C179.377 96.4199 179.461 96.0977 179.461 95.7656C179.461 95.3203 179.326 94.9551 179.057 94.6699C178.787 94.3848 178.428 94.2422 177.979 94.2422C177.439 94.2422 177.02 94.3965 176.719 94.7051C176.422 95.0098 176.273 95.4355 176.273 95.9824H175.189C175.189 95.1973 175.441 94.5625 175.945 94.0781C176.453 93.5938 177.131 93.3516 177.979 93.3516C178.771 93.3516 179.398 93.5605 179.859 93.9785C180.32 94.3926 180.551 94.9453 180.551 95.6367C180.551 96.4766 180.016 97.4766 178.945 98.6367L176.66 101.115H180.943V102Z" fill="#24D46A"/>
        <motion.path variants={countdownFontVariant3} d="M185.654 102H184.564V94.7754L182.379 95.5781V94.5938L185.484 93.4277H185.654V102Z" fill="#24D46A"/>
    </motion.svg>;
}