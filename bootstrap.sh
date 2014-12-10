#!/usr/bin/env bash

# mysql
apt-get update
# mysql gives an interactive prompt to set root pw
# the following line disables that behavior, and leaves the root pw blank
# use 'mysqladmin -u root password mysecretpasswordgoeshere' to set the pw later
# credit goes to Mez: https://stackoverflow.com/questions/7739645/install-mysql-on-ubuntu-without-password-prompt
export DEBIAN_FRONTEND=noninteractive
apt-get -q -y install mysql-server

# nodejs
apt-get install -y python-software-properties python g++ make
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs


# install app
cd /vagrant
npm install
