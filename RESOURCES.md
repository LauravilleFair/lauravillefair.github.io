# Lauraville Fair Website — Resources & To-Dos

Everything the website depends on, who controls it, and what's still open.
**No passwords in this file** — keep those in a password manager.

_Last updated: 2026-10-07_

## Open to-dos

- [ ] **Transfer GoDaddy account ownership** to Jaron (or a fair email Jaron controls). Current owner is out of the country for a few days — follow up when she's back. Alternative if a full transfer is a hassle: she adds Jaron via GoDaddy **Delegate Access**.
- [x] **Create GitHub organization** — done 2026-10-07: `LauravilleFair` (Jaron is owner/admin).
- [x] Create website repository + turn on GitHub Pages — done 2026-10-07. Draft preview: https://lauravillefair.github.io
- [x] Content filled in 2026-10-07. Still open: accessibility FAQ answer, payment process (next discussion), sponsor logos (after the Fair team review), photos.
- [ ] Swap in the full-resolution logo (currently `assets/images/logo-lowres.webp`).
- [ ] Add past fair photos to the gallery.
- [ ] Rename the volunteer form for year-round use (drop "2026", use "The Lauraville Fair", update the "40th" wording). The embed link stays the same after renaming.
- [x] "Notify me" signups connected — done 2026-10-07. Delete the test row ("TEST from website - delete me") from the responses sheet.
- [ ] Add remaining Google Form links (volunteer is done) to the `FORMS` list at the top of `assets/js/main.js` (notify, artisan, budding, food, orgs, entertainment, sponsor, volunteer). Use the long `.../viewform` link, not a forms.gle short link.
- [ ] In April: pick the go-live date, set `APPLICATIONS_OPEN` at the top of `assets/js/main.js` — the site switches from "notify me" to the real applications on that date automatically — and email everyone on the notify list.
- [ ] Decide how vendors pay booth fees after acceptance (currently invoiced). Payments are separate from the application.
- [ ] Confirm 2027 prices (sponsor tiers now taken from the 2026 Sponsorship form: Platinum $1,000+, Gold $750, Silver $500, Community $300, Friend $150) (site shows 2026: Artisan $75 +$10 spotlight, Budding $25 +$5, Food $200, Neighborhood org $50, 501(c)(3) free; sponsors Silver $500, Community $300, Friend of the Fair $100 or $150?, Platinum/Gold prices unknown).
- [x] Budding Entrepreneur: ages 16 and under, parent/guardian must attend.
- [ ] Find out who is the Google Workspace admin for @thelauravillefair.org.
- [ ] **Before launch:** verify thelauravillefair.org in the GitHub org settings (adds one TXT record in GoDaddy; prevents anyone else claiming the domain on GitHub).
- [x] **Coming Soon live** at https://thelauravillefair.org (2026-10-07). DNS changed, custom domain + HTTPS set on the coming-soon repo.
- [ ] Confirm https://www.thelauravillefair.org works. GitHub's certificate covered only the bare domain at first; http://www already redirects correctly.
- [ ] Optional: verify thelauravillefair.org in the GitHub org settings (Settings → Pages → Add a domain, then one TXT record in GoDaddy).
- [ ] **Full-site launch day:** move the custom domain from the coming-soon repo to the main repo (no DNS changes).
- [ ] **Launch day:** remove the draft banner and the `noindex` line from every page.
- [ ] Forward lauravillefair.org (can be done now, with the Coming Soon change) → https://thelauravillefair.org.

## Domains

| Domain | Role | Registrar | Expires | Notes |
|---|---|---|---|---|
| thelauravillefair.org | **Main site** | GoDaddy | Sep 3, 2028 | Has Google Workspace email — never touch the MX records |
| lauravillefair.org | Redirects to main site | GoDaddy | Sep 3, 2028 | No email |

Both registered Sep 2, 2022. Domain privacy is on. thelauravillefair.org shows the Coming Soon page (since 2026-10-07); lauravillefair.org still shows GoDaddy's parked page until forwarding is set up.

## Accounts

| Service | What it's for | Who has access |
|---|---|---|
| GoDaddy | Domain registration + DNS for both domains | Jaron (logged in); account owner is a fair volunteer — transfer pending |
| Google Workspace | @thelauravillefair.org email (public address: Info@TheLauravilleFair.org) | _Admin unknown: find out who it is_ |
| Facebook / Instagram | facebook.com/thelauravillefair · instagram.com/thelauravillefair | Fair team |
| GitHub organization `LauravilleFair` (github.com/LauravilleFair) | Website code + hosting (GitHub Pages) | Jaron (owner, via personal account jaronervin) |
| GitHub repo `LauravilleFair/coming-soon` (local: Documents\Lauraville Fair\Coming Soon) | Temporary Coming Soon page served at thelauravillefair.org until launch | Same as above |
| GitHub repo `LauravilleFair/lauravillefair.github.io` | The site's files (public — required for free Pages) | Same as above |
| Volunteer sign-up Google Form ("2026 Lauraville Fair - Volunteer Signup", owner anne@thelauravillefair.org) | Embedded on Get Involved page, open year-round | Embed link: https://docs.google.com/forms/d/e/1FAIpQLSeDDVWm9sAnAsSfnVpJs2xV83ABrG366GGnju-wbQtdi0TFZA/viewform |
| "Lauraville Fair - Sign up for Notifications" Google Form + (Responses) sheet, owner jay@thelauravillefair.org | Email list for "notify me when applications open" — powers every signup box on the site | Form ID + entry codes are in `NOTIFY_FORM` at the top of `assets/js/main.js` |
| Google Forms + Drive spreadsheet | Vendor/volunteer/etc. applications | _Whose Google account owns these? Ideally the fair's Workspace account_ |

## Coming Soon page (2026-10-07)

The DNS changes below are being made now so thelauravillefair.org shows the Coming Soon page (repo `LauravilleFair/coming-soon`, custom domain set on that repo).
**On full-site launch day** no DNS changes are needed: remove the custom domain from the `coming-soon` repo's Pages settings, add it to the `lauravillefair.github.io` repo, remove the draft banner + noindex, and tick "Enforce HTTPS".

## DNS settings

**thelauravillefair.org** (GoDaddy → DNS):
- Add four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Change `www` CNAME to `lauravillefair.github.io`.
- **Leave all MX (Google) records alone.**

**lauravillefair.org** (GoDaddy → Forwarding):
- Forward to `https://thelauravillefair.org`, permanent (301), masking **off**.

## Related

- Model site: BaltimoreSoundGuy.com — GitHub Pages, repo `jaronervin/baltimore-sound-guy-site`.
