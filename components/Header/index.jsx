import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav, { footerLinks } from "./Nav";
import { MenuToggle } from "@/components/menuToggle";
import Link from "next/link";
const menu = {
  open: {
    width: "fit-content",
    height: "fit-content",
    top: "-10px",
    right: "-45px",
    transition: { duration: 0.7, type: "tween", ease: [0.76, 0, 0.24, 1] },
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  closed: {
    width: "30px",
    height: "20px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.7,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
    backgroundColor: "#ffffff00",
    borderRadius: "8px",
    boxShadow: "0 0 0 0",
  },
};
const overlay = {
  open: {
    display: "block",
    opacity: 1,
    zIndex: 11,
  },
  closed: {
    display: "none",
    opacity: 0,
    zIndex: 0,
  },
};
export default function Index() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="relative xs:hidden">
        <motion.div
          animate={isActive ? "open" : "closed"}
          variants={overlay}
          initial="closed"
          onClick={() => setIsActive((pre) => !pre)}
          className="fixed noSelect top-0 left-0 bottom-0 right-0 w-full h-screen"
        />
        <MenuToggle
          toggle={() => setIsActive((pre) => !pre)}
          isOpen={isActive}
        />
        <motion.div
          className="absolute z-20 shadow-xl"
          variants={menu}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>{isActive && <Nav toggle={() => setIsActive((pre) => !pre)}/>}</AnimatePresence>
        </motion.div>
      </div>
      <div className="hidden xs:flex space-x-4 space-x-reverse items-center">
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <Link
            key={i + "_nav"}
              className="flex font-normal items-center duration-300 active:scale-[.95] focus:scale-[.95] hover:scale-[.95]"
              aria-label={title}
              href={href}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </>
  );
}
