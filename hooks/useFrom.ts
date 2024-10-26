import { useState } from "react";
import { ZodSchema } from "zod";

type ErrorsType = {
  [key: string]: string[];
};

const useForm = (
  initialValues: Record<string, string>,
  validationSchema: ZodSchema
) => {
  const initializeErrors = (
    initialValues: Record<string, string>
  ): ErrorsType => {
    const errors: ErrorsType = {};
    for (const key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        errors[key] = [];
      }
    }
    return errors;
  };

  const [inputValues, setInputValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsType>(
    initializeErrors(initialValues)
  );

  const inputChangeHandler = (input: string, enteredValue: string) => {
    setInputValues((prevInputValues: typeof initialValues) => {
      return {
        ...prevInputValues,
        [input]: enteredValue,
      };
    });
  };

  const handleSubmit = () => {
    console.log("inputValues", inputValues);
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
  };

  return {
    inputValues,
    inputChangeHandler,
    errors,
    handleSubmit,
  };
};

export default useForm;
