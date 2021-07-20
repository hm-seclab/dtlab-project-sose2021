# Projektseminar Web App

There are several ways to setup the project. Though choosing the setup with webstorm
and the remote interpreter is highly recommended.
___
## Local setup
Check readme's in backend and frontend folder
___
## Local setup with containers

* Run `docker-compose up -d` in the project root.
* Containers need to be re-build when something changes
___
## Setup with remote interpreter in Webstorm (recommended)

### Prerequisites
Install
* Docker
* Docker-Compose
* Webstorm from Jetbrains

### Setup in Webstorm
* Create a new run configuration and choose node.js
* Specify the `backend` folder as working directory
* Go to https://blog.jetbrains.com/webstorm/2019/03/webstorm-2019-1-eap-7/
* Under "Run and debug Node.js app ..." continue from step 2 and choose `backend` as the service
  
### Startup
* Start backend through webstorm and frontend via `docker-compose up frontend`
* Make database migrations by executing `npm run migrate` in the backend folder
