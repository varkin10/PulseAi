import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cream-100">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-200 rounded-full opacity-40 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-300 rounded-full opacity-30 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-100 rounded-full opacity-50 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="font-semibold text-gray-900 text-lg">PulseAI</span>
        </div>
        <SignUp />
      </div>
    </div>
  );
}
