interface AuthError {
  field: "email" | "password" | "confirmPassword";
  message: string;
}

export function translateFirebaseAuthError(errorCode: string): AuthError {
  switch (errorCode) {
    // Email-related errors
    case "auth/email-already-in-use)":
      return { field: "email", message: "This email is already in use" };
    case "auth/user-not-found":
      return { field: "email", message: "No account found with this email" };

    // Password-related errors
    case "auth/wrong-password":
      return { field: "password", message: "Incorrect password" };
    case "auth/requires-recent-login":
      return { field: "password", message: "Please log in again to continue" };

    // Default case for unknown errors
    default:
      return { field: "email", message: "An unexpected error occurred" };
  }
}
