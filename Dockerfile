FROM lscr.io/linuxserver/chromium:latest

# Basic system tools aur Node.js install karna
RUN apk add --no-cache nodejs npm curl

# Working directory setup
WORKDIR /app

# Cache folder configuration for browser stability
ENV TITLE=Secure-Automation-Suite
ENV DISPLAY=:1
ENV SCREEN_RESOLUTION=1280x720
ENV HOME=/ubuntu

# Custom Node.js Auth Gateway files copy aur install karna
COPY package.json index.js ./
RUN npm install

# Ports expose karna (3000 par humara premium login chalega)
EXPOSE 3000

# Startup script overrides: pehle system core start hoga fir hamara proxy dashboard
CMD ["sh", "-c", "/init & node index.js"]
