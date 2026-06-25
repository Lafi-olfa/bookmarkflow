import { useState } from "react";
import AuthTemplate from "./auth-template";
import { useNavigate } from "react-router-dom";
type DataForm = {
  email: string;
  password: string;
};
export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function signIn(data: DataForm) {
    const res = await fetch("http://localhost:10000/api/auth/login", {
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

    const result = await res.json();

    localStorage.setItem("token", result.token);

    return result;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const x= await signIn(formData);
      console.log(x);
      
      navigate("/bookmarks");
    } catch (err) {
      console.error("Sign-In error:", err);
    }
  };

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
          href: "/forgot-password",
        },
        {
          question: "Don’t have an account?",
          action: "Sign up",
          href: "/",
        },
      ]}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
