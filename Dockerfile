FROM node
WORKDIR /home
COPY . /home/
CMD ["yarn", "run", "start"]
