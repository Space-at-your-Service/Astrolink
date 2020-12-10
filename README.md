# Astrolink
Julien Corsin SC-MA3@EPFL  
Valentin Vierge SV-MA3@EPFL  
Supervised by Jean-Yves Le Boudec & Alaeddine El-Fawal, LCA2@EPFL  

Welcome to the Astrolink repository !
Astrolink is a multi-tool web application for the [Asclepios mission](https://asclepios.ch), originally developed as a semester project in Winter 2020

## Structure

    - backend (one folder per django app except otherwise specified)
        - activities
        - asclepios
        - astrolink : django core project folder
        - inventory
        conda.txt : conda environment specification
        manage.py : general-purpose django administration script
    - vue
        - public : the public page where the app is compiled
        - src : core vue project folder
            - assets : static assets (CSS sheets, images, police, etc.)
            - components : reusable Vue components
            - models : reusable classes
            - router : handles client routing between the different views
            - services : data API (collection of REST methods to access the backend)
            - store : single source of truth for data shared accross the app
            - views : pages of the app

## Usage

All commands assume the main repository folder Astrolink as initial working directory.

### Backend

Run a development server :

```bash
cd backend
conda activate astrolink
python manage.py runserver
```

### Frontend

You need to have Node.js installed in order to use the command `npm`. It can be downloaded at https://nodejs.org/fr/download/.

```bash
cd vue
npm run serve
```

## Dependencies

### Backend

The exact conda environment used to run the django backend can be found in the file backend/conda.txt

### Frontend

Run `npm install` to install all the dependencies listed in package.json.
