interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function AuthHeader({ 
  title, 
  subtitle, 
  className = '' 
}: AuthHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
} 