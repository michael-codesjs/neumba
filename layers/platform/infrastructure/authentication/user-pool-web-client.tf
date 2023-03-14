resource "aws_cognito_user_pool_client" "user_pool_web_client" {

  name                = "neumba-main"
  user_pool_id        = aws_cognito_user_pool.user_pool.id
  
  explicit_auth_flows = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
  generate_secret = false

}

resource "aws_ssm_parameter" "userPoolClientId" {
  name  = "/neumba/${var.stage}/infrastructure/authentication/user-pool/client/main/id"
  type  = "SecureString"
  value = aws_cognito_user_pool_client.user_pool_web_client.id
}