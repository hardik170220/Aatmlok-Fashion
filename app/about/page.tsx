import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Aatmlok Fashion</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover the story behind our passion for elegant fashion and timeless beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2022, Aatmlok Fashion began with a simple vision: to create beautiful, affordable fashion
              accessories and clothing that celebrate the rich cultural heritage of India while embracing contemporary
              design sensibilities.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small boutique in New Delhi has grown into a beloved brand known for its exquisite
              imitation jewellery and women's clothing. Our founder, <span className="font-bold text-pink-600">Rohit Sinh</span>, brings over 3 years of experience in
              the fashion industry and a deep appreciation for traditional craftsmanship.
            </p>
            <p className="text-gray-600">
              Today, we continue to source the finest materials and work with skilled artisans to create pieces that
              bring joy and confidence to women across India.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/owner.jpeg"
              alt="Aatmlok Fashion Store"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Quality & Craftsmanship</h3>
              <p className="text-gray-600">
                We believe in creating products that stand the test of time. Each piece is crafted with attention to
                detail and a commitment to excellence.
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Empowering Women</h3>
              <p className="text-gray-600">
                Our designs are created to make women feel beautiful, confident, and empowered in their everyday lives
                and special occasions.
              </p>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-3">Accessible Elegance</h3>
              <p className="text-gray-600">
                We believe that elegance should be accessible to all. Our products offer luxury aesthetics at affordable
                prices without compromising on quality.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Visit Our Store</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We invite you to visit our flagship store in Idar, Gujarat where you can explore our complete collection and
            receive personalized styling advice from our team.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg inline-block">
            <p className="font-medium">Aatmlok Fashion</p>
            <p className="text-gray-600">Address</p>
            <p className="text-gray-600">Idar, Gujarat</p>
            <p className="text-gray-600 mt-2">Open Monday - Saturday: 10:00 AM - 8:00 PM</p>
            <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our latest collection of jewellery and clothing, or get in touch with our team if you have any
            questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

