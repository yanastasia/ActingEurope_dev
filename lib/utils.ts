import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format event time consistently across environments
export function formatEventTime(eventTime: any): string {
  if (!eventTime) return 'TBA';
  
  // Handle different time formats that might come from the database
  let timeObj: Date;
  
  if (eventTime instanceof Date) {
    timeObj = eventTime;
  } else if (typeof eventTime === 'string') {
    // Try parsing as ISO string first
    timeObj = new Date(eventTime);
    // If invalid, try parsing as time string (HH:MM:SS)
    if (isNaN(timeObj.getTime())) {
      const today = new Date();
      const [hours, minutes] = eventTime.split(':').map(Number);
      timeObj = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours || 0, minutes || 0);
    }
  } else {
    // Fallback for other formats
    timeObj = new Date(eventTime);
  }
  
  // Return formatted time as HH:MM
  if (!isNaN(timeObj.getTime())) {
    return `${timeObj.getHours().toString().padStart(2, '0')}:${timeObj.getMinutes().toString().padStart(2, '0')}`;
  }
  
  return 'TBA';
}
