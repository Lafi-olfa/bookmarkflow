import AuthTemplate from "./auth-template";

export default function SignIn() {
  return (
    <AuthTemplate
      title="Log in to your account"
      description="Welcome back! Please enter your details."
      fields={[
        {
          fieldName: "Email",
          type: "email",
          name: "email",
        },
        {
          fieldName: "Password",
          type: "password",
          name: "password",
        },
      ]}
      buttonTitle="Log in"
      links={[
        {
          question: "Forgot password?",
          action: "Reset it",
          href: "/reset-password",
        },
        {
          question: "Don’t have an account?",
          action: "Sign up",
          href: "/signup",
        },
      ]}
    />
  );
}
