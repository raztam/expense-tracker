import { set } from "firebase/database";
import { useState } from "react";
import { ZodSchema } from "zod";

type ErrorsType = {
  [key: string]: string[];
};

const useForm = (
  initialValues: Record<string, string>,
  validationSchema: ZodSchema
) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isError, setIsError] = useState(false);

  const inputChangeHandler = (input: string, enteredValue: string) => {
    setInputValues((prevInputValues: typeof initialValues) => {
      return {
        ...prevInputValues,
        [input]: enteredValue,
      };
    });
  };

  /* 
  for each input field push the error message(if exists) to the string of errors
  for that field. and set the errors state with the new errors object.
  */
  const validateForm = () => {
    setIsError(false);
    console.log("errors start", errors);
    console.log("inputValues", inputValues);
    const result = validationSchema.safeParse(inputValues);
    if (!result.success) {
      setIsError(true);
      const newErrors: ErrorsType = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!newErrors[field]) {
          newErrors[field] = [];
        }
        newErrors[field].push(err.message);
      });
      console.log("newErrors", newErrors);
      setErrors(newErrors);
    }
  };

  return {
    inputValues,
    inputChangeHandler,
    errors,
    isError,
    validateForm,
  };
};

export default useForm;
