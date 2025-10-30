import * as React from "react";

type TicketSummary = {
  bookingReference: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  tickets: { seatLabel: string; attendeeName: string }[];
};

export default function TicketEmail(props: TicketSummary) {
  const { bookingReference, eventTitle, date, time, venue, tickets } = props;
  return (
    <html>
      <body style={{ backgroundColor: "#f6f6f6", fontFamily: "Arial, sans-serif", margin: 0, padding: "20px" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "24px", maxWidth: "600px", margin: "0 auto", borderRadius: "8px" }}>
          <div style={{ backgroundColor: "#021a4a", padding: "20px", textAlign: "center", marginBottom: "20px" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "24px" }}>Acting Europe</h1>
            <p style={{ color: "#ffcc00", margin: "5px 0 0", fontSize: "14px" }}>Theatre Without Borders</p>
          </div>
          
          <h2 style={{ color: "#021a4a", fontSize: "22px", margin: "0 0 16px 0" }}>
            Your tickets for {eventTitle}
          </h2>
          <p style={{ marginTop: 8, marginBottom: 8, color: "#333" }}>{date} at {time} · {venue}</p>
          <p style={{ marginBottom: 16, color: "#333" }}>Booking reference: <strong>{bookingReference}</strong></p>

          <hr style={{ borderColor: "#ffcc00", margin: "16px 0", border: "none", borderTop: "2px solid #ffcc00" }} />

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: "16px", color: "#021a4a", margin: "0 0 12px 0" }}>
              Tickets in this order
            </h3>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {tickets.map((t, i) => (
                <li key={i} style={{ marginBottom: 4, color: "#333" }}>
                  {t.attendeeName} — {t.seatLabel}
                </li>
              ))}
            </ul>
          </div>

          <p style={{ marginTop: 12, marginBottom: 12, color: "#333", lineHeight: 1.5 }}>
            We attached a separate PDF file for each attendee. Each person should bring their own PDF or show it on a phone at the entrance.
          </p>

          <p style={{ fontSize: "12px", color: "#666", marginTop: 16, marginBottom: 0 }}>
            Having trouble opening attachments? Reply to this email and we will resend them.
          </p>
          
          <div style={{ marginTop: 20, padding: 15, backgroundColor: "#f8f9fa", borderRadius: 4, textAlign: "center" }}>
            <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Acting Europe Festival · actingeurope@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  );
}
