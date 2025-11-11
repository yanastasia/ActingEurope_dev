# DNS Migration — Move domain to JEThost.bg

This guide helps you point your domain to the JEThost hosting while preserving email deliverability and HTTPS.

## Inputs to Gather
- JEThost server IP address (from cPanel → General Information).
- Whether IPv6 is enabled (optional AAAA record).
- Existing email provider details (e.g., Postmark, cPanel mail).

## Records to Change
- Apex/root (`@`): set `A` to JEThost server IP.
- `www`: set `CNAME` to `@` (or directly to JEThost if preferred).
- Optional wildcard: `*.your-domain.tld` as `A` (same IP) or `CNAME` to `@`.
- TTL: 300–900 seconds during migration to speed propagation.

## Email Deliverability (SPF/DKIM/DMARC)
- SPF (`TXT` at root): include JEThost and/or Postmark as needed:
  - Example (Postmark + JEThost web): `v=spf1 include:spf.mtasv.net ip4:<JEThost-IP> ~all`
- DKIM: if using Postmark, enable DKIM in Postmark and publish the provided `CNAME/TXT` records.
- DMARC (`_dmarc` TXT):
  - Example: `v=DMARC1; p=quarantine; rua=mailto:dmarc@your-domain.tld; pct=100`
- If using cPanel email instead of Postmark, add MX records per JEThost/cPanel mail docs.

## SSL/TLS
- After DNS points to JEThost, enable AutoSSL in cPanel (or JEThost’s certificate manager) to issue certificates for `@` and `www`.

## Verification
- Use `dig` or online DNS checkers to confirm records:
  - `dig your-domain.tld A`
  - `dig www.your-domain.tld CNAME`
  - `dig TXT your-domain.tld` (SPF)
  - `dig TXT _dmarc.your-domain.tld` (DMARC)
- Visit `https://your-domain.tld` to confirm HTTPS and app availability.

## Rollback Plan
- Keep old provider records noted.
- If issues arise, revert the `A`/`CNAME` to previous values and re-run AutoSSL at the old host.

## Notes
- DNS propagation can take up to 24–48 hours; most updates land within minutes when TTL is low.
- Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` to match the final domain.