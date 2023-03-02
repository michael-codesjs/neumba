resource "aws_cloudwatch_event_bus" "event_bus" {

  name = "neumba-${var.stage}-estate"

  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba estate domain event bus."
    Domain      = "estate"
  }

}

resource "aws_ssm_parameter" "event_bus_arn" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.event_bus.arn
}

resource "aws_ssm_parameter" "event_bus_name" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.event_bus.name
}