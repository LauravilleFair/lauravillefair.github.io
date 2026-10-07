# Lauraville Fair Website — Resources & To-Dos

Everything the website depends on, who controls it, and what's still open.
**No passwords in this file** — keep those in a password manager.

_Last updated: 2026-10-07_

## Open to-dos

- [ ] **Transfer GoDaddy account ownership** to Jaron (or a fair email Jaron controls). Current owner is out of the country for a few days — follow up when she's back. Alternative if a full transfer is a hassle: she adds Jaron via GoDaddy **Delegate Access**.
- [x] **Create GitHub organization** — done 2026-10-07: `LauravilleFair` (Jaron is owner/admin).
- [x] Create website repository + turn on GitHub Pages — done 2026-10-07. Draft preview: https://lauravillefair.github.io
- [ ] Fill in the yellow-highlighted placeholders on the draft site (hours, address, fees, FAQ answers, etc.).
- [ ] Swap in the full-resolution logo (currently `assets/images/logo-lowres.webp`).
- [ ] Add past fair photos to the gallery.
- [ ] Rename the volunteer form for year-round use (drop "2026", use "The Lauraville Fair", update the "40th" wording). The embed link stays the same after renaming.
- [x] "Notify me" signups connected — done 2026-10-07. Delete the test row ("TEST from website - delete me") from the responses sheet.
- [ ] Add remaining Google Form links (volunteer is done) to the `FORMS` list at the top of `assets/js/main.js` (notify, artisan, budding, food, orgs, entertainment, sponsor, volunteer). Use the long `.../viewform` link, not a forms.gle short link.
- [ ] In April: pick the go-live date, set `APPLICATIONS_OPEN` at the top of `assets/js/main.js` — the site switches from "notify me" to the real applications on that date automatically — and email everyone on the notify list.
- [ ] Decide how vendors pay booth fees after acceptance (currently invoiced). Payments are separate from the application.
- [ ] Confirm 2027 prices (site shows 2026: Artisan $75 +$10 spotlight, Budding $25 +$5, Food $200, Neighborhood org $50, 501(c)(3) free; sponsors Silver $500, Community $300, Friend of the Fair $100 or $150?, Platinum/Gold prices unknown).
- [ ] Budding Entrepreneur: decide age range / guardian rules for the vendor page.
- [ ] Find out who is the Google Workspace admin for @thelauravillefair.org.
- [ ] **Before launch:** verify thelauravillefair.org in the GitHub org settings (adds one TXT record in GoDaddy; prevents anyone else claiming the domain on GitHub).
- [ ] **Launch day:** point thelauravillefair.org at GitHub (see DNS section below), then set the custom domain in the repo's Pages settings and tick "Enforce HTTPS".
- [ ] **Launch day:** remove the draft banner and the `noindex` line from every page.
- [ ] **Launch day:** forward lauravillefair.org → https://thelauravillefair.org.

## Domains

| Domain | Role | Registrar | Expires | Notes |
|---|---|---|---|---|
| thelauravillefair.org | **Main site** | GoDaddy | Sep 3, 2028 | Has Google Workspace email — never touch the MX records |
| lauravillefair.org | Redirects to main site | GoDaddy | Sep 3, 2028 | No email |

Both registered Sep 2, 2022. Domain privacy is on. Both currently show GoDaddy's parked page (as of 2026-10-07).

## Accounts

| Service | What it's for | Who has access |
|---|---|---|
| GoDaddy | Domain registration + DNS for both domains | Jaron (logged in); account owner is a fair volunteer — transfer pending |
| Google Workspace | @thelauravillefair.org email | _Unknown — find out who the admin is_ |
| GitHub organization `LauravilleFair` (github.com/LauravilleFair) | Website code + hosting (GitHub Pages) | Jaron (owner, via personal account jaronervin) |
| GitHub repo `LauravilleFair/lauravillefair.github.io` | The site's files (public — required for free Pages) | Same as above |
| Volunteer sign-up Google Form ("2026 Lauraville Fair - Volunteer Signup", owner anne@thelauravillefair.org) | Embedded on Get Involved page, open year-round | Embed link: https://docs.google.com/forms/d/e/1FAIpQLSeDDVWm9sAnAsSfnVpJs2xV83ABrG366GGnju-wbQtdi0TFZA/viewform |
| "Lauraville Fair - Sign up for Notifications" Google Form + (Responses) sheet, owner jay@thelauravillefair.org | Email list for "notify me when applications open" — powers every signup box on the site | Form ID + entry codes are in `NOTIFY_FORM` at the top of `assets/js/main.js` |
| Google Forms + Drive spreadsheet | Vendor/volunteer/etc. applications | _Whose Google account owns these? Ideally the fair's Workspace account_ |

## DNS changes for launch (don't do these until the site is ready)

**thelauravillefair.org** (GoDaddy → DNS):
- Delete the two parked `A` records (`3.33.130.190`, `15.197.148.33`).
- Add four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Change `www` CNAME to `lauravillefair.github.io`.
- **Leave all MX (Google) records alone.**

**lauravillefair.org** (GoDaddy → Forwarding):
- Forward to `https://thelauravillefair.org`, permanent (301), masking **off**.

## Related

- Model site: BaltimoreSoundGuy.com — GitHub Pages, repo `jaronervin/baltimore-sound-guy-site`.
