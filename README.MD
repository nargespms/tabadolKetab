# dev

you should run docker-compose.dev.yml

`docker-compose -f docker-compose.dev.yml up -d`

with this command in directory.
And then execute container with

`docker exec -it tabadol_front /bin/bash`

with this command .

and inside the container run these command :

- apt update
- apt install nodejs
- cd src
- npm run serve

# build

for build you should just run docker-compose.yml
