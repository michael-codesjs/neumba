# Capture 'ESTATE_DELETED' events.

resource "aws_cloudwatch_event_rule" "estate_deleted_rule" {
  
  name           = "capture-estate-deleted-${var.stage}"
  description    = "Captures 'ESTATE_DELETED' domain events."
  event_bus_name = data.aws_cloudwatch_event_bus.domain_event_bus.name

  event_pattern = jsonencode({
    detail-type = [
      "ESTATE_DELETED"
    ]
  })

}

# Pipe captured 'ESTATE_DELETED' events into the central event-bus.

resource "aws_cloudwatch_event_target" "estate_deleted_target" {
  rule           = aws_cloudwatch_event_rule.estate_deleted_rule.name
  target_id      = "estate-deleted-${var.stage}-target"
  arn            = data.aws_cloudwatch_event_bus.central_event_bus.arn
  event_bus_name = data.aws_cloudwatch_event_bus.domain_event_bus.name
  role_arn       = aws_iam_role.estate_deleted_role.arn
}

# Permissions to allow the propagation.

resource "aws_iam_role" "estate_deleted_role" {
  
  name = "estate_deleted_role"

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

resource "aws_iam_policy" "estate_deleted_policy" {
  
  name = "estate_deleted_policy"

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

resource "aws_iam_role_policy_attachment" "estate_deleted_policy_attachment" {
  policy_arn = aws_iam_policy.estate_deleted_policy.arn
  role       = aws_iam_role.estate_deleted_role.name
}