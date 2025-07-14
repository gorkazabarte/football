module "coach" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-coach"
  hash_key = "Name"
  attributes = [
    {
      name = "Name"
      type = "S"
    }
  ]
}

module "country" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-country"
  hash_key = "Name"
  attributes = [
    {
      name = "Name"
      type = "S"
    }
  ]
}

module "team" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-team"
  hash_key = "Team"
  attributes = [
    {
      name = "Team"
      type = "S"
    }
  ]
}

module "player" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-player"
  hash_key = "Name"
  attributes = [
    {
      name = "Name"
      type = "S"
    }
  ]
}
