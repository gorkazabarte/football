#!/bin/bash
set -e

# ----- Create S3 backend for Terraform -----
echo "[INFO] Creating S3 bucket: ${s3_bucket}"
if aws s3api head-bucket --bucket "${s3_bucket}" 2>/dev/null; then
  echo "[INFO] Bucket already exists: ${s3_bucket}"
else
  aws s3api create-bucket \
    --bucket "${s3_bucket}" \
    --region "us-west-2" \
    --create-bucket-configuration LocationConstraint="us-west-2"
  fi
echo "[INFO] Bucket created: ${s3_bucket}"

# ----- Enabling versioning -----
echo "[INFO] Enabling versioning on the bucket"
aws s3api put-bucket-versioning \
  --bucket "${s3_bucket}" \
  --versioning-configuration Status=Enabled

echo "[INFO] Backend ready with bucket: ${s3_bucket}"
