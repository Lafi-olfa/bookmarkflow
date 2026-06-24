import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // S'assurer de l'import pour useSearchParams
import AuthTemplate from "./auth-template";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPass: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // 1. get token from url
  const token = searchParams.get("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function resetPassword(data: typeof formData) {
    if (!token) {
      throw new Error("Verify token");
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    return res.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (formData.password !== formData.confirmPass) {
      setStatusMessage("Please verify Passwords!");
      return;
    }

    e.preventDefault();
    try {
      await resetPassword(formData);
      setStatusMessage("Success");

      navigate("/bookmarks");
    } catch (err) {
      console.error("Error:", err);
      setStatusMessage("Error");
    }
  };

  return (
    <div>
      <AuthTemplate
        title="Reset Your Password"
        description="Enter your new password below. Make sure it’s strong and secure."
        fields={[
          {
            fieldName: "New Password *",
            type: "password",
            name: "password",
          },
          {
            fieldName: "Confirm Password *",
            type: "password",
            name: "confirmPass",
          },
        ]}
        buttonTitle="Reset password"
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
      {statusMessage && (
        <p
          style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}
