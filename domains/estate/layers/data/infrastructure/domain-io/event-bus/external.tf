resource "aws_cloudwatch_event_bus" "external_event_bus" {

  name = "neumba-${var.stage}-estate-external"

  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba estate domain external event bus."
    Domain      = "estate"
  }

}

resource "aws_ssm_parameter" "external_event_bus_arn" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/external/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.external_event_bus.arn
}

resource "aws_ssm_parameter" "external_event_bus_name" {
  name  = "/neumba/${var.stage}/domain/estate/infrastructure/domain-io/event-bus/external/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.external_event_bus.name
}