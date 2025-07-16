interface DifferentEmailButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function DifferentEmailButton({ 
  onClick, 
  className = '', 
  disabled = false 
}: DifferentEmailButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        flex items-center justify-center gap-3
        px-6 py-4
        bg-gray-50 dark:bg-gray-700/50
        border border-gray-200 dark:border-gray-600
        rounded-2xl
        text-gray-700 dark:text-gray-200
        font-medium text-base
        transition-all duration-200
        hover:bg-gray-100 dark:hover:bg-gray-600
        hover:border-gray-300 dark:hover:border-gray-500
        hover:shadow-lg hover:shadow-gray-900/10 dark:hover:shadow-black/20
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
        ${className}
      `}
    >
      <svg 
        className="w-5 h-5 text-gray-500 dark:text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
        />
      </svg>
      Use a different email
    </button>
  );
} 