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

const statsVariant: Variants = {
    initial: {scaleY: 0, opacity: 0},
    animate: {scaleY: 1, opacity: 1, transition: {duration: .7, delay: .45, ease: "easeInOut"}},
}

const nameVariant: Variants = {
    initial: {pathLength: 0, y: -30, opacity: 0},
    animate: {pathLength: 1, y: 0, opacity: 1, transition: {duration: .4, delay: .65, ease: "easeInOut"}},
}

export default function LiveStats(): ReactElement {
    return <motion.svg viewBox="0 0 250 200" fill={'none'} xmlns="http://www.w3.org/2000/svg" variants={svgVariants} initial={'initial'} animate={'animate'}>
        <motion.path variants={rectVariants} d="M30 0.5H220C236.292 0.5 249.5 13.7076 249.5 30V170C249.5 186.292 236.292 199.5 220 199.5H30C13.7076 199.5 0.5 186.292 0.5 170V30C0.5 13.7076 13.7076 0.5 30 0.5Z" stroke="white"/>
        <motion.path variants={rectVariants} d="M30 25.5H220C222.485 25.5 224.5 27.5147 224.5 30V170C224.5 172.485 222.485 174.5 220 174.5H30C27.5147 174.5 25.5 172.485 25.5 170V30C25.5 27.5147 27.5147 25.5 30 25.5Z" stroke="white"/>
            
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}} d="M42 83H48V119H42V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M58 83H64V135H58V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M74 83H80V126H74V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M90 83H96V103H90V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M106 83H112V119H106V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M138 83H144V144H138V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M154 83H160V153H154V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M170 83H176V134H170V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M186 83H192V130H186V83Z" fill="#24D46A"/>
        <motion.path variants={statsVariant} style={{originY: 0, originX: .5}}  d="M202 83H208V144H202V83Z" fill="#24D46A"/>

        <motion.path variants={nameVariant} d="M73.9629 57.3525H78.3174V59H71.9121V49.0469H73.9629V57.3525ZM81.6807 59H79.6299V49.0469H81.6807V59ZM87.2656 56.5322L89.5215 49.0469H91.8047L88.3389 59H86.1992L82.7471 49.0469H85.0234L87.2656 56.5322ZM98.7363 54.6865H94.7988V57.3525H99.4199V59H92.748V49.0469H99.4062V50.708H94.7988V53.0801H98.7363V54.6865ZM112.203 59H110.152L106.16 52.4512V59H104.109V49.0469H106.16L110.159 55.6094V49.0469H112.203V59ZM119.982 54.6865H116.045V57.3525H120.666V59H113.994V49.0469H120.652V50.708H116.045V53.0801H119.982V54.6865ZM129.498 50.708H126.449V59H124.398V50.708H121.391V49.0469H129.498V50.708ZM138.535 56.1289L139.875 49.0469H141.919L139.711 59H137.646L136.026 52.3418L134.406 59H132.342L130.134 49.0469H132.178L133.524 56.1152L135.165 49.0469H136.901L138.535 56.1289ZM151.209 54.249C151.209 55.2288 151.036 56.0879 150.689 56.8262C150.343 57.5645 149.846 58.1341 149.199 58.5352C148.557 58.9362 147.818 59.1367 146.984 59.1367C146.16 59.1367 145.424 58.9385 144.776 58.542C144.129 58.1455 143.628 57.5804 143.272 56.8467C142.917 56.1084 142.737 55.2607 142.732 54.3037V53.8115C142.732 52.8317 142.908 51.9704 143.259 51.2275C143.614 50.4801 144.113 49.9082 144.756 49.5117C145.403 49.1107 146.141 48.9102 146.971 48.9102C147.8 48.9102 148.536 49.1107 149.179 49.5117C149.826 49.9082 150.325 50.4801 150.676 51.2275C151.031 51.9704 151.209 52.8294 151.209 53.8047V54.249ZM149.131 53.7979C149.131 52.7542 148.944 51.9613 148.57 51.4189C148.197 50.8766 147.663 50.6055 146.971 50.6055C146.283 50.6055 145.752 50.8743 145.378 51.4121C145.004 51.9453 144.815 52.7292 144.811 53.7637V54.249C144.811 55.2653 144.997 56.0537 145.371 56.6143C145.745 57.1748 146.283 57.4551 146.984 57.4551C147.673 57.4551 148.201 57.1862 148.57 56.6484C148.939 56.1061 149.126 55.3177 149.131 54.2832V53.7979ZM156.384 55.3564H154.75V59H152.699V49.0469H156.397C157.573 49.0469 158.48 49.3089 159.118 49.833C159.756 50.3571 160.075 51.0977 160.075 52.0547C160.075 52.7337 159.927 53.3011 159.631 53.7568C159.339 54.208 158.895 54.568 158.298 54.8369L160.451 58.9043V59H158.25L156.384 55.3564ZM154.75 53.6953H156.404C156.919 53.6953 157.318 53.5654 157.601 53.3057C157.883 53.0413 158.024 52.679 158.024 52.2188C158.024 51.7493 157.89 51.3802 157.621 51.1113C157.357 50.8424 156.949 50.708 156.397 50.708H154.75V53.6953ZM168.791 50.708H165.742V59H163.691V50.708H160.684V49.0469H168.791V50.708ZM178.067 59H176.017V54.7344H172.018V59H169.967V49.0469H172.018V53.0801H176.017V49.0469H178.067V59Z" fill="white"/>    
    </motion.svg>;
}