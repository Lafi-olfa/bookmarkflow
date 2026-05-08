import AuthTemplate from "./auth-template";

export default function ResetPassword() {
  return (
    <AuthTemplate
      title="Forgot Your Password"
      description="Enter your new password below. Make sur it's strong and secure."
      fields={[
        {
          fieldName: "New Password *",
          type: "password",
          name: "password",
        },
        {
          fieldName: "Confirm Password *",
          type: "password",
          name: "password",
        },
      ]}
      buttonTitle="Rest password"
      links={[
        {
          action: "Back to login",
          href: "/sign-in",
        },
      ]}
    />
  );
}
