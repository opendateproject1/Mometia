"use client"

import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Component = href ? motion.a : motion.div

  return (
    <Component
      {...(href ? { href } : {})}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "flex flex-col rounded-xl border border-border/50",
        "bg-gradient-to-b from-card/80 to-card/40",
        "backdrop-blur-sm",
        "p-4 text-start sm:p-6",
        "hover:border-primary/30 hover:from-card hover:to-card/60",
        "hover:shadow-lg hover:shadow-primary/[0.08]",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        "group",
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none">
            {author.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-sm mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
        {text}
      </p>
    </Component>
  )
}
