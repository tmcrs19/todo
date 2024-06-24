#!/bin/bash

# Specify the Node.js version
NODE_VERSION="20.14.0"

# Function to install nvm
install_nvm() {
    # Install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    # Source nvm in the current shell session
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
}

# Check if nvm is installed or install it if not
check_or_install_nvm() {
    if ! command -v nvm &> /dev/null; then
        echo "nvm (Node Version Manager) is not installed. Installing nvm..."
        install_nvm
        # Source nvm in the current shell session after installation
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    fi
}

# Check or install nvm
check_or_install_nvm

# Use nvm to install and select the specified Node.js version
nvm install $NODE_VERSION
nvm use $NODE_VERSION || { echo "Failed to use Node.js version $NODE_VERSION"; exit 1; }

# Continue with the rest of the setup
npm install
mkcert -install
mkcert localhost
npm run dev
