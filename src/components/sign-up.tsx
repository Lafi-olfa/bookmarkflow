import AuthTemplate from "./auth-template";

export default function SignUp() {
  return (
    <AuthTemplate
      title="Create your account"
      description="Join us and start saving your favorite links — organized, searchable, and always within reach."
      fields={[
        {
          fieldName: "Full name *",
          type: "text",
          name: "fullName",
        },
        {
          fieldName: "Email address",
          type: "email",
          name: "email",
        },
        {
          fieldName: "Password",
          type: "password",
          name: "password",
        },
      ]}
      buttonTitle="Create account"
      links={[
        {
          question: "Already have an account?",
          action: "Log in",
          href: "/sign-in",
        },
      ]}
    />
  );
}
