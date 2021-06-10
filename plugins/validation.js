import { extend } from "vee-validate";
import { required, email, confirmed, numeric, min_value, max_value } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", email);
extend("comfirmed", confirmed);
extend("numeric", numeric);
extend("min_value", min_value);
extend("max_value", max_value);
