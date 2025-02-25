import { reservations, diningTables } from '@/schema';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import {and, eq, gt, gte, lt, not, exists} from 'drizzle-orm';

// Helper function to calculate end time (2 hours after start time)
const getEndTime = (startTime: string): string => {
  const [hour, minute] = startTime.split(':').map(Number);
  const date = new Date();
  date.setHours(hour + 2, minute); // Add 2 hours to the start time
  return date.toTimeString().slice(0, 5);
};

// Server action to handle form submission
const handleSubmit = async (formData: FormData) => {
  'use server';

  // Extract form data
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const guests = formData.get('guests') as string;
  const notes = formData.get('notes') as string;

  // Basic Validation
  if (!name || !email || !date || !time || !guests) {
    console.error('All required fields must be filled out.');
    return;
  }

  // Additional validations can be added here
  // For example: Validate email format, date range, etc.

  // Determine end time based on start time
  const endTime = getEndTime(time);

  try {
    await db.transaction(async (tx) => {

      // Find an available dining table
      const availableTable = await tx
         .select()
         .from(diningTables)
         .where(
            and(
               // Ensure the table has sufficient capacity
               gte(diningTables.capacity, Number(guests)),
               // Ensure no overlapping reservations exist for this table
               not(
                  exists(
                     tx
                        .select()
                        .from(reservations)
                        .where(
                           and(
                              eq(reservations.diningTableId, diningTables.id),
                              eq(reservations.reservationDate, date),
                              lt(reservations.startTime, endTime),
                              gt(reservations.endTime, time)
                           )
                        )
                  )
               )
            )
         )
         .limit(1)
         .execute()
         .then((res) => res[0]);

      if (!availableTable) {
        // Handle no available dining table
        console.error(
           'No available dining table found for the selected number of guests and time slot.'
        );
        throw new Error('No available dining table.');
      }

      // Insert the reservation
      await tx
         .insert(reservations)
         .values({
           diningTableId: availableTable.id,
           name: name,
           email: email,
           notes: notes,
           reservationDate: date,
           startTime: time,
           endTime: endTime
         })
         .execute();
    });

  } catch (error: unknown) {
    // Handle errors (e.g., no available table or insertion issues)
    if (error instanceof Error) {
      console.error('Error creating reservation:', error.message);
    } else {
      console.error('An unexpected error occurred.');
    }
    return; // Exit the function if there's an error
  }

  // If the transaction is successful, redirect to confirmation
  redirect('/reserve/confirmation');

};

export default function ReservePage() {
  return (
     <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <h1 className="text-3xl font-bold mb-8">Reserve a Table</h1>

       <form action={handleSubmit} className="space-y-6">
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
  );
}
