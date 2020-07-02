# FROM node
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8080
# CMD [ "node", "app.js" ]

FROM node:carbon                  
COPY . /node-project             
WORKDIR /node-project             
RUN npm install pm2 -g            
RUN npm install                   
EXPOSE 3001                       
CMD ["pm2-runtime", "./app.js"]   