output "zone_id" {
  description = "Zone id of the Route53 zone"
  value       = data.aws_route53_zone.selected.zone_id
}

output "zone_arn" {
  description = "Zone arn of the Route53 zone"
  value       = data.aws_route53_zone.selected.arn
}
