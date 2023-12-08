# Per crear una imatge: 
# amb l'aplicació de node amb WS a dins (i amb l'entorn de nodejs)
# Exposa el port 8080

# Per crear la imatge: docker build -t server_ws . 
# Per executar el contenidor: docker run -p 8080:8080 -d server_ws
# Per veure els logs: docker logs <container_id>
# O directament executar-lo en mode interactiu (-it enlloc de  -d)) : 
# docker run -it -p 8080:8080 server_ws

FROM node:19-bullseye-slim


# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY package*.json .


# Install app dependencies
RUN npm install

COPY * .

#expose port 8080 to the outside world
EXPOSE 8080

# Run the app when the container launches
CMD ["node", "server.js"]

