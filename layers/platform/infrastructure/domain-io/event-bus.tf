resource "aws_cloudwatch_event_bus" "central_event_bus" {

  name = "neumba-${var.stage}-central"

  tags = {
    Application = "neumba"
    Enviroment  = var.stage
    Description = "neumba central event bus."
  }

}

resource "aws_ssm_parameter" "central_event_bus_arn" {
  name  = "/neumba/${var.stage}/infrastructure/io/event-bus/central/arn"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.central_event_bus.arn
}

resource "aws_ssm_parameter" "central_event_bus_name" {
  name  = "/neumba/${var.stage}/infrastructure/io/event-bus/central/name"
  type  = "SecureString"
  value = aws_cloudwatch_event_bus.central_event_bus.name
}
