FROM node:12

# Add package file
COPY package*.json ./

# Install deps
RUN npm i

# Copy source
COPY . .

# Build dist
RUN npm run build

# Expose port 8000
# EXPOSE 8000

CMD npm run start
