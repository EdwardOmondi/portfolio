#!/bin/bash
set -e

echo "Starting deployment process..."
rm -rf .output
rm -rf EdwardOmondi.github.io
npm run build

rm -rf .output/public/.DS_Store
# get commit message
date=$(date +"%Y-%m-%d %H:%M:%S")
#clone the deployment directory
git clone https://github.com/EdwardOmondi/EdwardOmondi.github.io.git

rm -rf EdwardOmondi.github.io/*
mv .output/public/* EdwardOmondi.github.io/
cd EdwardOmondi.github.io
git status
git add .
git commit -m "$date AUTO DEPLOYMENT"
git push origin main
cd ../
rm -rf EdwardOmondi.github.io