locals {
  domain = "${var.app_name}.com."
}

data "aws_route53_zone" "selected" {
  name         = local.domain
  private_zone = false
}
