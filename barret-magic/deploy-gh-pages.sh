#!/bin/bash

# Script to deploy Angular app to GitHub Pages
# Usage: ./deploy-gh-pages.sh

set -e  # Exit on error

echo "🚀 Starting GitHub Pages deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not a git repository${NC}"
    exit 1
fi

# Check if there are uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes. They will be stashed.${NC}"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    git stash
    STASHED=true
else
    STASHED=false
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${GREEN}📦 Current branch: $CURRENT_BRANCH${NC}"

# Build the Angular app
echo -e "${GREEN}🔨 Building Angular app...${NC}"
npm run build -- --configuration production

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Error: Build failed or dist folder not found${NC}"
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    exit 1
fi

# Find the output directory (Angular 17+ uses dist/<project-name>/browser)
# Check common locations
if [ -d "dist/barret-magic/browser" ]; then
    BUILD_DIR="dist/barret-magic/browser"
elif [ -d "dist/barret-magic" ]; then
    BUILD_DIR="dist/barret-magic"
elif [ -d "dist/browser" ]; then
    BUILD_DIR="dist/browser"
else
    BUILD_DIR="dist"
fi

echo -e "${GREEN}📁 Build output found in: $BUILD_DIR${NC}"

# Verify the build directory exists and has index.html
if [ ! -f "$BUILD_DIR/index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found in $BUILD_DIR${NC}"
    echo -e "${YELLOW}Available directories in dist:${NC}"
    find dist -type d -maxdepth 3 | head -10
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    exit 1
fi

# Checkout or create gh-pages branch
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo -e "${GREEN}📂 Switching to existing gh-pages branch...${NC}"
    git checkout gh-pages
else
    echo -e "${GREEN}📂 Creating new gh-pages branch...${NC}"
    git checkout --orphan gh-pages
    # Remove all files from staging
    git rm -rf --cached . 2>/dev/null || true
fi

# Remove all existing files except .git
echo -e "${GREEN}🧹 Cleaning gh-pages branch...${NC}"
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'dist' -exec rm -rf {} +

# Copy build files to root
echo -e "${GREEN}📋 Copying build files to root...${NC}"
cp -r "$BUILD_DIR"/* ../
cp -r "$BUILD_DIR"/.* ../ 2>/dev/null || true

# Remove dist folder
rm -rf dist

# Add all files
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    # Make a commit
    echo -e "${GREEN}💾 Committing changes...${NC}"
    git commit -m "Deploy to GitHub Pages - $(date +'%Y-%m-%d %H:%M:%S')" --allow-empty
    
    # Force push to gh-pages branch
    echo -e "${GREEN}🚀 Force pushing to gh-pages branch...${NC}"
    git push origin gh-pages --force
    
    echo -e "${GREEN}✅ Successfully deployed to GitHub Pages!${NC}"
fi

# Switch back to original branch
echo -e "${GREEN}🔄 Switching back to $CURRENT_BRANCH branch...${NC}"
git checkout "$CURRENT_BRANCH"

# Restore stashed changes if any
if [ "$STASHED" = true ]; then
    echo -e "${GREEN}📦 Restoring stashed changes...${NC}"
    git stash pop
fi

echo -e "${GREEN}✨ Deployment complete!${NC}"
echo -e "${YELLOW}💡 Your site should be available at: https://<username>.github.io/<repository>/${NC}"

