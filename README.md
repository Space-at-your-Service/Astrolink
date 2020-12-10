# Astrolink
Julien Corsin SC-MA3@EPFL  
Valentin Vierge SV-MA3@EPFL  
Supervised by Jean-Yves Le Boudec & Alaeddine El-Fawal, LCA2@EPFL  

Welcome to the Astrolink repository !
Astrolink is a multi-tool web application for the [Asclepios mission](asclepios.ch), originally developed as a semester project in Winter 2020

## Structure :

    - backend
        - astrolink : Core django project folder
        - inventory : inventory app
        -  : procedures app
    - vue
        - ?

## Usage

    All commands assume you have a shell in the main repository folder

### Backend

    `cd backend`
    `conda activate astrolink`
    `python manage.py runserver`

### Frontend

    `cd vue`
    `npm run serve`

## Dependencies

### Backend

    The exact conda environment used to run the backend can be found in the file conda.txt at the root of the repository

### Frontend

    npm run install should handle all the dependencies ?