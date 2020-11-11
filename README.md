# Docker 101

Docker container for NodeJS + Typescript

## Running the project
Clone the project
```
git@github.com:DooVDe/docker101.git
```

Install all node dependencies 
```
cd docker101 && npm ci
```

Run project
```
docker-compose up --build
```

## Docker commands

Build image
```
docker build -t [dockerhub_username]/[image_name]:[tag] Dockerfile
```

Push image
```
docker push [dockerhub_username]/[image_name]
```

Run image
```
docker run --publish 8080:8080 --detach [tag]
```