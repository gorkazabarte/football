locals {
  domain = var.environment == "prd" ? "${var.app_name}.com" : "${var.environment}.${var.app_name}.com"
}

data "aws_cloudfront_cache_policy" "caching_optimized" {
  name = "Managed-CachingOptimized"
}

module "cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "3.3.0"

  aliases                      = [local.domain, "www.${local.domain}"]
  comment                      = var.app_name
  create_origin_access_control = true
  default_root_object          = "index.html"
  enabled                      = true
  is_ipv6_enabled              = true
  price_class                  = "PriceClass_100"
  retain_on_delete             = false
  wait_for_deployment          = false

  default_cache_behavior = {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id
    compress               = true
    query_string           = true
    target_origin_id       = "${var.environment}-${var.app_name}-frontend"
    viewer_protocol_policy = "allow-all"
    use_forwarded_values   = false
  }

  origin_access_control = {
    "${var.environment}-${var.app_name}-frontend" = {
      description      = "OAC for S3 Origin"
      signing_behavior = "always"
      signing_protocol = "sigv4"
      origin_type      = "s3"
    }
  }

  origin = {
    "${var.environment}-${var.app_name}-frontend" = {
      domain_name           = "${var.environment}-${var.app_name}-frontend.s3.${var.aws_region}.amazonaws.com"
      origin_access_control = "${var.environment}-${var.app_name}-frontend"
      s3_origin_config      = {}
    }
  }

  ordered_cache_behavior = [
    {
      allowed_methods        = ["GET", "HEAD"]
      cached_methods         = ["GET", "HEAD"]
      cache_policy_id        = data.aws_cloudfront_cache_policy.caching_optimized.id
      compress               = true
      query_string           = true
      path_pattern           = "*"
      target_origin_id       = "${var.environment}-${var.app_name}-frontend"
      viewer_protocol_policy = "allow-all"
      use_forwarded_values   = false
    }
  ]

  viewer_certificate = {
    acm_certificate_arn = var.acm_arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "record_1" {
  depends_on = [module.cloudfront]
  zone_id    = var.zone_id
  name       = local.domain
  type       = "A"
  alias {
    name                   = module.cloudfront.cloudfront_distribution_domain_name
    zone_id                = module.cloudfront.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "record_2" {
  depends_on = [module.cloudfront]
  zone_id    = var.zone_id
  name       = "www.${local.domain}"
  type       = "A"
  alias {
    name                   = module.cloudfront.cloudfront_distribution_domain_name
    zone_id                = module.cloudfront.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = true
  }
}
