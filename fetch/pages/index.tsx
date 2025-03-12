import LoginForm from "@/(features)/auth/components/LoginForm";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}