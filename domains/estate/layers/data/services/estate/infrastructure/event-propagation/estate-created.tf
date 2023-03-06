# Capture 'ESTATE_CREATED' events.

resource "aws_cloudwatch_event_rule" "estate_created_rule" {
  
  name           = "capture-estate-created-${var.stage}"
  description    = "Captures 'ESTATE_CREATED' domain events."
  event_bus_name = data.aws_cloudwatch_event_bus.domain_event_bus.name

  event_pattern = jsonencode({
    detail-type = [
      "ESTATE_CREATED"
    ]
  })

}

# Pipe captured 'ESTATE_CREATED' events into the central event-bus.

resource "aws_cloudwatch_event_target" "estate_created_target" {
  rule           = aws_cloudwatch_event_rule.estate_created_rule.name
  target_id      = "estate-created-${var.stage}-target"
  arn            = data.aws_cloudwatch_event_bus.central_event_bus.arn
  event_bus_name = data.aws_cloudwatch_event_bus.domain_event_bus.name
  role_arn       = aws_iam_role.estate_created_role.arn
}

# Permissions to allow the propagation.

resource "aws_iam_role" "estate_created_role" {
  
  name = "estate_created_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          Service = "events.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

}

resource "aws_iam_policy" "estate_created_policy" {
  
  name = "estate_created_policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["events:PutEvents"]
        Resource = [data.aws_cloudwatch_event_bus.domain_event_bus.arn]
      },
    ]
  })

}

resource "aws_iam_role_policy_attachment" "estate_created_policy_attachment" {
  policy_arn = aws_iam_policy.estate_created_policy.arn
  role       = aws_iam_role.estate_created_role.name
}