variable "stage" {
  type        = string
  nullable    = false
  description = "Stage the estate service infrastructure is created in."
}

variable "region" {
  type        = string
  nullable    = false
  description = "Region the estate service infrastructure is created in."
}

module "storage" {
  source = "./storage"
  region = var.region
  stage  = var.stage
}