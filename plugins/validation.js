import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});
extend("email", email);
extend("comfirmed", confirmed);
