"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUsers, FiSend } from "react-icons/fi";
import { cn } from "@/lib/utils";

const CONTACT_INFO = [
  {
    icon: FiMail,
    title: "Email",
    value: "hello@unilink.com",
    description: "Our friendly team is here to help.",
  },
  {
    icon: FiPhone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri from 9am to 5pm EST.",
  },
  {
    icon: FiMapPin,
    title: "Office",
    value: "San Francisco, CA",
    description: "Remote-first team worldwide.",
  },
];

const FAQS = [
  {
    question: "How do I create an event?",
    answer: "Navigate to the Events page and click 'Create Event'. Fill in the details and submit for review.",
  },
  {
    question: "How does matching work?",
    description: "Our algorithm analyzes participant profiles and project requirements to suggest the best matches.",
  },
  {
    question: "Is UniLink free to use?",
    answer: "Yes, basic access is free. We offer premium features for organizations.",
  },
  {
    question: "How do I apply for research studies?",
    answer: "Browse the Research page, find a study that matches your profile, and click 'Apply Now'.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            <FiMessageSquare className="mr-1.5 h-4 w-4" />
            Contact Us
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Have a question or need help? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {CONTACT_INFO.map((info, index) => (
              <Card
                key={index}
                className={cn(
                  "p-5 sm:p-6",
                  "border-border bg-card",
                  "hover:shadow-lg transition-all duration-300",
                  "text-center"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                <p className="text-sm font-medium text-foreground">{info.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className={cn("p-5 sm:p-8", "border-border bg-card")}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FiSend className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Send a Message</h2>
                <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
              </div>
            </div>

            <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us more about your question..."
                  className={cn(
                    "w-full px-3 py-2 rounded-md border border-border bg-background",
                    "text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    "resize-none"
                  )}
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <FiSend className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 sm:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-4">
              <FiMessageSquare className="mr-1.5" />
              FAQ
            </Badge>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Quick answers to the most common questions about UniLink.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, index) => (
              <Card
                key={index}
                className={cn(
                  "p-4 sm:p-6",
                  "border-border bg-card",
                  "hover:shadow-md transition-all duration-300"
                )}
              >
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer || faq.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Can&apos;t find the answer you&apos;re looking for?
            </p>
            <Button variant="outline">
              <FiUsers className="mr-2" />
              Visit Help Center
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
