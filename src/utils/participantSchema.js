import * as yup from "yup";

const participantSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  passwordHash: yup.string().required("Password is required"),

  age: yup
    .number()
    .positive("Age must be a positive number")
    .required("Age is required"),
  height: yup
    .number()
    .positive("Height must be a positive number")
    .required("Height is required"),
  weight: yup
    .number()
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  tshirtSize: yup.string().required("T-shirt size is required"),
});

export default participantSchema;
