"use client";
import React from "react";
import { Link } from "react-router-dom";
import { FlipWords } from "../ui/flip-words";
import { ArrowRight } from "lucide-react";

import images from "../../assets/images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useAuth } from "@clerk/clerk-react";

function HomeSec() {
  const { isSignedIn } = useAuth();

  const words = [
    "Resume Analyzer",
    "ATS Score Checker",
    "AI-Powered CV Tool",
    "Optimize Your Resume",
    "Tailored for ATS",
    "Get Hired Faster",
    "Smart Resume Suggestions",
    "Instant Resume Feedback",
    "Resume Score Insights",
  ];

  const testimonials = [
    {
      quote:
        "CraftMyCV helped me land more interviews by optimizing my resume for ATS. The insights were spot on!",
      name: "Rohit Sharma",
      title: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      quote:
        "The ATS compatibility check gave me a huge advantage while applying. Highly recommend to job seekers!",
      name: "Karthik Iyer",
      title: "Product Designer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const stats = [
    { id: 1, name: "Resumes Analyzed", value: "5,200+" },
    { id: 2, name: "Profiles Optimized for ATS", value: "2,300+" },
    { id: 3, name: "Active Users in India", value: "1,000+" },
  ];

  return (
    <>
      <div className="relative flex h-1/2 w-full overflow-hidden rounded-md items-center antialiased md:items-center md:justify-center">
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 mt-24">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            CraftMyCV <br /> <FlipWords words={words} /> <br />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            An AI Resume Analyzer helps users optimize professional resumes by
            analyzing content, formatting, and job relevance using artificial
            intelligence.
          </p>

          <div className="py-8 w-full flex justify-center items-center">
            <Link
              to={isSignedIn ? "/dashboard" : "/sign-in"}
              className="rounded-md text-xl px-8 py-2 font-semibold bg-white text-black shadow-xs"
            >
              Create
            </Link>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl py-16 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle
                r={512}
                cx={512}
                cy={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-tight text-balance text-black sm:text-4xl">
                Ready to Land Your Dream Job?
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-black/75">
                Craft a standout resume with AI-powered insights. Analyze,
                optimize, and impress recruiters — all in one place.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  to={isSignedIn ? "/dashboard" : "/sign-up"}
                  className="rounded-md bg-black px-3.5 py-2.5 flex items-center gap-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                alt="App screenshot"
                src={images.resumeSideBG}
                width={1824}
                height={1080}
                className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-transparent py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-white">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {/* Testimonials */}
      <section className="relative isolate overflow-hidden bg-transparent px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] bg-transparent shadow-xl" />

        <div className="mx-auto max-w-4xl">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <figure className="text-center">
                    <blockquote className="text-xl sm:text-2xl font-semibold text-white">
                      <p>“{testimonial.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-10">
                      <img
                        alt={testimonial.name}
                        src={testimonial.image}
                        className="mx-auto size-12 rounded-full"
                      />
                      <div className="mt-4 flex justify-center items-center gap-2 text-base">
                        <span className="font-semibold text-white">
                          {testimonial.name}
                        </span>
                        <svg
                          width={3}
                          height={3}
                          viewBox="0 0 2 2"
                          aria-hidden="true"
                          className="fill-gray-900"
                        >
                          <circle r={1} cx={1} cy={1} />
                        </svg>
                        <span className="text-white">{testimonial.title}</span>
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Contact form */}
    </>
  );
}

export default HomeSec;
