variable "app_name" {
  default     = "fia7"
  description = "The name of the application for which the Route 53 zone is being created."
  type        = string
}

variable "aws_iam_role" {
  default     = ""
  description = "The name of the IAM role with access to ECR."
  type        = string
}

variable "environment" {
  default     = "dev"
  description = "The environment for which the Route 53 zone is being created (e.g., dev, staging, prod)."
  type        = string
}
