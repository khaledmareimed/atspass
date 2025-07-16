interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className = '' }: AuthCardProps) {
  return (
    <div className={`
      w-full max-w-md mx-auto
      bg-white/70 dark:bg-gray-800/70 
      backdrop-blur-xl 
      border border-gray-200/50 dark:border-gray-700/50
      rounded-3xl 
      shadow-2xl shadow-gray-900/10 dark:shadow-black/20
      p-8 md:p-10
      transition-all duration-300
      hover:shadow-3xl hover:shadow-gray-900/15 dark:hover:shadow-black/30
      ${className}
    `}>
      {children}
    </div>
  );
} 