## Site Stats
This project creates a chrome extension that allows users to view page metrics of the current page that they are on. 

The widget appears as a side-panel in the browser

See the image below

![alt text](/project-demo.png)



## Tech Setup
The `backend` folder contains all the FastAPI backend code that implements API endpoints for the application

The `frontend` contains a React viteJS setup that puts a `chrome-extension` and `website` in the project. The idea here is to allow the developers build the chrome extension and their website in the same project. This can make the development easy

You can also run the entire application using Docker.

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

1. Start the entire application using the following command:
```bash
docker-compose up --build
```

2. In another terminal copy the `dist` folder to `frontend/dist` using 

```bash
docker cp $(docker-compose ps -q frontend):/app/dist ./frontend
```

## Install Plugin
Whichever option you chose in the previous step, you would have a `frontend/dist` folder generated in your project  and your backend server would be running 

To install the plugin take the following steps:
1. Open Google Chrome
2. Open any web page(eg https://www.uhcprovider.com/)
3. Click on the elipsis on the top right 
4. Click on Extensions > Manage Extension > Load Extension
5. Select the dist folder

Now you should be able to see the side-panel

## Notes on Testing

You can test the backend API by running:

```bash
pipenv run test
```