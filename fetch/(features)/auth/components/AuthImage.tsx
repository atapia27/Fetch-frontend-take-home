import Image from "next/image";

export default function AuthImage() {
  return (
    <div className="bg-fetch-purple relative hidden items-center justify-center md:flex">
      <Image
        src="/footer-logo.svg"
        alt="Decorative Image"
        width={500}
        height={300}
        className="h-auto max-w-full px-16"
      />
    </div>
  );
}
