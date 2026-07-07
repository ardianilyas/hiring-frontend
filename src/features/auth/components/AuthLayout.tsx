export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left side - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right side - Presentation */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4461f2] p-12 lg:p-24 text-white flex-col justify-center relative">
        <div className="max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-4">
            The simplest way to manage your workforce
          </h1>
          <p className="text-blue-100 text-lg">
            Enter your credentials to access your account
          </p>
        </div>
      </div>
    </div>
  );
}
