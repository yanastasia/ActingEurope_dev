// Simple auth utility functions for the Acting Europe application

// Check if an email belongs to an admin (specifically admin@actingeurope.eu)
export function isAdminEmail(email: string): boolean {
  return email.toLowerCase() === "admin@actingeurope.eu"
}

// Check if an email belongs to the scanner user
export function isScannerEmail(email: string): boolean {
  return email.toLowerCase() === "tickets@actingeurope.eu"
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("actingEurope_auth") === "true"
}

// Check if user is an admin
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false
  const userRole = localStorage.getItem("actingEurope_userRole")
  return userRole === "admin" || userRole === "super_admin"
}

// Check if user is a scanner
export function isScanner(): boolean {
  if (typeof window === "undefined") return false
  const userRole = localStorage.getItem("actingEurope_userRole")
  return userRole === "scanner"
}

// Set user authentication
export function setAuthenticated(email: string, role: string): void {
  localStorage.setItem("actingEurope_auth", "true")
  localStorage.setItem("actingEurope_userEmail", email)
  localStorage.setItem("actingEurope_userRole", role)

  // Dispatch event to notify components
  window.dispatchEvent(new Event("user-logged-in"))
}

// Get user email
export function getUserEmail(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("actingEurope_userEmail")
}

// Clear user authentication
export function clearAuthentication(): void {
  localStorage.removeItem("actingEurope_auth")
  localStorage.removeItem("actingEurope_userEmail")
  localStorage.removeItem("actingEurope_userRole")

  // Dispatch event to notify components
  window.dispatchEvent(new Event("user-logged-out"))
}

// Logout function (alias for clearAuthentication)
export function logout(): void {
  clearAuthentication()
}
