module "api_gateway" {
  source        = "terraform-aws-modules/apigateway-v2/aws"
  name          = "${var.environment}-${var.app_name}"
  description   = ""
  protocol_type = "HTTP"
  domain_name   = "terraform-aws-modules.modules.tf"
  routes = {
    "POST /" = {
      integration = {
        uri                    = "arn:aws:lambda:eu-west-1:052235179155:function:my-function"
        payload_format_version = "2.0"
        timeout_milliseconds   = 12000
      }
    }
    "GET /some-route-with-authorizer" = {
      authorizer_key = "azure"

      integration = {
        type = "HTTP_PROXY"
        uri  = "some url"
      }
    }
    "$default" = {
      integration = {
        uri = "arn:aws:lambda:eu-west-1:052235179155:function:my-default-function"
      }
    }
  }
}
