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
        - to be completed

## Usage

All commands assume the main repository folder as initial working directory

### Backend

Run a development server :

```bash
cd backend
conda activate astrolink
python manage.py runserver
```

### Frontend

```bash
cd vue
npm run serve
```

## Dependencies

### Backend

The exact conda environment used to run the django backend can be found in the file backend/conda.txt

### Frontend

npm run install should handle all the dependencies
