import { useState } from "react";
import AuthTemplate from "./auth-template";
import { useNavigate } from "react-router-dom";
type DataForm = {
  fullName: string;
  email: string;
  password: string;
};
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function signUp(data: DataForm) {
    const res = await fetch("http://localhost:10000/api/auth/signup", {
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
      await signUp(formData);
      navigate("/sign-in");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };
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
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
