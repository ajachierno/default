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

## 3. Deploy

Because it's static, deployment is copy-the-folder simple. The site lives in the
`roo-management-website/` subfolder of this repo, so set that as the root/publish
directory.

### Render  (render.com) — *`render.yaml` included*
1. **New → Static Site**, connect this GitHub repo.
2. **Root Directory:** `roo-management-website`
3. **Build Command:** *(leave empty)*
4. **Publish Directory:** `.`
5. Create — Render builds a URL like `roo-management-website.onrender.com`.
   (Or commit `render.yaml` and use **New → Blueprint** to configure it
   automatically.)

### Netlify — *`netlify.toml` included*
- Drag-and-drop the `roo-management-website` folder onto app.netlify.com, **or**
  connect the repo and set **Base directory** = `roo-management-website`,
  **Publish directory** = `roo-management-website`.

### Vercel
- Import the repo, set **Root Directory** = `roo-management-website`,
  Framework preset = **Other**. No build command.

### GitHub Pages
- Move the site's contents to the repo root (or a `/docs` folder) and enable
  Pages in **Settings → Pages**. Put your custom domain in a `CNAME` file.

### Cloudflare Pages
- Connect the repo, **Build output directory** = `roo-management-website`,
  no build command.

---

## 4. Connect your custom domain

You have a domain ready — here's the general flow (identical idea on every host):

1. In your host's dashboard, open the site → **Custom domains / Domains** →
   **Add** `roomanagement.com` and `www.roomanagement.com`.
2. At your **domain registrar** (GoDaddy, Namecheap, Google Domains, etc.),
   update DNS with the records your host shows you:
   - **`www`** → a **CNAME** pointing to the host's target
     (e.g. `your-site.onrender.com` or `your-site.netlify.app`).
   - **root/apex** (`@`) → either an **ALIAS/ANAME** to the host target, or the
     **A records** the host lists. (Cloudflare/Netlify/Render support apex; on
     some registrars you instead redirect the apex to `www`.)
3. Let the host issue the free **SSL certificate** (automatic once DNS
   resolves — usually minutes, up to ~24h for DNS to propagate).
4. Set one canonical version (typically force `https://www.…`) and update the
   domain everywhere listed in the checklist above.

> **A note on "hosted on Reddit":** Reddit doesn't host websites, so this can't
> deploy there. The instructions above assume you meant a static host — most
> likely **Render** (render.com), which is why `render.yaml` is included. If you
> meant Netlify, Vercel, GitHub Pages, or Cloudflare Pages, those are covered
> too. Let me know which one and I'll tailor the exact DNS records for your
> registrar and domain.

---

## Accessibility & performance notes
- Semantic landmarks, skip link, focus states, `aria` labels, and reduced-motion
  support are built in.
- Respects `prefers-reduced-motion` (disables counters/reveal animations).
- No external JS/CSS libraries; only Google Fonts is loaded remotely.
- Mobile-first responsive layout with an accessible slide-in menu.
