# Quick Fix Guide - Instagram Authentication Error

## Problem
Instagram shows "requires authentication" error on live website snapsavepro.com

## Solution - 3 Simple Steps

### Step 1: Upload Updated Files to VPS

Upload these 4 files to your VPS Hostinger:

**Backend Files:**
1. `backend/instagram.py` (✓ Updated with cookie auth)
2. `backend/youtube.py` (✓ Updated with cookie auth)
3. `backend/requirements.txt` (✓ Updated with new dependencies)

**Frontend Files:**
4. `frontend/.env.production` (✓ Created with correct API URL)

### Step 2: SSH into VPS and Run Commands

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Navigate to backend
cd /path/to/snapsavepro-backend

# Install new dependencies
pip install pycryptodomex keyring

# Restart backend
pm2 restart snapsavepro-backend

# Navigate to frontend
cd /path/to/snapsavepro-frontend

# Rebuild with new environment variables
npm run build

# Restart frontend
pm2 restart snapsavepro-frontend

# Check if services are running
pm2 status
```

### Step 3: Test Your Website

1. Go to https://snapsavepro.com/pages/instagram-video-download
2. Paste an Instagram URL
3. Click "Get Content"
4. It should work now! ✓

## If Still Not Working

### Option A: Check if backend is accessible

```bash
# From your computer, test if backend API is accessible:
curl https://snapsavepro.com/api/health
```

If you get an error, you need to set up reverse proxy (see DEPLOYMENT_INSTRUCTIONS.md)

### Option B: Use direct port access (temporary solution)

Edit `frontend/.env.production` on your VPS:
```
NEXT_PUBLIC_API_URL=https://snapsavepro.com:908044/api
```

Make sure port 908044 is open in firewall:
```bash
sudo ufw allow 908044
```

Then rebuild frontend:
```bash
cd /path/to/snapsavepro-frontend
npm run build
pm2 restart snapsavepro-frontend
```

## Need Help?

Check backend logs:
```bash
pm2 logs snapsavepro-backend
```

Check frontend logs:
```bash
pm2 logs snapsavepro-frontend
```

## Summary

**What was fixed:**
- ✅ Added Instagram cookie authentication
- ✅ Added YouTube cookie authentication
- ✅ Fixed null safety errors in frontend
- ✅ Added proper error handling
- ✅ Created production environment config

**What you need to do:**
1. Upload 4 files to VPS
2. Run commands to install dependencies and restart services
3. Test your website

That's it! Instagram downloads should work perfectly after this! 🎉
