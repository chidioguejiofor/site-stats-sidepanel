# Step 1: Use Node to build
FROM node:20 AS builder

WORKDIR /app

# Step 2: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 3: Copy all source code
COPY . .

# Step 4: Pass VITE env variables if needed
ARG REACT_APP_SITE_STATS_API_HOST
ENV REACT_APP_SITE_STATS_API_HOST=$REACT_APP_SITE_STATS_API_HOST
ENV VITE_SITE_STATS_API_HOST=$REACT_APP_SITE_STATS_API_HOST


# Step 5: Build the app
RUN npm run build

EXPOSE 5173
