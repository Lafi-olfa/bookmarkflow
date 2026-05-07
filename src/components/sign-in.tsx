import LogoDark from "../assets/logo-dark-theme.svg";
import { useTheme } from "../context/theme-context";
import LogoLight from "../assets/logo-light-theme.svg";
import InputField from "./input-field";

export default function SignIn() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2.5 overflow-hidden bg-[#e8f0ef]">
      <div className="rounded-2xl px-2 py-4 dark:bg-[#002E2D]">
        {" "}
        <img
          src={`${theme === "dark" ? LogoDark : LogoLight}`}
          alt="Menu"
          className="h-auto w-auto px-5"
        />
        <div className="px-5 py-8">
          <p className="font-manrope text-2xl leading-[1.4] dark:text-white">
            Log in to your account
          </p>
          <p className="font-manrope w-full text-sm font-medium tracking-[0.01em] text-[#4C5C59]">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form action="" method="post" className="flex flex-col gap-4 px-5">
          <InputField fieldName="Email" type="text" name="email" />
          <InputField fieldName="Password" type="text" name="password" />
          <button className="rounded-lg bg-[#014745] p-2 text-base leading-[1.4] text-white shadow-sm dark:bg-teal-800">
            Log in
          </button>
        </form>
        <div className="flex flex-col items-center px-5 py-4">
          <div className="flex gap-0.5 text-sm">
            <span className="font-manrope leading-normal text-[#4C5C59] dark:text-neutral-100">
              Forgot password?
            </span>
            <span className="leading-[1.4] dark:text-white">Reset it</span>
          </div>
          <div className="lea flex gap-0.5 text-sm">
            <span className="font-manrope leading-normal text-[#4C5C59] dark:text-neutral-100">
              Don’t have an account?
            </span>
            <span className="leading-[1.4] dark:text-white">Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
}
