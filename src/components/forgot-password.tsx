import AuthTemplate from "./auth-template";

export default function ForgotPassword() {
  return (
    <AuthTemplate
      title="Forgot your password?"
      description="Enter your email address below and we’ll send you a link to reset your password."
      fields={[
        {
          fieldName: "Email *",
          type: "email",
          name: "email",
        },
      ]}
      buttonTitle="Send reset link"
      links={[
        {
          action: "Back to login",
          href: "/sign-in",
        },
      ]}
    />
  );
}
