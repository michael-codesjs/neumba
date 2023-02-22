resource "aws_dynamodb_table" "estate_dynamoDb_table" {

  name = "neumba-estate-${var.stage}"

  tags = {
    Name        = "neumba-estate-${var.stage}"
    Description = "neumba table for all estate entities."
    Application = "neumba"
    Service     = "estate-management"
    Stage       = var.stage
  }

  billing_mode   = "PROVISIONED"
  read_capacity  = "1"
  write_capacity = "1"

  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  attribute {
    name = "PK"
    type = "S"
  }

  attribute {
    name = "SK"
    type = "S"
  }

  attribute {
    name = "EntityIndexPK"
    type = "S"
  }

  attribute {
    name = "EntityIndexSK"
    type = "S"
  }

  attribute {
    name = "CreatorIndexPK"
    type = "S"
  }

  attribute {
    name = "CreatorIndexSK"
    type = "S"
  }

  attribute {
    name = "GSI1_PK"
    type = "S"
  }

  attribute {
    name = "GSI1_SK"
    type = "S"
  }

  hash_key  = "PK"
  range_key = "SK"

  point_in_time_recovery {
    enabled = true
  }

  ttl {
    enabled        = true
    attribute_name = "ttl"
  }

  global_secondary_index {
    name            = "EntityIndex"
    hash_key        = "EntityIndexPK"
    range_key       = "EntityIndexSK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "CreatorIndex"
    hash_key        = "CreatorIndexPK"
    range_key       = "CreatorIndexSK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "GSI1"
    hash_key        = "GSI1_PK"
    range_key       = "GSI1_SK"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }

}

resource "aws_ssm_parameter" "estate_table_name" {
  name  = "/neumba/${var.stage}/service/estate-management/storage/table/estate/name"
  type  = "String"
  value = aws_dynamodb_table.estate_dynamoDb_table.name
}

resource "aws_ssm_parameter" "estate_table_arn" {
  name  = "/neumba/${var.stage}/service/estate-management/storage/table/estate/arn"
  type  = "String"
  value = aws_dynamodb_table.estate_dynamoDb_table.arn
}

resource "aws_ssm_parameter" "estate_table_stream_arn" {
  name  = "/neumba/${var.stage}/service/estate-management/storage/table/estate/stream/arn"
  type  = "String"
  value = aws_dynamodb_table.estate_dynamoDb_table.stream_arn
}

output "estate_dynamoDb_table_name" {
  value       = aws_dynamodb_table.estate_dynamoDb_table.name
  description = "Estates table name."
}

output "estate_dynamoDb_table_arn" {
  value       = aws_dynamodb_table.estate_dynamoDb_table.arn
  description = "Estates table arn."
}