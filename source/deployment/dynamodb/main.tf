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

module "school" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-school"
  hash_key = "Name"
  attributes = [
    {
      name = "Name"
      type = "S"
    }
  ]
}

module "university" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name     = "${var.environment}-${var.app_name}-university"
  hash_key = "Name"
  attributes = [
    {
      name = "Name"
      type = "S"
    }
  ]
}
