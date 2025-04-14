import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa";


export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
           <img src="/atmlok_logo.png" className="h-24" alt="Aatmlok Fashion" />
            <p className="text-sm text-gray-500">
              Exquisite imitation jewelry and women's clothing for every occasion.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/share/1C8T6W8cDg/" className="text-gray-500 hover:text-pink-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/aatmlok?igsh=emJvbHhvZ2pxYnl6" className="text-gray-500 hover:text-pink-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://chat.whatsapp.com/CvOTtJoEi3BJohnxWNXMoF" className="text-gray-500 hover:text-pink-600">
                <FaWhatsapp className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://x.com/aatmlok?t=8LfNzwga6kMgq8ZXfgsRjw&s=09" className="text-gray-500 hover:text-pink-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-pink-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-pink-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-pink-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-500"></li>
              <li>
                <Link href="tel:+919876543210" className="text-gray-500 hover:text-pink-600">
                  +91 9512112181
                </Link>
              </li>
              <li>
                <Link href="mailto:aatmlok181@gmail.com" className="text-gray-500 hover:text-pink-600">
                aatmlok181@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Aatmlok Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

