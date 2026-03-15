# Deployment Instructions

## GitHub Pages Setup
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Select the `main` branch and `/` (root) folder
4. Your site will be available at `https://yourusername.github.io/index-monitor`

## Vercel Proxy Setup (Recommended for CORS)

To fix CORS issues, deploy a proxy function to Vercel:

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```
   Or use the Vercel web interface: https://vercel.com

3. **Update the proxy URL**:
   - After deployment, Vercel will give you a URL like `https://your-project.vercel.app`
   - Open `config/api.js`
   - Set `VERCEL_PROXY_URL` to `https://your-project.vercel.app/api/proxy`

4. **Push the updated config** to GitHub

The Vercel function (`api/proxy.js`) will handle all API requests and avoid CORS issues.

## Alternative: Use AllOrigins Only

If you don't want to set up Vercel, the app will fall back to AllOrigins proxy, but it may have reliability issues.
