FROM node:12

# Install app dependencies
COPY package*.json /app/client/

# Create app directory
WORKDIR /app/client

RUN npm install 

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 3000

CMD ["npm", "start"]
