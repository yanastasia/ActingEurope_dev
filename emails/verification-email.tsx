interface VerificationEmailProps {
  verificationUrl: string
}

export default function VerificationEmail({ verificationUrl }: VerificationEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#021a4a", padding: "20px", textAlign: "center" as const }}>
        <h1 style={{ color: "white", margin: 0 }}>Acting Europe</h1>
        <p style={{ color: "#ffcc00", margin: "5px 0 0" }}>Theatre Without Borders</p>
      </div>

      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#021a4a" }}>Verify Your Email Address</h2>
        <p>
          Thank you for registering with Acting Europe Festival. Please verify your email address to complete your
          registration.
        </p>

        <div style={{ textAlign: "center" as const, margin: "30px 0" }}>
          <a
            href={verificationUrl}
            style={{
              backgroundColor: "#ffcc00",
              color: "#021a4a",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Verify Email Address
          </a>
        </div>

        <p>If you didn't create an account with Acting Europe Festival, you can safely ignore this email.</p>

        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p style={{ wordBreak: "break-all" }}>{verificationUrl}</p>
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
        <p>&copy; {new Date().getFullYear()} Acting Europe Festival. All rights reserved.</p>
      </div>
    </div>
  )
}
