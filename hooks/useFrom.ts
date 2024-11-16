import { useState } from "react";
import { ZodSchema } from "zod";
import { translateFirebaseAuthError } from "../util/errors";

type ErrorsType = {
  [key: string]: string[];
};

const useForm = (
  initialValues: Record<string, string>,
  validationSchema: ZodSchema
) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsType>({});

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
    const result = validationSchema.safeParse(inputValues);
    if (!result.success) {
      const newErrors: ErrorsType = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        if (!newErrors[field]) {
          newErrors[field] = [];
        }
        newErrors[field].push(err.message);
      });
      setErrors(newErrors);
    }
    return result.success;
  };

  const setAuthError = (message: string) => {
    const errorObject = translateFirebaseAuthError(message);
    setErrors({ [errorObject.field]: [errorObject.message] });
  };

  return {
    inputValues,
    inputChangeHandler,
    errors,
    setAuthError,
    validateForm,
  };
};

export default useForm;
