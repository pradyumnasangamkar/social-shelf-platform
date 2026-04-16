"use client";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Social Shelf has transformed how our book club operates. The event management and book tracking features are incredibly helpful!",
    name: "Sarah Johnson",
    designation: "Book Club Member",
    src: "/avatars/sarah.jpg",
  },
  {
    quote:
      "The book rental system is so convenient. I love how easy it is to browse and reserve books online.",
    name: "Michael Chen",
    designation: "Library Member",
    src: "/avatars/michael.jpg",
  },
  {
    quote:
      "As an event organizer, I appreciate how smoothly the platform handles registrations and communications.",
    name: "Emma Davis",
    designation: "Event Organizer",
    src: "/avatars/emma.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Members Say
        </h2>
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
