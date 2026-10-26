FROM lscr.io/linuxserver/chromium:latest

# Ubuntu system packages ko update karna aur Node.js + Python install karna
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    python3-requests \
    nodejs \
    npm \
    && rm -rf /lib/apt/lists/*

# Working directory setup
WORKDIR /app

# Environment variables setup
ENV TITLE=Secure-Automation-Suite
ENV DISPLAY=:1
ENV SCREEN_RESOLUTION=1280x720
ENV HOME=/ubuntu

# Custom Node.js Premium Auth Gateway files copy aur install karna
COPY package.json index.js ./
RUN npm install

# Ports expose karna (3000 par humara premium login chalega)
EXPOSE 3000

# Startup script overrides: pehle system core start hoga fir hamara proxy dashboard
CMD ["sh", "-c", "/init & node index.js"]
