variable "stage" {
  type        = string
  default     = "dev"
  description = "Stage the estate storage infrastructure is created in."
}

variable "region" {
  type        = string
  default     = "eu-central-1"
  description = "Region the estate storage infrastructure is created in."
}