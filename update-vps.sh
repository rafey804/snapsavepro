#!/bin/bash

# Update VPS with latest changes
# Usage: ./update-vps.sh

echo "=========================================="
echo "Updating SnapSavePro Backend on VPS"
echo "=========================================="

# Update Backend
echo ""
echo "1. Updating Backend..."
cd backend

# Install/Update dependencies
echo "Installing dependencies..."
pip install pycryptodomex keyring

# Restart backend service
echo "Restarting backend service..."
pm2 restart snapsavepro-backend || systemctl restart snapsavepro-backend

echo "✓ Backend updated!"

# Update Frontend
echo ""
echo "2. Updating Frontend..."
cd ../frontend

# Rebuild frontend
echo "Rebuilding frontend..."
npm run build

# Restart frontend service
echo "Restarting frontend service..."
pm2 restart snapsavepro-frontend || systemctl restart snapsavepro-frontend

echo "✓ Frontend updated!"

# Check status
echo ""
echo "3. Checking services status..."
pm2 status || systemctl status snapsavepro-backend snapsavepro-frontend

echo ""
echo "=========================================="
echo "Update Complete!"
echo "=========================================="
echo ""
echo "Please test your website at: https://snapsavepro.com"
echo "Backend API health check: https://snapsavepro.com/api/health"
echo ""
echo "If you encounter issues:"
echo "- Check backend logs: pm2 logs snapsavepro-backend"
echo "- Check frontend logs: pm2 logs snapsavepro-frontend"
echo "- Verify .env.production has correct API URL"
