import LogoDark from "../assets/logo-dark-theme.svg";
import { useTheme } from "../context/theme-context";
import LogoLight from "../assets/logo-light-theme.svg";
import InputField from "./input-field";

type FieldsProps = {
  fieldName: string;
  type: string;
  name: string;
};

type LinkProps = {
  question?: string;
  action: string;
  href: string;
};

type AuthProps = {
  title: string;
  description: string;
  fields: FieldsProps[];
  buttonTitle: string;
  links: LinkProps[];
};
export default function AuthTemplate({
  title,
  description,
  fields,
  buttonTitle,
  links,
}: AuthProps) {
  const { theme } = useTheme();

  return (
    <div className="absolute flex min-h-screen w-full min-w-screen flex-col items-center justify-center gap-8 rounded-xl bg-[#e8f0ef] px-4 py-8">
      <div className="w-full max-w-md rounded-2xl px-2 py-4 dark:bg-[#002E2D]">
        <img
          src={`${theme === "dark" ? LogoDark : LogoLight}`}
          alt="Logo"
          className="h-auto w-auto px-5"
        />

        <div className="px-5 py-8">
          <p className="font-manrope text-xl leading-[1.4] dark:text-white">
            {title}
          </p>

          <p className="font-manrope max-w-xs text-sm font-medium tracking-[0.01em] text-[#4C5C59] dark:text-neutral-100">
            {description}
          </p>
        </div>

        <form action="" method="post" className="flex flex-col gap-4 px-5">
          {fields.map((field, index) => (
            <InputField
              key={index}
              fieldName={field.fieldName}
              type={field.type}
              name={field.name}
            />
          ))}

          <button className="rounded-lg bg-[#014745] p-2 text-base leading-[1.4] text-white shadow-sm dark:bg-teal-800">
            {buttonTitle}
          </button>
        </form>

        <div className="flex flex-col items-center px-5 py-4">
          {links.map((item, index) => (
            <div key={index} className="flex gap-0.5 text-sm">
              <span className="font-manrope leading-normal text-[#4C5C59] dark:text-neutral-100">
                {item.question}
              </span>

              <a href={item.href} className="leading-[1.4] dark:text-white">
                {item.action}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
