import Link from "next/link";

export default function Navigation() {
  return (
     <nav className="border-b border-gray-800">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between h-16">
           <div className="flex-shrink-0 flex items-center">
             <Link href="/" className="text-xl font-bold">
               Molina
             </Link>
           </div>
           <div className="flex space-x-8">
             <Link
                href="/menu"
                className="inline-flex items-center px-1 pt-1 hover:text-gray-400"
             >
               Menu
             </Link>
             <Link
                href="/reserve"
                className="inline-flex items-center px-1 pt-1 hover:text-gray-400"
             >
               Reserve
             </Link>
             <Link
                href="/contact"
                className="inline-flex items-center px-1 pt-1 hover:text-gray-400"
             >
               Contact
             </Link>
           </div>
         </div>
       </div>
     </nav>
  );
}