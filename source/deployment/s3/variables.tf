variable "app_name" {
  default     = "fia7"
  description = "The name of the application for which the Route 53 zone is being created."
  type        = string
}

variable "environment" {
  default     = "dev"
  description = "The environment for which the Route 53 zone is being created (e.g., dev, staging, prod)."
  type        = string
}

variable "cloudfront_distribution_arn" {
  description = "The ARNs of the CloudFront distribution"
  type        = string
}
