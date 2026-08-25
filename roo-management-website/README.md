# Roo Management Inc. — Website

A fast, modern, fully responsive marketing site for **Roo Management Inc.**, a
Houston, Texas residential property management company. Modeled after leading
property management websites (Green Residential, TexasRenters, PropertyCare,
Superior Property Management), it leads with a **free rental analysis** CTA and
covers services, owner/tenant portals, areas served, pricing, testimonials, and
contact.

It's a **plain static site** — HTML, CSS, and a little vanilla JavaScript. No
build step, no framework, no dependencies. That means it hosts anywhere and
loads instantly.

```
roo-management-website/
├── index.html          # the whole page (all sections)
├── 404.html            # friendly not-found page
├── css/styles.css      # design system + layout
├── js/main.js          # nav, scroll effects, counters, form handling, icons
├── assets/             # SVG logo, favicon, skyline, social image
├── robots.txt          # SEO
├── sitemap.xml         # SEO
├── netlify.toml        # deploy config (Netlify)
└── render.yaml         # deploy config (Render)
```

---

## 1. Run it locally (testing)

The site is static, so any local web server works. Pick one:

**Python (already installed on most machines):**
```bash
cd roo-management-website
python3 -m http.server 8000
# open http://localhost:8000
```

**Node.js:**
```bash
cd roo-management-website
npx serve .          # or: npx http-server -p 8000
```

**VS Code:** install the "Live Server" extension and click *Go Live*.

> Open it through a server (the `http://localhost` URLs above), not by
> double-clicking `index.html`. The inline SVG icons and logo load via
> `fetch`/`<use>`, which browsers block on the `file://` protocol.

---

## 2. Make it real — quick content checklist

Everything below is placeholder content. Search-and-replace these in
`index.html` before going live:

- **Phone** — `(713) 555-0142` / `tel:+17135550142`
- **Email** — `hello@roomanagement.com`
- **Address** — `1200 Smith Street, Suite 1600, Houston, TX 77002`
- **Domain** — `https://www.roomanagement.com/` (in `<link rel="canonical">`,
  the Open Graph tags, structured data, `robots.txt`, and `sitemap.xml`)
- **Stats** — doors managed, years, retention (in the "stats" section)
- **Pricing** — the three plans (or delete the pricing section)
- **Testimonials** — swap in real, permissioned reviews
- **Portal links** — the "Log In" buttons and portal cards point to `#contact`;
  change them to your management software (AppFolio, Buildium, Rentvine, etc.)

**Add real photos** (optional but recommended): the design uses gradients and
SVG art so it looks great with zero photography, but hero/interior shots of
Houston homes will make it shine. Drop images in `assets/` and reference them.

### Wire up the contact form

The forms currently show a demo success message. To actually receive leads,
give each `<form>` a real `action`. Two easy, no-backend options:

- **Formspree** — sign up, then set `action="https://formspree.io/f/XXXX"`
  and `method="post"` on the form. Done.
- **Netlify Forms** — if hosting on Netlify, add `netlify` and a hidden
  `form-name` field to each `<form>`; Netlify captures submissions automatically.

When a real `action` URL is present, `js/main.js` steps aside and lets the
browser submit normally.

---

## 3. Deploy — GitHub Pages (primary)

This repo is set up to publish the site automatically with **GitHub Actions**.
The workflow at [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)
uploads **only** the `roo-management-website/` folder to GitHub Pages, so the
rest of the repository is untouched.

**One-time setup:**
1. On GitHub, go to the repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Merge this branch into the default branch (`master`). The workflow runs on
   every push to `master` that changes `roo-management-website/`.
   *(You can also trigger it manually: **Actions → "Deploy Roo Management
   website" → Run workflow**.)*
4. When it finishes, your site is live. Without a custom domain the URL is
   `https://<your-username>.github.io/default/`; with your custom domain it
   serves at the domain root. All asset paths are **relative**, so both work.

> **Why a workflow and not the simple Pages toggle?** GitHub's built-in Pages
> source can only serve from a repo's **root** or a **`/docs`** folder — not an
> arbitrary subfolder. The Actions workflow lets us keep the site neatly in
> `roo-management-website/` and publish just that folder.

### Alternate hosts (optional)
The same static files also deploy to **Netlify** (`netlify.toml` included),
**Render** (`render.yaml`), **Vercel**, or **Cloudflare Pages** — set the
project's root/publish directory to `roo-management-website`, no build command.

---

## 4. Connect your custom domain (GitHub Pages)

1. **Add a `CNAME` file** to `roo-management-website/` containing just your
   domain, e.g.:
   ```
   www.roomanagement.com
   ```
   (Committing this is the most reliable way to keep the custom domain across
   Actions deploys. Alternatively, set it in **Settings → Pages → Custom
   domain** — GitHub stores it there.)
2. At your **domain registrar** (GoDaddy, Namecheap, Cloudflare, etc.), add DNS:
   - **`www`** → **CNAME** → `<your-username>.github.io`
   - **root/apex** (`@`) → GitHub Pages **A records**:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (and the matching **AAAA** records if you want IPv6:
     `2606:50c0:8000::153` … `:8003::153`).
3. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is
   issued (automatic after DNS resolves — minutes, up to ~24h to propagate).
4. Update the domain in the SEO fields (see the checklist in §2): the
   `<link rel="canonical">` and Open Graph URLs in `index.html`, plus
   `robots.txt` and `sitemap.xml`.

> **Tell me your domain and I'll wire it in for you** — I'll add the `CNAME`
> file and replace every `roomanagement.com` placeholder with your real domain.

---

## Accessibility & performance notes
- Semantic landmarks, skip link, focus states, `aria` labels, and reduced-motion
  support are built in.
- Respects `prefers-reduced-motion` (disables counters/reveal animations).
- No external JS/CSS libraries; only Google Fonts is loaded remotely.
- Mobile-first responsive layout with an accessible slide-in menu.
