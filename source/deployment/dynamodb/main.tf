module "player" {
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = "${var.environment}-${var.app_name}-player"
  hash_key  = "Team"
  range_key = "Points"

  attributes = [
    {
      name = "Team"
      type = "S"
    },
    {
      name = "Points"
      type = "N"
    }
  ]
}

module "team" {
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = "${var.environment}-${var.app_name}-team"
  hash_key  = "Name"
  range_key = "Age"

  attributes = [
    {
      name = "Name"
      type = "S"
    },
    {
      name = "Age"
      type = "N"
    }
  ]
}
