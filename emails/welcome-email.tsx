import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface WelcomeEmailProps {
  name?: string
  programUrl?: string
}

export default function WelcomeEmail({ name = "Theatre Lover", programUrl = "http://localhost:3000/program" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Acting Europe - Theatre Without Borders</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Acting Europe</Heading>
            <Text style={headerSubtitle}>Theatre Without Borders</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={welcomeMessage}>Welcome to Acting Europe!</Heading>
            
            <Text style={messageText}>
              Hello {name}! Congratulations! Your account has been successfully created. You're now part of our vibrant international theatre community that connects cultures through the magic of performance.
            </Text>

            {/* Features */}
            <Section style={features}>
              <div style={featureItem}>
                <Text style={featureIcon}>🎭</Text>
                <div>
                  <Text style={featureTitle}>Discover Amazing Performances</Text>
                  <Text style={featureDescription}>
                    Explore theatre productions from Bulgaria, North Macedonia, Serbia, and beyond. Find drama, comedy, and monodrama performances in multiple languages.
                  </Text>
                </div>
              </div>
              
              <div style={featureItem}>
                <Text style={featureIcon}>🎫</Text>
                <div>
                  <Text style={featureTitle}>Easy Ticket Booking</Text>
                  <Text style={featureDescription}>
                    Reserve your seats with just a few clicks. Get instant confirmations and digital tickets delivered to your email.
                  </Text>
                </div>
              </div>
              
              <div style={featureItem}>
                <Text style={featureIcon}>🌍</Text>
                <div>
                  <Text style={featureTitle}>Multilingual Experience</Text>
                  <Text style={featureDescription}>
                    Enjoy performances in English, Bulgarian, Macedonian, and Serbian. Many shows include subtitles for better accessibility.
                  </Text>
                </div>
              </div>
              
              <div style={featureItem}>
                <Text style={featureIcon}>📧</Text>
                <div>
                  <Text style={featureTitle}>Stay Updated</Text>
                  <Text style={featureDescription}>
                    Receive notifications about new performances, special events, and exclusive offers from your favorite theatres.
                  </Text>
                </div>
              </div>
            </Section>

            {/* CTA Button */}
            <Section style={ctaContainer}>
              <Link href={programUrl} style={ctaButton}>
                Explore Our Program
              </Link>
            </Section>

            <Text style={footerMessage}>
              Ready to dive into the world of international theatre? Start by browsing our current program and discover your next unforgettable performance.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Welcome to Acting Europe - where cultures meet through theatre!
            </Text>
            
            <div style={footerLinks}>
              <Link href="/about" style={footerLink}>About Us</Link>
              <Link href="/program" style={footerLink}>Program</Link>
              <Link href="/contact" style={footerLink}>Contact</Link>
              <Link href="/profile" style={footerLink}>My Profile</Link>
            </div>
            
            <Text style={copyright}>
              © 2025 Acting Europe. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
}

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}

const header = {
  background: "linear-gradient(135deg, #021a4a 0%, #0d2a5c 100%)",
  padding: "40px 30px",
  textAlign: "center" as const,
}

const headerTitle = {
  color: "#ffffff",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 8px 0",
}

const headerSubtitle = {
  color: "#ffcc00",
  fontSize: "16px",
  fontWeight: "400",
  margin: "0",
}

const content = {
  padding: "40px 30px",
}

const welcomeMessage = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#021a4a",
  marginBottom: "20px",
  textAlign: "center" as const,
}

const messageText = {
  fontSize: "16px",
  color: "#555555",
  marginBottom: "30px",
  textAlign: "center" as const,
  lineHeight: "1.7",
}

const features = {
  margin: "40px 0",
}

const featureItem = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "25px",
  padding: "20px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  borderLeft: "4px solid #ffcc00",
}

const featureIcon = {
  width: "40px",
  height: "40px",
  fontSize: "24px",
  marginRight: "20px",
  flexShrink: 0,
}

const featureTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#021a4a",
  marginBottom: "8px",
}

const featureDescription = {
  fontSize: "14px",
  color: "#666666",
  lineHeight: "1.5",
  margin: "0",
}

const ctaContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const ctaButton = {
  display: "inline-block",
  padding: "16px 32px",
  backgroundColor: "#ffcc00",
  color: "#021a4a",
  textDecoration: "none",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "16px",
  transition: "all 0.3s ease",
}

const footerMessage = {
  marginTop: "30px",
  fontSize: "14px",
  color: "#666666",
  textAlign: "center" as const,
}

const footer = {
  backgroundColor: "#f8f9fa",
  padding: "30px",
  textAlign: "center" as const,
  borderTop: "1px solid #e9ecef",
}

const footerText = {
  fontSize: "14px",
  color: "#666666",
  marginBottom: "15px",
}

const footerLinks = {
  marginBottom: "20px",
}

const footerLink = {
  color: "#021a4a",
  textDecoration: "none",
  margin: "0 15px",
  fontSize: "14px",
}

const copyright = {
  fontSize: "12px",
  color: "#999999",
  margin: "0",
}