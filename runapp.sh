#!/usr/bin/env bash

# run the app
cd /vagrant
nodemon -L ./bin/www > serverlog.txt 2>&1 &
