locals {
  domain = "${var.app_name}.com"
}

data "aws_acm_certificate" "issued" {
  domain   = local.domain
  statuses = ["ISSUED"]
}
