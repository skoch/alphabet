#!/bin/bash

# EC2 DEPLOYMENT SCRIPT
# Purpose: automate the upload/deployment flow for HCS projects
# Uses `.deployList` as a rules file for what files/folders to include/exclude

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
echo -e "\n-------------------------------"
echo -e "---- ${PURPLE}HCS DEPLOYMENT SCRIPT${RESET} ----"
echo -e "-------------------------------"

# Variable: default destination dir
destination_dir="home/ubuntu/www"


if ssh -i $pemfile $destination_host "test -d /${destination_dir}"; then
    echo -e "${YELLOW}/${destination_dir}${RESET} exists. Contents will be overwritten. \n"
else
    echo -e "${YELLOW}/${destination_dir}${RESET} does NOT exist on the remote, and will be created. \n"
fi

# Prompts the user for a "test mode" dry run. Yes / No mode, sets the flag to be used later in the rsync command
while [[ ! "$yesno" =~ [YyNn] ]]; do
    read -p "${TEAL}Do you want to do a dry-run? (aka test-mode)${RESET} [y/n] " yesno
    case $yesno in
        [Yy]* )
            is_dry_run=true
            dry_run="--list-only -n"
            dry_run_text="${GREEN}as a dry run${RESET}"
            ;;
        [Nn]* )
            is_dry_run=false
            dry_run=""
            dry_run_text="${RED}in live mode${RESET} (non-dry-run)"
            ;;
    esac
done

# Verify that we want to proceed
while [[ ! "$continue" =~ [YyNn] ]]; do
    echo -e "\nUploading to ${YELLOW}/$destination_dir${RESET} $dry_run_text."
    read -p "Continue? [y/n] " continue
    case $continue in
        [Yy]* )
            continue
            ;;
        [Nn]* )
            echo "${RED}Aborting...${RESET}\n"
            exit 1
            ;;
    esac
done

if [[ "$is_dry_run" = false ]]; then
    # Prompt user to update `node_modules` or not
    while [[ ! "$update_node" =~ [YyNn] ]]; do
        read -p "${TEAL}Do you want to update node_modules? (npm i --production)${RESET} [y/n] " update_node
        case $update_node in
            [Yy]* )
                update_node_modules=true
                ;;
            [Nn]* )
                update_node_modules=false
                ;;
        esac
    done
fi

echo -e "\n---- ${PURPLE}Building Files... hang tight${RESET} ----\n"
# Prep the build
npm run production:all

echo -e "\n---- ${PURPLE}Beginning transfer${RESET} ----\n"
# Transfer the files
rsync -rhP --include-from=.deployList $dry_run -e "ssh -i ${pemfile}" . $destination_host:/$destination_dir

## RSYNC options:
# -r = Recursive
# -n = Dry run
# -v = Verbose
# -vv = Double Verbose (displays rules for what is/isn't transferred)
# -h = Human readable numbers for data transfers
# -P = Progress
# --delete = Duh.
# -e = Environment classification (e.g. SSH)
# --list-only = only list the files, don't transfer (explicit path checking)

# Update node modules if requested
if [ "$update_node_modules" = true ]; then
    echo -e "\n---- ${PURPLE}Updating node_modules... hang tight${RESET} ----\n"
    ssh -i $pemfile $destination_host "cd www && npm i --production"
fi

#### END ####

echo -e "\n-------------------"
echo -e "---- ${PURPLE}All Done!${RESET} ----"
echo -e "-------------------\n"
