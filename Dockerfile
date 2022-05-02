# Base image used 
FROM node:alpine 

WORKDIR /usr/app

COPY ./ ./

# Installing project dependencies
RUN npm install

# seed Data...

# Running default command 
CMD ["node", "ace" , "serve", "--watch"]
