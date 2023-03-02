resource "aws_cloudwatch_event_bus" "internal_event_bus" {

  name = "neumba-${var.stage}-estate-internal"

  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba estate domain internal event bus."
    Domain      = "estate"
  }

}

resource "aws_ssm_parameter" "internal_event_bus_arn" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/internal/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.internal_event_bus.arn
}

resource "aws_ssm_parameter" "internal_event_bus_name" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/internal/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.internal_event_bus.name
}
