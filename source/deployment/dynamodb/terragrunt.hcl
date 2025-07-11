dependency "lambda" {
  config_path = "../lambda"
  mock_outputs = {
    lambda_arn = "tmp_lambda_arn"
  }
}

locals {
  app_name       = get_env("APP_NAME", "fia7")
  app_version    = get_env("APP_VERSION", "0.0")
  aws_account_id = get_env("AWS_ACCOUNT_ID", "")
  aws_region     = get_env("AWS_REGION", "us-west-2")
  backend_bucket = get_env("TF_BUCKET")
  common_tags = {
    "Owner" = "gzabarte"
  }
  environment = get_env("ENVIRONMENT", "dev")
}

inputs = {
  app_name       = local.app_name
  app_version    = local.app_version
  aws_account_id = local.aws_account_id
  aws_region     = local.aws_region
  environment    = local.environment
  lambda_arn     = dependency.lambda.outputs.lambda_arn
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }
  config = {
    bucket              = local.backend_bucket
    encrypt             = true
    key                 = "${local.app_name}/${local.environment}/dynamo/terraform.tfstate"
    region              = local.aws_region
    s3_bucket_tags      = merge(local.common_tags, { "Role" = "${local.app_name}/tfstate" })
  }
}

generate "provider" {
  path = "providers.tf"
  if_exists = "overwrite_terragrunt"
  contents = <<EOF
    data "aws_caller_identity" "main" {}
    provider "aws" {
      region = "${local.aws_region}"
    }
    terraform {
      required_version = ">= 1.0.0"
      required_providers {
        aws = {
          source  = "hashicorp/aws"
          version = ">= 3.44"
        }
      }
    }
    EOF
}

terraform {
  source = "${get_terragrunt_dir()}"
}