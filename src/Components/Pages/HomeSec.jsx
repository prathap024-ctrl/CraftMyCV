"use client"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import { FlipWords } from "../ui/flip-words";
import { ArrowRight, CheckIcon, ChevronDownIcon } from "lucide-react";
import { Field, Label, Switch } from "@headlessui/react";
import images from "../../assets/images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/Components/ui/carousel";

function HomeSec() {
  const [agreed, setAgreed] = useState(false);
  const words = [
    "AI Resume Builder",
    "Resume Analyzer",
    "ATS Score Checker",
    "AI-Powered CV Tool",
    "Optimize Your Resume",
    "Tailored for ATS",
    "Get Hired Faster",
    "Craft Job-Winning Resumes",
    "Smart Resume Suggestions",
    "Instant Resume Feedback",
    "Resume Score Insights",
    "HR-Ready Formats",
  ];

  const tiers = [
    {
      name: "Free Plan",
      id: "tier-hobby",
      href: "#",
      priceMonthly: "₹0",
      description:
        "The perfect plan if you're just getting started with our product.",
      features: [
        "ATS Compatibility Score",
        "Access to Resume Builder",
        "Export as PDF only",
        "Limited AI Optimization Suggestions",
      ],
      featured: false,
    },
    {
      name: "Pro Plan",
      id: "tier-enterprise",
      href: "#",
      priceMonthly: "₹299",
      description: "Dedicated support and infrastructure for your company.",
      features: [
        "Unlimited Resume Checks",
        "AI Optimization Suggestions",
        "Advanced analytics",
        "Export as PDF/DOCX",
        "Advanced ATS Insights",
      ],
      featured: true,
    },
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
        "I built a clean, professional CV in minutes and got responses from top companies. Brilliant tool!",
      name: "Ananya Verma",
      title: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="relative flex h-screen w-full overflow-hidden rounded-md items-center antialiased md:items-center md:justify-center">
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            CraftMyCV <br /> <FlipWords words={words} /> <br />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
            An AI Resume Analyzer and Builder helps users optimize and create
            professional resumes by analyzing content, formatting, and job
            relevance using artificial intelligence.
          </p>
          <div className="py-8 w-full flex justify-center items-center space-x-4">
            <Link
              to="/build"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs "
            >
              <Button variant="outline">Create</Button>
            </Link>
            <Link
              to="/analyzer"
              className="text-sm font-semibold text-white flex"
            >
              Analyze
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="bg-transparent">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
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
                  to="/build"
                  className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
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
      {/* Pricing */}
      <div className="relative isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 "
        ></div>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-white">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-white sm:text-xl/8">
          Choose an affordable plan that’s packed with the best features for
          engaging your audience, creating customer loyalty, and driving sales.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured
                  ? "relative bg-white shadow-2xl"
                  : "bg-white sm:mx-8 lg:mx-0",
                tier.featured
                  ? ""
                  : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? "text-black" : "text-black",
                  "text-base/7 font-semibold"
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span
                  className={classNames(
                    tier.featured ? "text-black" : "text-black",
                    "text-5xl font-semibold tracking-tight"
                  )}
                >
                  {tier.priceMonthly}
                </span>
                <span
                  className={classNames(
                    tier.featured ? "text-black" : "text-black",
                    "text-base"
                  )}
                >
                  /month
                </span>
              </p>
              <p
                className={classNames(
                  tier.featured ? "text-black" : "text-black",
                  "mt-6 text-base/7"
                )}
              >
                {tier.description}
              </p>
              <ul
                role="list"
                className={classNames(
                  tier.featured ? "text-black" : "text-black",
                  "mt-8 space-y-3 text-sm/6 sm:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      aria-hidden="true"
                      className={classNames(
                        tier.featured ? "text-black" : "text-black",
                        "h-6 w-5 flex-none"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? "bg-black text-white shadow-xs"
                    : "text-white bg-black shadow-xs",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                )}
              >
                Get started today
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
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
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-144.5 max-w-none -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
            Product Support
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Need help using our resume builder, ATS checker, or AI features?
            Reach out and we'll assist you as soon as possible.
          </p>
        </div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2.5">
                <div className="flex rounded-md bg-white outline-1 -outline-offset-1">
                  <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      aria-label="Country"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-gray-500 placeholder:text-gray-400"
                    >
                      <option>IN</option>
                      <option>US</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="text"
                    placeholder="123-456-7890"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 "
                  defaultValue={""}
                />
              </div>
            </div>
            <Field className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <Switch
                  checked={agreed}
                  onChange={setAgreed}
                  className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out ring-inset data-checked:bg-black"
                >
                  <span className="sr-only">Agree to policies</span>
                  <span
                    aria-hidden="true"
                    className="size-4 transform rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                  />
                </Switch>
              </div>
              <Label className="text-sm/6 text-gray-600">
                By selecting this, you agree to our{" "}
                <a href="#" className="font-semibold text-black">
                  privacy&nbsp;policy
                </a>
                .
              </Label>
            </Field>
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              variant="default"
              className="block w-full rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs"
            >
              Let's talk
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default HomeSec;
