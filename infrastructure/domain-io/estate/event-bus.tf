resource "aws_cloudwatch_event_bus" "estate_domain_event_bus" {

  name = "neumba-${var.stage}-estate-domain"


  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba estate domain event bus."
    Domain      = "estate"
  }

}

resource "aws_ssm_parameter" "estate_domain_event_bus_arn" {
  name  = "/neumba/${var.stage}/infrastructure/domain-io/estate/event-bus/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.estate_domain_event_bus.arn
}

resource "aws_ssm_parameter" "estate_domain_event_bus_name" {
  name  = "/neumba/${var.stage}/infrastructure/domain-io/estate/event-bus/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.estate_domain_event_bus.name
}
