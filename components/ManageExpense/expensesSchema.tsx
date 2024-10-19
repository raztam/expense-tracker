import { z } from "zod";
import moment from "moment";

const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .refine(
      (val) => {
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed > 0;
      },
      { message: "Amount must be a valid number greater than 0" }
    ),
  date: z
    .string()
    .min(1, { message: "Date is required" })
    .refine(
      (value) => {
        return moment(value, "YYYY-MM-DD").isValid(); // Adjust format if needed
      },
      {
        message: "Invalid date format for date. Must be in YYYY-MM-DD format",
      }
    ),
  description: z.string(),
});

export default expenseSchema;
