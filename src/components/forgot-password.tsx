import { useNavigate } from "react-router-dom";
import AuthTemplate from "./auth-template";
import { useState } from "react";
type DataForm = {
  email: string;
};
export default function ForgotPassword() {
  const navigate = useNavigate();

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
    const res = await fetch("http://localhost:5000/api/auth/forgot-poassword", {
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
      const user = await forgotPassword(formData);
      navigate("/reset-password");

      console.log("Link send:", user);
    } catch (err) {
      console.error("Sening email error:", err);
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
