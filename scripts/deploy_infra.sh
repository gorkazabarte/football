#!/bin/bash
set -e

echo "[INFO] ${APP_NAME} deployment is starting"
cd ./source/deployment || exit

echo "[INFO] Deploying Route 53 for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ./route53 || exit
terragrunt apply --all --non-interactive -no-color

echo "[INFO] Deploying ACM for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ../acm || exit
terragrunt apply --all --non-interactive -no-color

echo "[INFO] Deploying CloudFront for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ../cloudfront || exit
terragrunt apply --all --non-interactive -no-color

echo "[INFO] Deploying S3 for application: ${APP_NAME} in environment: ${ENVIRONMENT}"
cd ../s3 || exit
terragrunt apply --all --non-interactive -no-color
