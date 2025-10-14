"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
};

const Button = ({ href, children }: ButtonProps) => {
  return (
    <Link href={href}>
      <motion.button
        className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary rounded-lg overflow-hidden group"
        whileHover="hover"
      >
        <span>{children}</span>
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          variants={{ hover: { x: "100%" } }}
          transition={{ duration: 1, ease: "linear" }}
        />
        <motion.div
          className="ml-2"
          variants={{ hover: { x: 4 } }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </Link>
  );
};

export default Button;