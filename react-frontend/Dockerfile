FROM node:12
# Create app directory
WORKDIR /app/client/
# Install app dependencies
COPY package.json /app/client/

RUN npm install 
# Copy app source code
COPY . /app/client/

#Expose port and start application
# EXPOSE 3000
CMD ["npm", "start"]
