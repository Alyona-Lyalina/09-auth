"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { Credentials } from "@/types/user";
import { AxiosError } from "axios";
import css from "./SignUpPage.module.css";

const SignUpPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as Credentials;
      const user = await registerUser(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response?.data?.error) {
        setError(axiosError.response.data.error);
      } else if (axiosError.message) {
        setError(axiosError.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.formContainer}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
