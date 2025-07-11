resource "aws_s3_bucket" "website_bucket" {
  bucket = "${var.environment}-${var.app_name}-frontend"
}

resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket_public_access" {
  block_public_acls       = false
  block_public_policy     = false
  bucket                  = aws_s3_bucket.website_bucket.id
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"
        Principal : {
          Service : "cloudfront.amazonaws.com"
        }
        Condition : {
          ArnEquals : {
            "AWS:SourceArn" : var.cloudfront_distribution_arn
          }
        }
        Action   = ["s3:GetObject"]
        Resource = "arn:aws:s3:::${aws_s3_bucket.website_bucket.id}/*"
      }
    ]
  })
}
