dependency "acm" {
  config_path = "../acm"
  mock_outputs = {
    acm_certificate_arn = "tmp_acm_certificate_arn"
  }
}

dependency "route53" {
  config_path = "../route53"
  mock_outputs = {
    zone_id  = { "tmp_zone_id_key": "tmp_zone_id_value" }
  }
}

locals {
  app_name    = get_env("APP_NAME", "fia7")
  aws_region  = get_env("AWS_REGION", "us-west-2")
  backend_bucket = get_env("TF_BUCKET")
  common_tags = {
    "Owner" = "gzabarte"
  }
  environment = get_env("ENVIRONMENT", "dev")
}

inputs = {
  acm_arn     = dependency.acm.outputs.acm_certificate_arn
  app_name    = local.app_name
  aws_region  = local.aws_region
  environment = local.environment
  zone_id     = dependency.route53.outputs.zone_id
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
    key                 = "${local.app_name}/${local.environment}/cloudfront/terraform.tfstate"
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