variable "stage" {
  type = string
  default = "dev"
  description = "Stage the estate domain service io infrastructure is created in."
}

variable "region" {
  type = string
  default = "eu-central-1"
  description = "Region the estate domain service io infrastructure is created in."
}

data "aws_cloudwatch_event_bus" "central_event_bus" {
  name = "neumba-${var.stage}-central"
}

data "aws_cloudwatch_event_bus" "domain_event_bus" {
  name = "neumba-${var.stage}-estate"
}