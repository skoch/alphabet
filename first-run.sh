#!/bin/bash

# EC2 SERVER SCRIPT
# Purpose: install forever globally and start server

# Colors
RED=$'\E[31m'
GREEN=$'\E[32m'
YELLOW=$'\E[33m'
BLUE=$'\E[34m'
PURPLE=$'\E[35m'
TEAL=$'\E[36m'
RESET=$'\E[0m'

# Fail if configuration is not defined
if [ ! -f ./config/config-deploy.sh ]; then
    echo -e "${RED}ERROR: /config/config-deploy.sh not configured. ${RESET}\nPlease copy and edit ${YELLOW}/config/config-deploy_example.sh${RESET} before continuing.\nAborting...${RESET}\n"
    exit 1
fi

# import our setup variables from the config file
source ./config/config-deploy.sh

#### BEGIN ####
echo -e "\n---- ${PURPLE}Installing forever and starting server${RESET} ----\n"

# install forever globally and start the server, forever
ssh -i $pemfile $destination_host "npm i forever -g && NODE_ENV=production forever start www/config/forever.json"
