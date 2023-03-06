variable "stage" {
  type = string
  default = "dev"
  description = "Stage the authentication domain io infrastructure is created in."
}

variable "region" {
  type = string
  default = "eu-central-1"
  description = "Region the authentication domain io infrastructure is created in."
}