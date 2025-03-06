import { FaApple, FaGoogle } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import * as comp from "@/(features)/auth/components";
import { twMerge } from "tailwind-merge";
import * as styles from "@/(features)/auth/styles/styles";
import { useLogin } from "@/(features)/auth/hooks/useLogin";

export default function LoginForm() {
  const { name, setName, email, setEmail, handleLogin, loading, error } = useLogin();

  const buttonVariant = "bg-blue-600 text-white hover:bg-blue-700";
  const buttonDisabled = loading ? "opacity-50" : "";
  const buttonStyle = twMerge(styles.buttonBase, buttonVariant, buttonDisabled);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles.flexColumn}>
      <div className={styles.containerBase}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Form Section */}
          <form onSubmit={onSubmit} className="flex flex-col gap-6 p-6 md:p-8">
            <div className="text-center">
              <h1 className="text-2xl">Welcome back</h1>
              <p className={styles.textBase}>Login to your Fetch account</p>
            </div>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <comp.InputField label="Name" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <comp.InputField label="Email" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button type="submit" className={buttonStyle} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <comp.Divider />

            <div className="grid grid-cols-3 gap-4">
              <comp.SocialLoginButton icon={<FaApple />} label="Login with Apple" />
              <comp.SocialLoginButton icon={<FaGoogle />} label="Login with Google" />
              <comp.SocialLoginButton icon={<FaMeta />} label="Login with Meta" />
            </div>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline">
                Sign up
              </a>
            </div>
          </form>

          {/* Image Section */}
          <comp.AuthImage />
        </div>
      </div>

      <div className={styles.textBase}>
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
