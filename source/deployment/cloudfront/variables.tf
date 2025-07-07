variable "acm_arn" {
  default     = ""
  description = "The ARN of the ACM certificate"
  type        = string
}

variable "app_name" {
  default     = "fia7"
  description = "The name of the application for which the Route 53 zone is being created."
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

variable "zone_id" {
  default     = ""
  description = "The id of the Route53 Hosted Zone"
  type        = string
}
