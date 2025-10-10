# Deployment Instructions for VPS Hostinger

## Current Setup
- **Backend Port**: 908044
- **Frontend Port**: 908261
- **Domain**: snapsavepro.com

## Steps to Fix Instagram Authentication Error

### 1. Update Backend on VPS

Upload these files to your VPS backend folder:
- `backend/instagram.py` (updated with cookie authentication)
- `backend/youtube.py` (updated with cookie authentication)
- `backend/requirements.txt` (updated with cookie dependencies)

Then restart your backend:
```bash
# SSH into your VPS
cd /path/to/snapsavepro-backend
source venv/bin/activate  # or activate your virtual environment
pip install -r requirements.txt
# Restart your backend service (PM2, systemd, or whatever you're using)
pm2 restart snapsavepro-backend
# OR
systemctl restart snapsavepro-backend
```

### 2. Update Frontend Environment Variable

You have TWO options:

#### Option A: Use Reverse Proxy (Recommended - More Secure)

Set up Nginx/Apache to proxy `/api` to your backend port 908044:

**Nginx Configuration Example:**
```nginx
location /api {
    proxy_pass http://localhost:908044/api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Then use this in your frontend `.env.production`:
```
NEXT_PUBLIC_API_URL=https://snapsavepro.com/api
```

#### Option B: Direct Port Access (Easier but Less Secure)

In your frontend `.env.production`:
```
NEXT_PUBLIC_API_URL=https://snapsavepro.com:908044/api
```

Note: You'll need to ensure port 908044 is open in your firewall and SSL is configured for that port.

### 3. Rebuild and Redeploy Frontend

After updating `.env.production`:

```bash
cd /path/to/snapsavepro-frontend
npm run build
# Restart your frontend service
pm2 restart snapsavepro-frontend
# OR
systemctl restart snapsavepro-frontend
```

### 4. Install Instagram Cookies on VPS (Important!)

For cookie authentication to work on your VPS:

```bash
# SSH into your VPS
# Install a browser (if not already installed)
sudo apt-get update
sudo apt-get install chromium-browser -y

# You have two options:

# Option 1: Use VNC to access your VPS GUI and login to Instagram in Chrome

# Option 2: Copy cookies from your local machine
# On your local machine (where you're logged into Instagram):
# 1. Login to Instagram in Chrome
# 2. Export cookies using a Chrome extension or manually
# 3. Upload cookies to your VPS

# Option 3: Disable cookie requirement (less reliable)
# In backend/.env, you can try without cookies first:
USE_COOKIES_FROM_BROWSER=False
```

### 5. Verify Everything Works

Test your API:
```bash
# Test from your VPS
curl http://localhost:908044/api/health

# Test from outside
curl https://snapsavepro.com:908044/api/health
# OR if using reverse proxy:
curl https://snapsavepro.com/api/health
```

### 6. Check Backend Logs

Monitor your backend for errors:
```bash
pm2 logs snapsavepro-backend
# OR
journalctl -u snapsavepro-backend -f
```

## Quick Summary

**Files to upload to VPS:**
1. `backend/instagram.py`
2. `backend/youtube.py`
3. `backend/requirements.txt`
4. `frontend/.env.production` (after configuring correct API URL)

**Commands to run on VPS:**
```bash
# Backend
cd backend
pip install -r requirements.txt
pm2 restart snapsavepro-backend

# Frontend
cd frontend
npm run build
pm2 restart snapsavepro-frontend
```

## Troubleshooting

If you still get "Instagram requires authentication":
1. Make sure backend is running: `pm2 status`
2. Check backend logs: `pm2 logs snapsavepro-backend`
3. Verify CORS is allowing your domain in `backend/.env`
4. Test API directly: `curl https://snapsavepro.com/api/health`
5. Check if Instagram cookies are accessible on VPS
