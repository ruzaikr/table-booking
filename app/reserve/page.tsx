'use client';

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function ReservePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
     <div className="min-h-screen flex flex-col">
       <Navigation/>

       <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <h1 className="text-3xl font-bold mb-8">Reserve a Table</h1>

         <form onSubmit={handleSubmit} className="space-y-6">
           <div>
             <label htmlFor="name" className="block text-sm font-medium mb-2">
               Name
             </label>
             <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             />
           </div>

           <div>
             <label htmlFor="email" className="block text-sm font-medium mb-2">
               Email
             </label>
             <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             />
           </div>

           <div>
             <label htmlFor="date" className="block text-sm font-medium mb-2">
               Date
             </label>
             <input
                type="date"
                id="date"
                name="date"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             />
           </div>

           <div>
             <label htmlFor="time" className="block text-sm font-medium mb-2">
               Time
             </label>
             <select
                id="time"
                name="time"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             >
               <option value="">Select a time</option>
               <option value="17:00">5:00 PM</option>
               <option value="17:30">5:30 PM</option>
               <option value="18:00">6:00 PM</option>
               <option value="18:30">6:30 PM</option>
               <option value="19:00">7:00 PM</option>
               <option value="19:30">7:30 PM</option>
               <option value="20:00">8:00 PM</option>
               <option value="20:30">8:30 PM</option>
               <option value="21:00">9:00 PM</option>
             </select>
           </div>

           <div>
             <label htmlFor="guests" className="block text-sm font-medium mb-2">
               Number of Guests
             </label>
             <select
                id="guests"
                name="guests"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             >
               <option value="">Select number of guests</option>
               <option value="1">1 person</option>
               <option value="2">2 people</option>
               <option value="3">3 people</option>
               <option value="4">4 people</option>
               <option value="5">5 people</option>
               <option value="6">6 people</option>
               <option value="7">7 people</option>
               <option value="8">8 people</option>
             </select>
           </div>

           <div>
             <label htmlFor="notes" className="block text-sm font-medium mb-2">
               Special Requests
             </label>
             <textarea
                id="notes"
                name="notes"
                rows={3}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:border-gray-500 focus:outline-none"
             ></textarea>
           </div>

           <button
              type="submit"
              className="w-full bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
           >
             Reserve Table
           </button>
         </form>
       </main>

       <Footer/>
     </div>
  );
}