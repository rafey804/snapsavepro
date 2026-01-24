#!/bin/bash

# Kill any process using port 3003
fuser -k 3003/tcp 2>/dev/null || true
pkill -f "next-server.*3003" 2>/dev/null || true

# Wait for port to be released
sleep 2

# Start Next.js
npm start