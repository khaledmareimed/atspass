'use client';

import Link from 'next/link';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

function Step({ number, title, description, icon, className = '' }: StepProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 ${className}`}>
      {/* Step Number */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
}

interface HowItWorksProps {
  className?: string;
}

export default function HowItWorks({ className = '' }: HowItWorksProps) {
  const steps = [
    {
      number: 1,
      title: "Upload Your Current Resume",
      description: "Start by uploading your existing resume or create a new one from scratch. Our AI will analyze your experience and skills.",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      number: 2,
      title: "Paste Job Description",
      description: "Copy and paste the job description you're applying for. Our AI will extract key requirements and optimize your resume accordingly.",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: 3,
      title: "AI Optimization",
      description: "Our advanced AI analyzes the job requirements, identifies missing keywords, and suggests improvements to maximize your ATS score.",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      number: 4,
      title: "Review & Download",
      description: "Review your optimized resume with real-time ATS scoring, make final adjustments, and download in your preferred format.",
      icon: (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className={`py-16 sm:py-20 bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Get your ATS-optimized resume in just 4 simple steps. 
            Our AI does the heavy lifting while you focus on your career.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              className={index % 2 === 1 ? 'sm:flex-row-reverse sm:space-x-reverse' : ''}
            />
          ))}
        </div>

        {/* Demo Preview */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              See It In Action
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Watch how our AI transforms your resume in real-time
            </p>
          </div>
          
          {/* Mock Demo Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">ATS Resume Builder</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="h-3 sm:h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                <div className="h-2 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/5"></div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-3 sm:h-4 bg-blue-100 dark:bg-blue-900/30 rounded w-3/4"></div>
                <div className="h-2 sm:h-3 bg-blue-100 dark:bg-blue-900/30 rounded w-full"></div>
                <div className="h-2 sm:h-3 bg-blue-100 dark:bg-blue-900/30 rounded w-5/6"></div>
                <div className="h-2 sm:h-3 bg-blue-100 dark:bg-blue-900/30 rounded w-4/5"></div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-sm sm:text-base">ATS Score: 95%</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Link href="/signup" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Try It Free Now
          </Link>
        </div>
      </div>
    </section>
  );
} 