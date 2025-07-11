#!/bin/bash
set -e

echo "[INFO] ${APP_NAME} deployment is starting"
cd ./source/deployment || exit

echo "[INFO] Deploying Lambda for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ./lambda || exit
terragrunt apply --all --non-interactive -no-color

echo "[INFO] Deploying DynamoDB for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ../dynamodb || exit
terragrunt apply --all --non-interactive -no-color
