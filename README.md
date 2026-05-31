# Mahadi Hassan Portfolio

A static portfolio website ready for GitHub Pages.

## Files

- `index.html` - page content and SEO tags
- `style.css` - full responsive design
- `script.js` - section switching and icon setup
- `assets/profile.jpg` - profile image
- `assets/mahadi-hassan-cv.pdf` - downloadable CV
- `assets/mahadi-modern-cv.jpg` - CV preview image

## GitHub Pages Setup

If using GitHub CLI:

```bash
gh auth login
gh repo create mahadi-portfolio --public --source=. --remote=origin --push
gh api repos/:owner/mahadi-portfolio/pages -X POST -f source.branch=main -f source.path=/
```

If using GitHub website:

1. Create a GitHub repository named `mahadi-portfolio`.
2. Upload all files from this folder.
3. Go to repository `Settings`.
4. Open `Pages`.
5. Select `Deploy from a branch`.
6. Choose `main` and `/root`.
7. Save.

Your website will be live at:

```text
https://YOUR-GITHUB-USERNAME.github.io/mahadi-portfolio/
```
