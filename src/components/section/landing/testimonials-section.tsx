"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiStar } from "react-icons/fi";

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Chen",
    role: "Research Lead, Stanford University",
    content:
      "UniLink helped us recruit 200 participants for our climate study in just two weeks. The quality of volunteers was exceptional.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Event Organizer, TechConf",
    content:
      "The platform's matching algorithm connected us with the perfect speakers and attendees. Our event was a huge success.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Volunteer Participant",
    content:
      "I love how easy it is to find meaningful projects. I've contributed to three research studies and met amazing people.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white border-neutral-300">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Trusted by Organizations Worldwide
          </h2>
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            See what our community has to say about their experience with
            UniLink.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-neutral-400 fill-neutral-400"
                  />
                ))}
              </div>

              <p className="text-neutral-500 dark:text-neutral-400 mb-6 italic flex-1">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
