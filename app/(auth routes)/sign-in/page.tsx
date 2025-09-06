"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { loginUser } from "@/lib/api/clientApi";

import { Credentials } from "@/types/user";
import { ApiError } from "next/dist/server/api-utils";
import css from "./SignInPage.module.css";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as Credentials;
      const user = await loginUser(values);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (err) {
      setError((err as ApiError).message ?? "Something went wrong");
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.formContainer}>
        <h1 className={css.formTitle}>Sign in</h1>
        <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={css.input}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={css.input}
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}

export default SignInPage;
