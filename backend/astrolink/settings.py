"""
Django settings for astrolink project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os

from pathlib import Path

try:
    from .private import SECRET_KEY, DATABASES
except ImportError:
    raise Exception("You are missing some secrets !")


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["astrolink.earth"]

#Security settings
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

INSTALLED_APPS = [

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #Imported apps
    "rest_framework", #Enable Django Rest Framework (DRF)
    "rest_framework.authtoken", #Enable DRF's Token generation

    #Custom apps
    "activities",
    "asclepios",
    "inventory",

]

MIDDLEWARE = [

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'astrolink.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'astrolink.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#This replaces the default Django User model (class) by a custom class of ours
AUTH_USER_MODEL = "asclepios.Asclepian"

#This setting ensures that by default any REST request not authenticated via token is rejected
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES" : ("rest_framework.authentication.TokenAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

#This is the logging configuration
LOGGING = {
    "version" : 1,

    "disable_existing_loggers" : False,

    "formatters" : {
        "django" : {
            "()" : "django.utils.log.ServerFormatter",
            "format" : "[{server_time}] {message}",
            "style" : "{",
        },
    },

    "handlers" : {
        "console" : {
            "class" : "logging.StreamHandler",
            "formatter" : "django",
        },
        "file" : {
            #This logger will overwrite itself every 2000 bytes so we don't clutter our limited cloud space
            "class" : "logging.handlers.RotatingFileHandler",
            "encoding" : "utf-8",
            "filename" : BASE_DIR / "logs/django.log",
            "maxBytes" : 2000,
            "backupCount" : 1, 
            "formatter" : "django",
        },
    },

    "root" : {
        "handlers" : ["console"],
        "level" : "WARNING",
    },
    "loggers" : {
        "django" : {
            "handlers" : ["console"],
            "level" : os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate" : False,
        },
        "requests": {
            "handlers" : ["file"],
            "level" : "INFO",
            "propagate" : False,
        },
    },
}


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/Zurich"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_URL = "/static/"
MEDIA_ROOT = BASE_DIR / "files"