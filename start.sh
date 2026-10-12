#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "============================================================"
echo "  4SLAYERS — AI Fraud & Scam Detection Platform"
echo "  SCAN → ANALYZE → RISK SCORE → ALERT → RECOMMENDED ACTION"
echo "============================================================"

# Check Python environment
export PYTHONPATH="$DIR"

# Start FastAPI Backend in background
echo "[+] Starting FastAPI backend on http://127.0.0.1:8000..."
python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 &
BACKEND_PID=$!

# Trap signals to cleanly shut down both servers
trap "echo '[!] Shutting down 4SLAYERS...'; kill $BACKEND_PID 2>/dev/null || true; exit" SIGINT SIGTERM EXIT

# Start Vite Frontend
echo "[+] Starting Vite frontend on http://localhost:5173..."
cd "$DIR/frontend"
npm run dev -- --host 0.0.0.0 --port 5173
