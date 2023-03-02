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

module "event-bus" {
  source = "./event-bus"
  region = var.region
  stage  = var.stage
}