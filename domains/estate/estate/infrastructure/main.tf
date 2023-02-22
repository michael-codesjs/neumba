variable "stage" {
  type        = string
  nullable    = false
  description = "Stage the storage infrastructure is created in."
}

variable "region" {
  type        = string
  nullable    = false
  description = "Region the storage infrastructure is created in."
}