# Lauraville Fair Website — Resources & To-Dos

Everything the website depends on, who controls it, and what's still open.
**No passwords in this file** — keep those in a password manager.

_Last updated: 2026-10-07_

## Open to-dos

- [ ] **Transfer GoDaddy account ownership** to Jaron (or a fair email Jaron controls). Current owner is out of the country for a few days — follow up when she's back. Alternative if a full transfer is a hassle: she adds Jaron via GoDaddy **Delegate Access**.
- [x] **Create GitHub organization** — done 2026-10-07: `LauravilleFair` (Jaron is owner/admin).
- [ ] Create the website repository inside that organization and turn on GitHub Pages.
- [ ] Write site specs (pages, content, look).
- [ ] **Launch day:** point thelauravillefair.org at GitHub (see DNS section below).
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
