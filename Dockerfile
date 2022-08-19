# docker run -p 3000:3000 -d phazzzy/phonebook-app-rest-api
FROM node:lts-alpine
ENV NODE_ENV=production
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
# Bundle app source
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
