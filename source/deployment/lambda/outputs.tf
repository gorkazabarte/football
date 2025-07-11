output "lambda_arn" {
  description = "AWS Lambda arn"
  value       = { for name, lambda in aws_lambda_function.lambda : name => lambda.arn }
}