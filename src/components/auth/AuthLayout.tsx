import { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-lightBrown px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-black space-y-4 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}
