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

### Notes

- [Download APK](https://drive.google.com/file/d/1A6-0CGJy217xyEl0_fT7hoWoUJ3pPdv5/view)
- [Swagger Docs](https://unsuppositional-humid-cleo.ngrok-free.dev/docs/)

## Project Hierarchy

### Backend

```
backend/
├─ src/
│  ├─ config/
│  │  ├─ constants.ts
│  │  ├─ database.ts
│  │  ├─ env.ts
│  │  ├─ redis.ts
│  │  └─ swagger.ts
│  ├─ controllers/
│  │  ├─ category.controller.ts
│  │  ├─ owner.controller.ts
│  │  └─ pet.controller.ts
│  ├─ middleware/
│  │  ├─ auth.middleware.ts
│  │  ├─ error.middleware.ts
│  │  └─ rateLimit.middleware.ts
│  ├─ models/
│  │  ├─ category.model.ts
│  │  ├─ owner.model.ts
│  │  ├─ pet.model.ts
│  │  └─ user.model.ts
│  ├─ routes/
│  │  ├─ auth.routes.ts
│  │  ├─ category.routes.ts
│  │  ├─ master.routes.ts
│  │  └─ pet.routes.ts
│  ├─ scripts/
│  │  └─ seed.ts
│  ├─ services/
│  │  ├─ cache.service.ts
│  │  ├─ category.service.ts
│  │  ├─ owner.service.ts
│  │  └─ pet.service.ts
│  ├─ utils/
│  │  ├─ ApiError.ts
│  │  ├─ ApiResponse.ts
│  │  ├─ asyncHandler.ts
│  │  └─ pagination.ts
│  ├─ app.ts
│  ├─ server.ts
│  └─ types.ts
├─ docker-compose.dev.yml
├─ docker-compose.prod.yml
├─ Dockerfile.dev
├─ Dockerfile.prod
├─ nginx.conf
└─ package.json
```

### Mobile

```
mobile/
├─ app/
│  ├─ owners/
│  │  └─ [id].tsx
│  ├─ _layout.tsx
│  └─ index.tsx
├─ assets/
│  ├─ fonts/
│  │  ├─ CircularStd-Book.ttf
│  │  ├─ CircularStd.ttf
│  │  └─ SF-Pro-Semibold.otf
│  └─ icons/
│     ├─ app_icon.png
│     ├─ avatar-bg.png
│     ├─ back.png
│     ├─ chevron-right.png
│     ├─ dropdown.png
│     ├─ index.ts
│     ├─ star-outline.png
│     └─ star.png
├─ components/
│  ├─ atoms/
│  │  └─ Text.tsx
│  └─ molecules/
│     ├─ MasterCard.tsx
│     ├─ OwnerCard.tsx
│     └─ PetCard.tsx
├─ constants/
│  ├─ Colors.ts
│  └─ Config.ts
├─ devtools/
│  └─ reactotron.js
├─ hooks/
│  ├─ useApi.ts
│  └─ useAuth.ts
├─ services/
│  ├─ api.service.ts
│  ├─ auth.service.ts
│  ├─ owner.service.tsx
│  ├─ pet.service.ts
│  ├─ storage.service.ts
│  └─ token.service.ts
├─ store/
│  └─ favorites.ts
├─ types/
│  ├─ api.types.ts
│  └─ global.types.ts
├─ utils/
│  ├─ helpers.ts
│  └─ owners.ts
├─ app.json
└─ package.json
```
