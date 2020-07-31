# base image - the actual software
FROM node:alpine

# neccessary due to some create-react-app bug
ENV CI=true

# make a folder inside the container named app, this will be the folder with eveyrthing in it
WORKDIR /app
# copy package.json to app
COPY package.json ./
# run npm install
RUN npm install
# copy all the rest of the files from this folder (./) to the container (./)
COPY ./ ./
# run npm start when everything is ready
CMD ["npm", "start"]



