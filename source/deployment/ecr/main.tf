locals {
  types = toset(["coach", "player", "school", "university"])
}

module "ecr" {
  for_each = local.types
  source   = "terraform-aws-modules/ecr/aws"

  repository_name = "${var.environment}-${var.app_name}-${each.key}"
  repository_image_tag_mutability   = "MUTABLE"
  repository_read_write_access_arns = [var.aws_iam_role]
  repository_lifecycle_policy = jsonencode({
    rules = [
      {
        rulePriority = 1,
        description  = "Keep last 30 images",
        selection = {
          tagStatus     = "tagged",
          tagPrefixList = ["v"],
          countType     = "imageCountMoreThan",
          countNumber   = 30
        },
        action = {
          type = "expire"
        }
      }
    ]
  })
}
