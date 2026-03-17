"use client"

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

// Sample testimonials showcasing client commitments and trust
const commitmentTestimonials = [
  {
    author: {
      name: "Sarah Chen",
      handle: "@tech_director",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Mometia transformed our security posture from reactive to proactive. Their comprehensive approach to threat detection reduced our incident response time by 75%.",
    href: "https://twitter.com"
  },
  {
    author: {
      name: "Marcus Rodriguez",
      handle: "@infosec_lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The penetration testing insights were invaluable. We patched critical vulnerabilities before they could be exploited. Mometia is now integral to our security strategy.",
    href: "https://twitter.com"
  },
  {
    author: {
      name: "Elena Vasquez",
      handle: "@compliance_mgr",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their GRC & compliance expertise helped us achieve SOC 2 Type II certification in half the expected timeline. Highly professional and knowledgeable team.",
    href: "https://twitter.com"
  },
  {
    author: {
      name: "David Park",
      handle: "@ciso",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Cloud security is complex, but Mometia made it straightforward. Their monitoring platform gives us visibility we never had before. Outstanding support team.",
    href: "https://twitter.com"
  },
  {
    author: {
      name: "Jessica Lee",
      handle: "@cto",
      avatar: "https://images.unsplash.com/photo-1487412992267-228dcd4e2e0d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The ransomware defense strategies have been game-changing for our organization. We've prevented multiple attacks thanks to their early warning systems.",
    href: "https://twitter.com"
  },
  {
    author: {
      name: "Michael Thompson",
      handle: "@risk_officer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Working with Mometia has elevated our entire security program. Their team is proactive, responsive, and truly invested in our success.",
    href: "https://twitter.com"
  }
]

export function Commitments() {
  return (
    <section id="commitments">
      <TestimonialsSection
        title="Trusted by Leading Organizations"
        description="See how industry leaders are securing their infrastructure with Mometia's comprehensive security solutions"
        testimonials={commitmentTestimonials}
        variant="light"
      />
    </section>
  )
}
