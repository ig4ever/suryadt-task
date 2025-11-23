# Project Setup Guide

## Prerequisites

- Docker and WSL (for Windows)
- Node.js
- Yarn

## Backend Setup

```bash
cd backend
npm install
```

### For Development
```bash
npm run docker:dev
```

### For Production
You need SSL certificates. Create `cert` folder in backend directory and generate SSL files:

```bash
mkdir cert
cd cert

# Generate SSL certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key \
  -out certificate.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

Then run:
```bash
npm run docker:prod
```

## Mobile Setup

```bash
cd mobile
yarn install
npm run android
```