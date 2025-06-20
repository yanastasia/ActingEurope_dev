interface TicketEmailProps {
  name: string
  eventTitle: string
  eventDate: string
  eventTime: string
  venue: string
  seats: string
}

export default function TicketEmail({ name, eventTitle, eventDate, eventTime, venue, seats }: TicketEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#021a4a", padding: "20px", textAlign: "center" as const }}>
        <h1 style={{ color: "white", margin: 0 }}>Acting Europe</h1>
        <p style={{ color: "#ffcc00", margin: "5px 0 0" }}>Theatre Without Borders</p>
      </div>

      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#021a4a" }}>Your Tickets Are Confirmed!</h2>
        <p>Hello {name},</p>
        <p>
          Thank you for your booking. Your tickets for <strong>{eventTitle}</strong> are attached to this email as a
          PDF.
        </p>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "15px",
            margin: "20px 0",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ color: "#021a4a", margin: "0 0 10px 0" }}>Booking Details</h3>
          <p style={{ margin: "5px 0" }}>
            <strong>Event:</strong> {eventTitle}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Date:</strong> {eventDate}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Time:</strong> {eventTime}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Venue:</strong> {venue}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Seats:</strong> {seats}
          </p>
        </div>

        <p>
          Please bring your ticket (printed or on your mobile device) to the venue. We recommend arriving at least 30
          minutes before the performance starts.
        </p>

        <p>We look forward to seeing you at the festival!</p>
      </div>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          textAlign: "center" as const,
          fontSize: "12px",
          color: "#666",
        }}
      >
        <p>If you have any questions, please contact us at tickets@actingeurope.com</p>
        <p>&copy; {new Date().getFullYear()} Acting Europe Festival. All rights reserved.</p>
      </div>
    </div>
  )
}
