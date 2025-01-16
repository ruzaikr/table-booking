import Link from "next/link";
import Image from "next/image";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function Home() {
  return (
     <div className="min-h-screen flex flex-col">
       <Navigation/>

       <main className="flex-grow">
         {/* Hero Section */}
         <div className="relative">
           {/* Hero Image */}
           <div className="h-96 w-full relative">
             <Image
                src="/images/molinahero.jpg"
                alt="Restaurant interior"
                fill
                priority
                className="object-cover"
                sizes="100vw"
             />
           </div>

           {/* Hero Content */}
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <div className="text-center text-white">
               <h2 className="text-4xl font-bold mb-4">Welcome to Our Restaurant</h2>
               <p className="text-xl mb-8">Experience fine dining at its best</p>
               <Link
                  href="/reserve"
                  className="bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
               >
                 Reserve a Table
               </Link>
             </div>
           </div>
         </div>

         {/* Additional Content Section */}
         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="p-6 bg-gray-800/50 rounded-lg">
               <h3 className="text-xl font-semibold mb-4">Our Cuisine</h3>
               <p className="text-gray-400">
                 Experience our expertly crafted dishes made with the finest ingredients.
               </p>
             </div>
             <div className="p-6 bg-gray-800/50 rounded-lg">
               <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
               <p className="text-gray-400">
                 Mon-Sun: 11:00 AM - 10:00 PM
               </p>
             </div>
             <div className="p-6 bg-gray-800/50 rounded-lg">
               <h3 className="text-xl font-semibold mb-4">Location</h3>
               <p className="text-gray-400">
                 123 Restaurant Street, Foodie City, FC 12345
               </p>
             </div>
           </div>
         </section>
       </main>

       <Footer/>
     </div>
  );
}