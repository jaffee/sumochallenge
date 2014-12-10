#!/usr/bin/env bash

# run the app
cd /vagrant
./bin/www > serverlog.txt 2>&1 &
