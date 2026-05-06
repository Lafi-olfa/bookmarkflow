import LogoDark from "../assets/logo-dark-theme.svg";
import { useTheme } from "../context/theme-context";
import LogoLight from "../assets/logo-light-theme.svg";
import InputField from "./input-field";

export default function SignIn() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-2.5 overflow-hidden border border-dashed border-amber-500 bg-[#e8f0ef]">
      <div className="radius-12 border border-amber-500 px-4 py-3">
        <img
          src={`${theme === "dark" ? LogoDark : LogoLight}`}
          alt="Menu"
          className="h-auto w-auto dark:text-white"
        />
        <div>
          <h2>Log in to your account</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <form action="" method="post">
          <InputField fieldName="Email" type="text" name="email" />
          <InputField fieldName="Password" type="text" name="password" />
          <button>Log in</button>
        </form>
        <div>
          <div>Forgot password?</div>
        </div>
      </div>
    </div>
  );
}
