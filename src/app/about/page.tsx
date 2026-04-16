"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <TracingBeam className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8 pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            About Social Shelf
          </h1>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Our Mission
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              At Social Shelf, we&apos;re building a community where book lovers
              can connect, discover new reads, and share their literary
              journeys. We believe that reading is both a personal adventure and
              a social experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Our Story
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Social Shelf started as a passion project by a small team of
              readers and developers who wanted to create a dedicated space for
              bibliophiles. We launched in 2023 with the goal of combining the
              best features of social networks with the unique needs of book
              enthusiasts.
            </p>
            <div className="mt-6 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2090&q=80"
                alt="Books on shelves"
                className="w-full h-auto"
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              What We Offer
            </h2>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                  •
                </span>
                <span>Virtual bookshelves to organize your collection</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                  •
                </span>
                <span>Reading challenges and tracking</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                  •
                </span>
                <span>Book recommendations based on your taste</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                  •
                </span>
                <span>Community discussions and reading groups</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Our Team
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              The passionate individuals behind Social Shelf are book
              enthusiasts, tech lovers, and community builders.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                  Sarah Johnson
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Founder & CEO
                </p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                  David Chen
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Lead Developer
                </p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                    alt="Team Member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
                  Maya Patel
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Community Manager
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Our Values
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  Community First
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We believe that readers thrive in supportive communities.
                  Every feature we build is designed to foster connections and
                  meaningful discussions.
                </p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-900  p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  Diversity in Reading
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  We promote diverse voices and perspectives in literature,
                  helping readers discover books from authors of all backgrounds
                  and cultures.
                </p>
              </div>
              <div className="bg-neutral-100 dark:bg-neutral-900  p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  Privacy Respect
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Your reading habits are personal. We respect your privacy and
                  give you control over what you share with others.
                </p>
              </div>
              <div className="bg-neutral-100  dark:bg-neutral-900  p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                  Continuous Learning
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Books are about growth and learning. We constantly improve our
                  platform based on community feedback and changing needs.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-6">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    Is Social Shelf free to use?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Social Shelf is free to join and use. We offer premium
                    features for subscribers, but the core functionality is
                    available to everyone.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base">
                    How do I track my reading progress?{" "}
                  </AccordionTrigger>
                  <AccordionContent>
                    You can easily update your reading status for any book in
                    your library. Mark books as &quot;Want to Read,&quot;
                    &quot;Currently Reading,&quot; or &quot;Read,&quot; and
                    track your page progress.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base">
                    Can I import my books from other platforms?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, Social Shelf allows you to import your library from
                    Goodreads, StoryGraph, and other platforms to make your
                    transition seamless.{" "}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base">
                    How do reading groups work?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can create or join reading groups based on genres,
                    authors, or specific books. Each group has discussion
                    boards, reading schedules, and virtual meetups.{" "}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Join Our Community
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Whether you&apos;re a casual reader or a dedicated bibliophile,
              there&apos;s a place for you on Social Shelf. Join us today and
              connect with readers from around the world.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button className="inline-flex justify-center items-center px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                  Sign Up
                </Button>
              </Link>
              <Button
                className="inline-flex justify-center items-center px-4 py-2.5 "
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </section>
        </div>
      </TracingBeam>
    </div>
  );
}
