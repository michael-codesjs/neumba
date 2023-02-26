resource "aws_cognito_user_pool" "user_pool" {

  name                = "neumba-user-pool-${var.stage}"
  username_attributes = ["email"]
  deletion_protection = var.stage == "prod" ? "ACTIVE" : "INACTIVE"

  password_policy {
    minimum_length    = 7
    require_lowercase = false
    require_uppercase = false
    require_symbols   = false
    require_numbers   = false
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = true
    mutable             = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }

  lifecycle {
    ignore_changes = [
      lambda_config
    ]
  }

}

resource "aws_ssm_parameter" "userPoolName" {
  name  = "/neumba/${var.stage}/infrastructure/authentication/user-pool/name"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.name
}

resource "aws_ssm_parameter" "userPoolId" {
  name  = "/neumba/${var.stage}/infrastructure/authentication/user-pool/id"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.id
}

resource "aws_ssm_parameter" "userPoolARN" {
  name  = "/neumba/${var.stage}/infrastructure/authentication/user-pool/arn"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.arn
}

output "cognito_user_pool_id" {
  value       = aws_cognito_user_pool.user_pool.id
  description = "Cognito user pool ID."
}
