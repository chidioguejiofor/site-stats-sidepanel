## Site Stats
This project creates a chrome extension that allows users to view page metrics of the current page that they are on. 

The widget appears as a side-panel in the browser

See the image below

![alt text](/project-demo.png)


## Pre-requisite

The backend project depends on `direnv` to load env variables. 

To run the project you'll need to install direnv [using this link](https://direnv.net/docs/installation.html) 



## How to Run

### Without Docker

Follow these steps to run the backend:
1. Enter the directory using 
```bash
cd backend
```

2. Install pipenv by running 

```bash
pip install pipenv --user
```

3. Activate Pipenv Shell 
```bash 
pipenv shell
```

4. Install deps
```bash
piepnv install 
```

5. Create a `.env` file and set env variables using the `env-example`

6. Load env variables using `direnv` by running 

```bash
direnv allow
```

7. Start the application

```bash
pipenv run dev
```

### With  Docker

The following steps can be used to run the application using docker

1. The `backend/.env.docker` file contains env variables that is used to run the backend in docker.
Update these env variables with the correct values for your local env

> Note that instead of using "localhost", you'll have to use "host.docker.internal"

2. Start the entire application using the following command:
```bash
docker-compose up
```

3. In another terminal copy the `dist` folder to `frontend/dist` using 

```bash
docker cp $(docker-compose ps -q frontend):/app/dist ./frontend
```

## Install Plugin
Whichever option you chose in the previous step, you would have a `frontend/dist` folder generated in your project  and your backend server would be running 

To install the plugin take the following steps:
1. Open Google Chrome
2. Open any web page(eg https://www.uhcprovider.com/)
3. Click on the elipsis on the top right 
4. Click on Extensions > Manage Extension
5. 

