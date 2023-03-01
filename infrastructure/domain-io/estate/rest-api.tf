resource "aws_api_gateway_rest_api" "estate_domain_api" {

  name        = "nuemba-estate"
  description = "REST API for synchronous communication with the estate domain."

  tags = {
    Application = "neumba"
    Domain     = "estate"
    Enviroment  = var.stage
    Description = "neumba REST API for synchronous communication with the estate domain."
  }

}

resource "aws_api_gateway_resource" "estate_domain_api_index_resource" {
  rest_api_id = aws_api_gateway_rest_api.estate_domain_api.id
  parent_id   = aws_api_gateway_rest_api.estate_domain_api.root_resource_id
  path_part   = "mock"
}

resource "aws_api_gateway_method" "estate_domain_api_index_resource_method" {
  rest_api_id   = aws_api_gateway_rest_api.estate_domain_api.id
  resource_id   = aws_api_gateway_resource.estate_domain_api_index_resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "estate_domain_api_index_gateway_integration" {
  rest_api_id = aws_api_gateway_rest_api.estate_domain_api.id
  resource_id = aws_api_gateway_resource.estate_domain_api_index_resource.id
  http_method = aws_api_gateway_method.estate_domain_api_index_resource_method.http_method
  type        = "MOCK"
}

resource "aws_api_gateway_deployment" "estate_domain_api_deployment" {

  depends_on = [
    aws_api_gateway_method.estate_domain_api_index_resource_method,
  ]

  stage_name = var.stage
  rest_api_id = aws_api_gateway_rest_api.estate_domain_api.id

  stage_description = timestamp()                  # forces to create a new deployment on each run https://github.com/hashicorp/terraform/issues/6613#issuecomment-289799360
  description       = "Deployed at ${timestamp()}" # just some comment field which can be seen in deployment history

  lifecycle {
    create_before_destroy = true
  }

}

resource "aws_ssm_parameter" "estate_domain_api_id" {
  name  = "/estate/${var.stage}/infrastructure/domain-io/estate/api/id"
  type  = "SecureString"
  value = aws_api_gateway_rest_api.estate_domain_api.id
}

resource "aws_ssm_parameter" "estate_domain_api_root_resource_id" {
  name  = "/estate/${var.stage}/infrastructure/domain-io/estate/root-resource-id"
  type  = "SecureString"
  value = aws_api_gateway_rest_api.estate_domain_api.root_resource_id
}

resource "aws_ssm_parameter" "estate_domain_api_arn" {
  name  = "/estate/${var.stage}/infrastructure/domain-io/estate/api/arn"
  type  = "SecureString"
  value = aws_api_gateway_rest_api.estate_domain_api.arn
}

resource "aws_ssm_parameter" "estate_domain_api_execution_arn" {
  name  = "/estate/${var.stage}/infrastructure/domain-io/estate/api/api_execution_arn"
  type  = "SecureString"
  value = aws_api_gateway_rest_api.estate_domain_api.execution_arn
}

resource "aws_ssm_parameter" "estate_domain_api_url" {
  name  = "/estate/${var.stage}/infrastructure/domain-io/estate/api/url"
  type  = "SecureString"
  value = aws_api_gateway_deployment.estate_domain_api_deployment.invoke_url
}