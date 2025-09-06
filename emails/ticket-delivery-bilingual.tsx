import * as React from "react";

type TicketSummary = {
  bookingReference: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  tickets: { seatLabel: string; attendeeName: string }[];
  language?: 'en' | 'bg';
};

const translations = {
  en: {
    title: "Your tickets for",
    bookingRef: "Booking reference:",
    ticketsInOrder: "Tickets in this order",
    attachmentInfo: "We attached a separate PDF file for each attendee. Each person should bring their own PDF or show it on a phone at the entrance.",
    troubleInfo: "Having trouble opening attachments? Reply to this email and we will resend them.",
    footer: "Acting Europe Festival · tickets@actingeurope.com",
    tagline: "Theatre Without Borders"
  },
  bg: {
    title: "Вашите билети за",
    bookingRef: "Референтен номер на резервацията:",
    ticketsInOrder: "Билети в тази поръчка",
    attachmentInfo: "Приложихме отделен PDF файл за всеки участник. Всеки човек трябва да донесе своя PDF или да го покаже на телефона на входа.",
    troubleInfo: "Имате проблеми с отварянето на прикачените файлове? Отговорете на този имейл и ще ги изпратим отново.",
    footer: "Фестивал Acting Europe · tickets@actingeurope.com",
    tagline: "Театър без граници"
  }
};

export default function TicketDeliveryBilingual(props: TicketSummary) {
  const { bookingReference, eventTitle, date, time, venue, tickets, language = 'en' } = props;
  const t = translations[language];
  
  return (
    <html>
      <body style={{ backgroundColor: "#f6f6f6", fontFamily: "Arial, sans-serif", margin: 0, padding: "20px" }}>
        <div style={{ backgroundColor: "#ffffff", padding: "24px", maxWidth: "600px", margin: "0 auto", borderRadius: "8px" }}>
          {/* Header */}
          <div style={{ backgroundColor: "#021a4a", padding: "20px", textAlign: "center", marginBottom: "20px", borderRadius: "8px 8px 0 0" }}>
            <h1 style={{ color: "white", margin: 0, fontSize: "24px", fontWeight: "bold" }}>Acting Europe</h1>
            <p style={{ color: "#ffcc00", margin: "5px 0 0", fontSize: "14px" }}>{t.tagline}</p>
          </div>
          
          {/* Main Content */}
          <h2 style={{ color: "#021a4a", fontSize: "22px", margin: "0 0 16px 0", fontWeight: "bold" }}>
            {t.title} {eventTitle}
          </h2>
          
          <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f8f9fa", borderRadius: "4px", border: "1px solid #e9ecef" }}>
            <p style={{ margin: "0 0 8px 0", color: "#333", fontSize: "16px", fontWeight: "500" }}>
              📅 {date} at {time}
            </p>
            <p style={{ margin: "0 0 8px 0", color: "#333", fontSize: "16px" }}>
              📍 {venue}
            </p>
            <p style={{ margin: 0, color: "#021a4a", fontSize: "16px", fontWeight: "bold" }}>
              🎫 {t.bookingRef} <span style={{ color: "#ffcc00" }}>{bookingReference}</span>
            </p>
          </div>

          <hr style={{ borderColor: "#ffcc00", margin: "20px 0", border: "none", borderTop: "2px solid #ffcc00" }} />

          {/* Tickets List */}
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", color: "#021a4a", margin: "0 0 12px 0", fontWeight: "bold" }}>
              🎭 {t.ticketsInOrder}
            </h3>
            <div style={{ backgroundColor: "#f8f9fa", padding: "16px", borderRadius: "4px", border: "1px solid #e9ecef" }}>
              {tickets.map((ticket, i) => (
                <div key={i} style={{ 
                  marginBottom: i < tickets.length - 1 ? "12px" : "0", 
                  padding: "8px", 
                  backgroundColor: "white", 
                  borderRadius: "4px",
                  border: "1px solid #dee2e6"
                }}>
                  <p style={{ margin: 0, color: "#333", fontSize: "16px" }}>
                    <strong>{ticket.attendeeName}</strong> — {ticket.seatLabel}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div style={{ 
            backgroundColor: "#fff3cd", 
            border: "1px solid #ffeaa7", 
            borderRadius: "4px", 
            padding: "16px", 
            marginBottom: "20px" 
          }}>
            <p style={{ margin: "0 0 12px 0", color: "#856404", lineHeight: 1.5, fontSize: "14px" }}>
              📱 {t.attachmentInfo}
            </p>
          </div>

          {/* Support Information */}
          <div style={{ 
            backgroundColor: "#d1ecf1", 
            border: "1px solid #bee5eb", 
            borderRadius: "4px", 
            padding: "12px", 
            marginBottom: "20px" 
          }}>
            <p style={{ fontSize: "12px", color: "#0c5460", margin: 0 }}>
              💬 {t.troubleInfo}
            </p>
          </div>
          
          {/* Footer */}
          <div style={{ 
            marginTop: "20px", 
            padding: "15px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "4px", 
            textAlign: "center",
            border: "1px solid #e9ecef"
          }}>
            <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
              {t.footer}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}