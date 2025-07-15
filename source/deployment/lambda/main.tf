locals {
  types = toset(["coach", "player", "school", "university"])
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_cloudwatch_log_group" "cloudwatch" {
  for_each          = local.types
  name              = "/aws/lambda/${var.environment}-${var.app_name}-${each.key}"
  retention_in_days = 1
}

resource "aws_iam_role" "role" {
  for_each           = local.types
  name               = "${var.environment}-${var.app_name}-${each.key}"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy" "team" {
  for_each   = local.types
  depends_on = [aws_cloudwatch_log_group.cloudwatch]
  name       = "${var.environment}-${var.app_name}-${each.key}"
  role       = aws_iam_role.role[each.key].name
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:PutItem",
          "dynamodb:Scan"
        ]
        Resource = "arn:aws:dynamodb:${var.aws_region}:${var.aws_account_id}:table/${var.environment}-${var.app_name}-${each.key}"
      },
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "${aws_cloudwatch_log_group.cloudwatch[each.key].arn}:*"
      }
    ]
  })
}

resource "aws_lambda_function" "lambda" {
  for_each      = local.types
  depends_on    = [aws_cloudwatch_log_group.cloudwatch]
  architectures = ["x86_64"]
  environment {
    variables = {
      APP_NAME    = var.app_name
      ENVIRONMENT = var.environment
    }
  }
  logging_config {
    log_format            = "JSON"
    application_log_level = "INFO"
    system_log_level      = "WARN"
  }
  function_name = "${var.environment}-${var.app_name}-${each.key}"
  role          = aws_iam_role.role[each.key].arn
  package_type  = "Image"
  image_config {
    command = ["${each.key}.handler"]
  }
  image_uri   = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.environment}-${var.app_name}-${each.key}:${var.app_version}"
  memory_size = 512
  timeout     = 30
}
