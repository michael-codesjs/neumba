resource "aws_cloudwatch_event_bus" "event_bus" {

  name = "neumba-${var.stage}-authentication"

  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba authentication domain event bus."
    Domain      = "authentication"
  }

}

resource "aws_ssm_parameter" "event_bus_arn" {
  name  = "/neumba/${var.stage}/domain/authentication/infrastructure/domain-io/event-bus/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.event_bus.arn
}

resource "aws_ssm_parameter" "event_bus_name" {
  name  = "/neumba/${var.stage}/domain/authentication/infrastructure/domain-io/event-bus/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.event_bus.name
}