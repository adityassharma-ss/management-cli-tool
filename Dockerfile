# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install CLI tool dependencies
RUN npm install

# Copy the entire current directory into the container's working directory
COPY . .

# Make your CLI tool executable
RUN chmod +x commands.js

# Specify the default command to run when the container starts
CMD [ "node", "commands.js" ]
