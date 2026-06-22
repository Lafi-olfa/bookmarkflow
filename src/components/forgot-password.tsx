import AuthTemplate from "./auth-template";
import { useState } from "react";
type DataForm = {
  email: string;
};
export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function forgotPassword(data: DataForm) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Signup failed");
    }
    return res.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(formData);
    } catch (err) {
      console.error("Sending email error:", err);
    }
  };
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
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
