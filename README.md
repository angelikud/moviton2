# MovitOn Presale Landing Page

## 🚀 Quick Start

### GitHub Pages (recommended)
1. Create repo on GitHub: `moviton-sales`
2. Upload this entire folder
3. Go to **Settings → Pages → Source: main branch**
4. Site live at: `https://YOUR-USERNAME.github.io/moviton-sales/`

### Local preview
Just open `index.html` in any browser. No server needed.

---

## ✏️ Quick Edit Guide

### Change token price
Open `index.html`, search for `$0.032` and replace all occurrences.

### Change TGE date
Open `js/main.js`, line 11:
```js
const tgeDate = new Date('2026-03-15T12:00:00Z').getTime();
```

### Change raised amount
Open `index.html`, search for `$2,847,312` and update.  
Open `js/main.js`, line 12:
```js
const raisedPercent = 57;  // progress bar fill %
```

### Change colors
Open `css/style.css`, edit variables at the top:
```css
--g: #F0C24A;   /* Primary gold */
--gn: #96FF99;  /* Green accent */
--r: #FF5E5E;   /* Red accent */
--d1: #0D1B26;  /* Dark background */
```

### Add/replace team member
1. Add photo to `assets/team/newname.jpg` (300x300px recommended)
2. In `index.html` find the team section, copy a card block and update name/role/image path

### Add new media logo
1. Add image to `assets/media/newsite.png`
2. In `index.html` add `<img>` in the marquee section and a card in Featured In section

### Change FAQ
In `index.html`, find the FAQ section. Each question is a `<div class="fqi">` block.

---

## 📁 File Structure

```
moviton-sales/
├── index.html              ← Main page (edit content here)
├── css/
│   └── style.css           ← All styles (edit colors/fonts here)
├── js/
│   └── main.js             ← Logic (edit TGE date/counters here)
├── assets/
│   ├── logo.svg            ← MovitOn logo (dark)
│   ├── logo-light.svg      ← MovitOn logo (light)
│   ├── logo-box.png        ← Box icon
│   ├── certik.png          ← CertiK audit badge (transparent PNG!)
│   ├── earth.png           ← Globe background
│   ├── phone.png           ← App mockup
│   ├── chart.png           ← Tokenomics chart
│   ├── team/               ← Team photos
│   │   ├── erik.jpg
│   │   ├── vadim.jpg
│   │   ├── marco.jpg
│   │   ├── kristina.jpg
│   │   ├── matteo.jpg
│   │   └── eugene.jpg
│   ├── shipping/           ← Problem section images
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── 4.jpg
│   ├── media/              ← Press logos
│   │   ├── forbes.png
│   │   ├── ibtimes.png
│   │   ├── coinpaper.png
│   │   ├── coinpedia.png
│   │   ├── blockchainreporter.png
│   │   ├── cryptodaily.png
│   │   └── coingabbar.png
│   └── payments/           ← Payment method icons
│       ├── usdt.png
│       ├── usdc.png
│       ├── btc.png
│       ├── eth.png
│       ├── sol.png
│       ├── mastercard.png
│       └── visa.png
└── README.md
```

## 🔗 External links (update if needed)
- Presale: `https://account.moviton.com/user/contribute`
- Whitepaper: `https://moviton.gitbook.io/wp`
- Tokenomics PDF: `https://www.moviton.com/files/MVON-Tokenomics-2.0.pdf`
- Telegram: `https://t.me/moviton_logistics`
- X/Twitter: `https://x.com/MovitOn_P2P`
- Instagram: `https://www.instagram.com/moviton_p2p/`
