terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.region
}

variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the estate/data/estate service infrastructure is created in."
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the estate/data/estate service infrastructure is created in."
}

module "event-propagation" {
  source = "./event-propagation"
  stage  = var.stage
  region = var.region
}
