variable "app_name" {
  default     = "fia7"
  description = "The name of the application for which the Route 53 zone is being created."
  type        = string
}

variable "app_version" {
  default     = ""
  description = "Version of the application"
  type        = string
}

variable "aws_account_id" {
  default     = ""
  description = "AWS Account ID"
  type        = string
}

variable "aws_region" {
  default     = "us-west-2"
  description = "AWS region"
  type        = string
}

variable "environment" {
  default     = "dev"
  description = "The environment for which the Route 53 zone is being created (e.g., dev, staging, prod)."
  type        = string
}
