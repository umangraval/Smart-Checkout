FROM node:12

# Add package file
COPY package*.json /app/server/

WORKDIR /app/server

# Install deps
RUN npm install -g typescript nodemon
RUN npm i

# Copy source
COPY . .

# Build dist
RUN npm run build

# Expose port 8000
EXPOSE 8080

CMD npm run start