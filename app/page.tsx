// // import Link from "next/link"
// // import { ChevronRight, ShoppingBag } from "lucide-react"

// // import { Button } from "@/components/ui/button"
// // import { CategoryCard } from "@/components/category-card"
// // import { FeaturedProducts } from "@/components/featured-products"

// // export default function Home() {
// //   return (
// //     <div className="flex font-Kanit flex-col min-h-screen">
// //       {/* Hero Section */}
// //       <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-50 to-purple-50">
// //         <div className="container px-4 md:px-6">
// //           <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
// //             <div className="flex flex-col justify-center space-y-4">
// //               <div className="space-y-2">
// //                 <h1 className="text-3xl font-bold  sm:text-5xl xl:text-6xl/none">
// //                   Discover Elegant Fashion at Aatmlok
// //                 </h1>
// //                 <p className="max-w-[600px] text-gray-500 md:text-xl">
// //                   Exquisite imitation jewelry and women's clothing for every occasion. Elevate your style with our
// //                   curated collection.
// //                 </p>
// //               </div>
// //               <div className="flex flex-col gap-2 min-[400px]:flex-row">
// //                 <Link href="/products/jewelry">
// //                   <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
// //                     Shop Jewelry
// //                   </Button>
// //                 </Link>
// //                 <Link href="/products/clothing">
// //                   <Button size="lg" variant="outline">
// //                     Explore Clothing
// //                   </Button>
// //                 </Link>
// //               </div>
// //             </div>
// //             <div className="flex justify-center">
// //               <img
// //                 alt="Aatmlok Fashion Collection"
// //                 className="aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
// //                 height="550"
// //                 src="/hero.png"
// //                 width="550"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Categories Section */}
// //       <section className="w-full py-12 md:py-24 lg:py-32">
// //         <div className="container px-4 md:px-6">
// //           <div className="flex flex-col items-center justify-center space-y-4 text-center">
// //             <div className="space-y-2">
// //               <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Shop by Category</h2>
// //               <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
// //                 Browse our collection by category to find the perfect pieces for your style
// //               </p>
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
// //             <CategoryCard name="Necklaces" image="/placeholder.svg?height=300&width=300" href="/products/necklaces" />
// //             <CategoryCard name="Earrings" image="/placeholder.svg?height=300&width=300" href="/products/earrings" />
// //             <CategoryCard name="Dresses" image="/placeholder.svg?height=300&width=300" href="/products/dresses" />
// //             <CategoryCard name="Sarees" image="/placeholder.svg?height=300&width=300" href="/products/sarees" />
// //           </div>
// //           <div className="flex justify-center mt-8">
// //             <Link href="/products">
// //               <Button variant="outline" className="gap-1">
// //                 View All Categories
// //                 <ChevronRight className="h-4 w-4" />
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Products Section */}
// //       <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
// //         <div className="container px-4 md:px-6">
// //           <div className="flex flex-col items-center justify-center space-y-4 text-center">
// //             <div className="space-y-2">
// //               <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
// //               <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
// //                 Discover our most popular and trending items
// //               </p>
// //             </div>
// //           </div>
// //           <FeaturedProducts />
// //         </div>
// //       </section>

// //       {/* Call to Action */}
// //       <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-600 text-white">
// //         <div className="container px-4 md:px-6">
// //           <div className="flex flex-col items-center justify-center space-y-4 text-center">
// //             <div className="space-y-2">
// //               <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Shop?</h2>
// //               <p className="max-w-[900px] text-pink-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
// //                 Browse our collection and request your favorite items today
// //               </p>
// //             </div>
// //             <Link href="/products">
// //               <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-100">
// //                 <ShoppingBag className="mr-2 h-5 w-5" />
// //                 Start Shopping
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   )
// // }
// "use client"
// import Link from "next/link"
// import { ChevronRight, ShoppingBag, ArrowRight, Star, Send, BellRing } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { CategoryCard } from "@/components/category-card"
// import { FeaturedProducts } from "@/components/featured-products"
// import { useToast } from "@/components/ui/use-toast"
// import { useState } from "react"

// export default function Home() {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//       email: "",
//     })
//     const [isSubmitting, setIsSubmitting] = useState(false)
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault()
//       setIsSubmitting(true)
  
//       try {
//         const response = await fetch("/api/newsletter", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         })
  
//         if (!response.ok) {
//           throw new Error("Failed to send message")
//         }
  
//         toast({
//           title: "Message Sent",
//           description: "Thank you for your message. We'll get back to you soon!",
//         })
  
//         // Reset form
//         setFormData({
//           email: "",
//         })
//       } catch (error) {
//         console.error("Error sending message:", error)
//         toast({
//           title: "Error",
//           description: "Failed to send message. Please try again.",
//           variant: "destructive",
//         })
//       } finally {
//         setIsSubmitting(false)
//       }
//     }
//      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//       }

//       const IgPost = [
//         {
//           src: "/reel1.jpeg",
//           alt: "Instagram Post 1",
//         },
//         {
//           src: "/reel2.jpeg",
//           alt: "Instagram Post 2",
//         },
//         {
//           src: "/reel3.jpeg",
//           alt: "Instagram Post 3",
//         },
//         {
//           src: "/reel4.jpeg",
//           alt: "Instagram Post 4",
//         },
//         {
//           src: "/reel5.jpeg",
//           alt: "Instagram Post 5",
//         },
//         {
//           src: "/reel6.jpeg",
//           alt: "Instagram Post 6",
//         },
//         {
//           src: "/reel7.jpeg",
//           alt: "Instagram Post 7",
//         },
//         {
//           src: "/reel8.jpeg",
//           alt: "Instagram Post 8",
//         },
//       ]
//   return (
//     <div className="flex flex-col font-Kanit min-h-screen">
//       {/* Hero Section - Improved with better spacing, animations and modern gradient */}
//       <section className="w-full py-16 md:py-16 px-5 sm:px-12 lg:py-16 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-50 overflow-hidden relative">
//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full">
//           <div className="absolute top-12 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//           <div className="absolute top-24 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         </div>
        
//         <div className="container px-4 md:px-6 relative z-10">
//           <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="flex flex-col justify-center space-y-6">
//               <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-2">
//                 New Collection Available
//               </div>
//               <div className="space-y-4">
//                 <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
//                   Discover Elegant Fashion at Aatmlok
//                 </h1>
//                 <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
//                   Exquisite imitation jewelry and women's clothing for every occasion. Elevate your style with our
//                   curated collection of timeless pieces.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
//                 {/* <Link href="/products/jewelry">
//                   <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 rounded-full transition-all shadow-lg hover:shadow-pink-200">
//                     Shop Jewelry
//                   </Button>
//                 </Link> */}
//                 <Link href="/products">
//                   <Button size="lg" variant="outline" className="rounded-full bg-pink-600 hover:bg-pink-700 hover:text-white text-white px-8 py-6 transition-all">
//                     Explore our Products
//                   </Button>
//                 </Link>
//               </div>
//               <div className="flex items-center gap-6 pt-6">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${i * 100}`}></div>
//                   ))}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   <span className="font-bold">500+</span> happy customers
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
//                 <img
//                   alt="Aatmlok Fashion Collection"
//                   className="relative aspect-[4/3] overflow-hidden rounded-xl object-contain object-center sm:w-full"
//                   height="550"
//                   src="/hero2.png"
//                   width="550"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Badges Section - New addition */}
//       <section className="w-full px-5 sm:px-12 py-10 bg-white border-b border-gray-100">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
//             <div className="flex flex-col items-center text-center p-4">
//               <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
//                   <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold">Ethically Sourced</h3>
//               <p className="text-gray-500 text-sm mt-1">Responsibly made products</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-4">
//               <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
//                   <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
//                   <path d="M16.5 9.4 7.55 4.24"></path>
//                   <polyline points="3.29 7 12 12 20.71 7"></polyline>
//                   <line x1="12" y1="22" x2="12" y2="12"></line>
//                   <circle cx="18.5" cy="15.5" r="2.5"></circle>
//                   <path d="M20.27 17.27 22 19"></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold">Free Shipping</h3>
//               <p className="text-gray-500 text-sm mt-1">On orders above ₹1999</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-4">
//               <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
//                   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold">Premium Quality</h3>
//               <p className="text-gray-500 text-sm mt-1">Durable and long-lasting</p>
//             </div>
//             <div className="flex flex-col items-center text-center p-4">
//               <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
//                   <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//                   <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold">Secure Checkout</h3>
//               <p className="text-gray-500 text-sm mt-1">100% protected payments</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section - Improved with better layout */}
//       <section className="w-full px-5 sm:px-12 py-16 md:py-16 lg:py-16">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
//               <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
//               Collections
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Shop by Category</h2>
//               <p className="max-w-[700px] text-gray-500 md:text-lg">
//                 Browse our collection by category to find the perfect pieces that reflect your unique style
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             <CategoryCard 
//               name="Jewellery" 
//               image="/necklacethumb.png" 
//               href="/products/jewellery"
//               // description="Elegant pieces for every occasion" 
//             />
           
//             <CategoryCard 
//               name="Dresses" 
//               image="/dressthumb.png" 
//               href="/products/dresses"
//               // description="Contemporary and traditional styles" 
//             />
//             <CategoryCard 
//               name="Sarees" 
//               image="/sareethumb.png" 
//               href="/products/sarees"
//               // description="Timeless elegance for special occasions" 
//             />
//              <CategoryCard 
//               name="Others" 
//               image="/others.png" 
//               href="/products/others"
//               // description="From studs to chandeliers" 
//             />
//           </div>
//           <div className="flex justify-center mt-12">
//             <Link href="/products">
//               <Button variant="outline" className="group border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full px-6 py-2.5 transition-all">
//                 View All Categories
//                 <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* New Section: Testimonials */}
//       <section className="w-full px-5 sm:px-12 py-16 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
//               <Star className="h-3.5 w-3.5" />
//               Testimonials
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
//               <p className="max-w-[700px] text-gray-500 md:text-lg">
//                 Don't just take our word for it — hear from our happy customers
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Hardik Panchal",
//                 image: "https://yt3.ggpht.com/yti/ANjgQV9i5vMPZw0u7BuYnS8sJRM0tRntg_LhT7aI5XURaioBz1Yr=s88-c-k-c0x00ffffff-no-rj",
//                 quote: "The jewelry I purchased exceeded my expectations. Such beautiful craftsmanship and attention to detail!",
//                 rating: 5
//               },
//               {
//                 name: "Anil Sinh Zala",
//                 image: "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
//                 quote: "I wore my Aatmlok saree to a wedding and received so many compliments. The quality is outstanding!",
//                 rating: 5
//               },
//               {
//                 name: "Poonam Ben",
//                 image: "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
//                 quote: "Amazing customer service and fast shipping. I'll definitely be shopping here again soon!",
//                 rating: 5
//               }
//             ].map((testimonial, i) => (
//               <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
//                 <div className="flex items-center gap-2 mb-4">
//                   {Array(testimonial.rating).fill(0).map((_, i) => (
//                     <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full overflow-hidden">
//                     <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium">{testimonial.name}</h4>
//                     <p className="text-sm text-gray-500">Verified Customer</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products Section - Improved layout and design */}
//       <section className="w-full py-16 px-5 sm:px-12 md:py-24 lg:py-32">
//         <div className="container px-4 md:px-6">
//           <div className="flex justify-between items-end mb-12">
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
//                 <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
//                 Trending Now
//               </div>
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Products</h2>
//               <p className="max-w-[600px] text-gray-500 md:text-lg">
//                 Discover our most popular and trending items loved by our customers
//               </p>
//             </div>
//             {/* <Link href="/products/featured" className="hidden md:flex items-center text-pink-600 hover:text-pink-700 font-medium">
//               View All
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Link> */}
//           </div>
//           <FeaturedProducts />
//           <div className="flex justify-center mt-12 md:hidden">
//             <Link href="/products/featured">
//               <Button variant="outline" className="group border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full px-6 py-2.5 transition-all">
//                 View All Featured Products
//                 <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* New Section: Instagram Feed */}
//       <section className="w-full pb-10 px-5 sm:px-12 md:pb-12 bg-gray-50">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//               </svg>
//               Follow Us
//             </div>
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">#AatmlokFashion</h2>
//               <p className="max-w-[700px] text-gray-500 md:text-lg">
//                 Follow us on Instagram and tag your photos with #AatmlokFashion for a chance to be featured
//               </p>
//             </div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
//             {IgPost.map((i) => (
//               <div key={i.alt} className="aspect-square overflow-hidden rounded-xl relative group">
//                 <img 
//                   src={i.src} 
//                   alt={`Instagram post ${i.alt}`} 
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                   <div className="text-white text-sm">
//                     <div className="flex items-center gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
//                       </svg>
//                       {Math.floor(Math.random() * 500) + 100}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center mt-10">
//             <a 
//               href="https://www.instagram.com/aatmlok?igsh=emJvbHhvZ2pxYnl6" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
//             >
//               Follow on Instagram
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
//                 <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                 <polyline points="15 3 21 3 21 9"></polyline>
//                 <line x1="10" y1="14" x2="21" y2="3"></line>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action - Enhanced with better design */}
//       {/* <section className="w-full py-16 md:py-24 lg:py-32 overflow-hidden relative">
//         <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-700"></div>
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-full h-full">
//             <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
//             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
//           </div>
//         </div>
//         <div className="container px-4 md:px-6 relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="flex flex-col space-y-6 text-white max-w-lg">
//               <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
//                 Limited Time Offer
//               </div>
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to Elevate Your Style?</h2>
//               <p className="text-lg text-pink-100">
//                 Browse our collection and request your favorite items today. Use code <span className="font-bold">WELCOME10</span> to get 10% off on your first order.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Link href="/products">
//                   <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 rounded-full px-8 py-6 font-medium shadow-lg transition-all">
//                     <ShoppingBag className="mr-2 h-5 w-5" />
//                     Start Shopping
//                   </Button>
//                 </Link>
//                 <Link href="/contact">
//                   <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 py-6 transition-all">
//                     Contact Us
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="flex justify-center hidden md:block">
//               <img
//                 alt="Aatmlok Collection"
//                 className="aspect-square object-cover rounded-full border-8 border-white/20 shadow-2xl"
//                 height="400"
//                 src="/placeholder.svg?height=400&width=400&text=Special+Offer"
//                 width="400"
//               />
//             </div>
//           </div>
//         </div>
//       </section> */}

//       {/* Newsletter Section - New addition */}
//       <section className="w-full py-16 px-5 sm:px-12 md:py-16 bg-white">
//         <form onSubmit={handleSubmit} className="container px-4 md:px-6">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div className="space-y-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                   <polyline points="22,6 12,13 2,6"></polyline>
//                 </svg>
//                 Stay Updated
//               </div>
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to Our Newsletter</h2>
//               <p className="text-gray-500 max-w-md md:text-lg">
//                 Be the first to know about new arrivals, exclusive offers, and fashion tips.
//               </p>
//             </div>
//             <div className="flex flex-col space-y-4">
//               <div className="flex flex-col sm:flex-row gap-2">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
//                 />
//                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-3" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   "Sending..."
//                 ) : (
//                   <>
//                     <BellRing className="mr-2 h-4 w-4" />
//                     Subscribe
//                   </>
//                 )}
//               </Button>
//               </div>
//               <p className="text-sm text-gray-500">
//                 By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
//               </p>
//             </div>
//           </div>
//         </form>
//       </section>
//     </div>
//   )
// }
"use client"
import Link from "next/link"
import { ChevronRight, ShoppingBag, ArrowRight, Star, Send, BellRing } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedProducts } from "@/components/featured-products"
import { DynamicCategories } from "@/components/dynamic-categories" // Import the new component
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function Home() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
      email: "",
    })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      })

      // Reset form
      setFormData({
        email: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const IgPost = [
    {
      src: "/reel1.jpeg",
      alt: "Instagram Post 1",
    },
    {
      src: "/reel2.jpeg",
      alt: "Instagram Post 2",
    },
    {
      src: "/reel3.jpeg",
      alt: "Instagram Post 3",
    },
    {
      src: "/reel4.jpeg",
      alt: "Instagram Post 4",
    },
    {
      src: "/reel5.jpeg",
      alt: "Instagram Post 5",
    },
    {
      src: "/reel6.jpeg",
      alt: "Instagram Post 6",
    },
    {
      src: "/reel7.jpeg",
      alt: "Instagram Post 7",
    },
    {
      src: "/reel8.jpeg",
      alt: "Instagram Post 8",
    },
  ]
  
  return (
    <div className="flex flex-col font-Kanit min-h-screen">
      {/* Hero Section - Improved with better spacing, animations and modern gradient */}
      <section className="w-full py-16 md:py-16 px-5 sm:px-12 lg:py-16 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-50 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-12 left-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-24 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-2">
                New Collection Available
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                  Discover Elegant Fashion at Aatmlok
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                  Exquisite imitation jewelry and women's clothing for every occasion. Elevate your style with our
                  curated collection of timeless pieces.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                <Link href="/products">
                  <Button size="lg" variant="outline" className="rounded-full bg-pink-600 hover:bg-pink-700 hover:text-white text-white px-8 py-6 transition-all">
                    Explore our Products
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gray-${i * 100}`}></div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold">500+</span> happy customers
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
                <img
                  alt="Aatmlok Fashion Collection"
                  className="relative aspect-[4/3] overflow-hidden rounded-xl object-contain object-center sm:w-full"
                  height="550"
                  src="/hero2.png"
                  width="550"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges Section - New addition */}
      <section className="w-full px-5 sm:px-12 py-10 bg-white border-b border-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Ethically Sourced</h3>
              <p className="text-gray-500 text-sm mt-1">Responsibly made products</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                  <path d="M16.5 9.4 7.55 4.24"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                  <circle cx="18.5" cy="15.5" r="2.5"></circle>
                  <path d="M20.27 17.27 22 19"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-gray-500 text-sm mt-1">On orders above ₹1999</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Premium Quality</h3>
              <p className="text-gray-500 text-sm mt-1">Durable and long-lasting</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Secure Checkout</h3>
              <p className="text-gray-500 text-sm mt-1">100% protected payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Updated to use dynamic categories */}
      <section className="w-full px-5 sm:px-12 py-16 md:py-16 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
              Collections
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Shop by Category</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Browse our collection by category to find the perfect pieces that reflect your unique style
              </p>
            </div>
          </div>
          {/* Replace the hard-coded grid with the dynamic component */}
          <DynamicCategories />
          <div className="flex justify-center mt-12">
            <Link href="/products">
              <Button variant="outline" className="group border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full px-6 py-2.5 transition-all">
                View All Categories
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Section: Testimonials */}
      <section className="w-full px-5 sm:px-12 py-16 md:py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              <Star className="h-3.5 w-3.5" />
              Testimonials
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Don't just take our word for it — hear from our happy customers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Hardik Panchal",
                image: "https://yt3.ggpht.com/yti/ANjgQV9i5vMPZw0u7BuYnS8sJRM0tRntg_LhT7aI5XURaioBz1Yr=s88-c-k-c0x00ffffff-no-rj",
                quote: "The jewelry I purchased exceeded my expectations. Such beautiful craftsmanship and attention to detail!",
                rating: 5
              },
              {
                name: "Anil Sinh Zala",
                image: "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
                quote: "I wore my Aatmlok saree to a wedding and received so many compliments. The quality is outstanding!",
                rating: 5
              },
              {
                name: "Poonam Ben",
                image: "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg",
                quote: "Amazing customer service and fast shipping. I'll definitely be shopping here again soon!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Improved layout and design */}
      <section className="w-full py-16 px-5 sm:px-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-pink-500"></span>
                Trending Now
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Products</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Discover our most popular and trending items loved by our customers
              </p>
            </div>
          </div>
          <FeaturedProducts />
          <div className="flex justify-center mt-12 md:hidden">
            <Link href="/products/featured">
              <Button variant="outline" className="group border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full px-6 py-2.5 transition-all">
                View All Featured Products
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Section: Instagram Feed */}
      <section className="w-full pb-10 px-5 sm:px-12 md:pb-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Follow Us
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">#AatmlokFashion</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                Follow us on Instagram and tag your photos with #AatmlokFashion for a chance to be featured
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {IgPost.map((i) => (
              <div key={i.alt} className="aspect-square overflow-hidden rounded-xl relative group">
                <img 
                  src={i.src} 
                  alt={`Instagram post ${i.alt}`} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white text-sm">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                      </svg>
                      {Math.floor(Math.random() * 500) + 100}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <a 
              href="https://www.instagram.com/aatmlok?igsh=emJvbHhvZ2pxYnl6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Follow on Instagram
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section - New addition */}
      <section className="w-full py-16 px-5 sm:px-12 md:py-16 bg-white">
        <form onSubmit={handleSubmit} className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Stay Updated
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to Our Newsletter</h2>
              <p className="text-gray-500 max-w-md md:text-lg">
                Be the first to know about new arrivals, exclusive offers, and fashion tips.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 py-3" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <BellRing className="mr-2 h-4 w-4" />
                      Subscribe
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}