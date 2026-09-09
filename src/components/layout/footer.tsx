import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Mail,
  Twitter,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                CrowdLink
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={siteConfig.links.twitter}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-brand-600"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href={siteConfig.links.github}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-brand-600"
                aria-label="GitHub"
              >
                <Github size={18} />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-brand-600"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.email}`}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-brand-600"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/auth/register"
                  className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} />
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} />
                <span>Mon–Fri, 9AM–6PM UTC</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <ul className="space-y-2">
                {siteConfig.legal.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} CrowdLink. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built for crowds that matter.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}