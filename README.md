# Points Calculator - Top Heroes

A modern, web-based points calculator for KvK (Kingdom vs Kingdom) Four Nations game, designed to calculate and track hero points.

## Features

- 🎯 **Multi-Hero Tracking**: Add and manage multiple heroes with individual point values
- 📊 **Real-time Calculations**: Automatic calculation of total points, averages, and top hero
- 🎨 **Modern UI**: Beautiful, responsive design that works on all devices
- ⚡ **Fast & Lightweight**: Pure HTML, CSS, and JavaScript - no dependencies
- 📱 **Mobile Friendly**: Fully responsive design

## GitHub Pages Setup

This project is ready to be hosted on GitHub Pages. Follow these steps:

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `points-calculator` or `kvk-calculator`
3. Make it public (required for free GitHub Pages)

### 2. Upload Your Files

You can upload files using one of these methods:

**Option A: Using GitHub Web Interface**
1. Click "Add file" → "Upload files"
2. Drag and drop all files (index.html, styles.css, script.js, README.md)
3. Commit the changes

**Option B: Using Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

### 4. Custom Domain (Optional)

If you have a custom domain, you can add it in the Pages settings.

## Usage

1. Select a nation from the dropdown
2. Add heroes using the "+ Add Hero" button
3. Enter hero names and their point values
4. The calculator automatically updates:
   - **Total Points**: Sum of all hero points
   - **Average Points**: Average points per hero
   - **Top Hero**: Hero with the highest points

## Customization

You can easily customize the calculator:

- **Nations**: Edit the `<select>` options in `index.html`
- **Styling**: Modify colors and styles in `styles.css`
- **Calculations**: Adjust the calculation logic in `script.js`

## File Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Calculator logic
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use and modify for your needs.

---

Made with ❤️ for KvK players

