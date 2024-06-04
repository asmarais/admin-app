import * as yup from "yup";

const eventSchema = yup.object().shape({
  eventName: yup.string().required("Event Name is required"),
  status: yup.string().required("Status is required"),
  start: yup
    .date()
    .typeError("Start Date and Time is required")
    .required("Start Date and Time is required")
    .min(new Date(), "Start Date and Time must be in the future"),
  end: yup
    .date()
    .typeError("End Date and Time is required")

    .required("End Date and Time is required")
    .min(
      yup.ref("start"),
      "End Date and Time must be after Start Date and Time"
    ),
  description: yup.string().required("Description is required"),
});

export default eventSchema;
