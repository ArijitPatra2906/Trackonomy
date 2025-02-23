import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={"/logo.png"}
            alt="Trackonomy Logo"
            width={180}
            height={50}
            className="h-16 md:h-20 w-auto object-contain"
          />
          <p className="text-gray-700 text-lg font-medium">
            Manage Your Finances with Intelligence
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 text-center">
            Connect with Us
          </h2>
          <div className="flex items-center justify-center space-x-5 mt-4">
            {[
              {
                icon: <Twitter className="text-blue-500 w-6 h-6" />,
                href: "https://x.com/arijitpatra2000?t=jB_7W34BR04OjacUjWLpQw&s=09",
              },
              {
                icon: <Linkedin className="text-blue-700 w-6 h-6" />,
                href: "https://www.linkedin.com/in/arijitpatra2906/",
              },
              {
                icon: <Github className="text-gray-800 w-6 h-6" />,
                href: "https://github.com/ArijitPatra2906",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-gray-300 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Trackonomy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
