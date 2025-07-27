
'use client';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdSenseAd({ slot, format = 'auto', responsive = true, className = '' }: AdSenseAdProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center ${className}`}>
      <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">
        <i className="ri-advertisement-line w-8 h-8 flex items-center justify-center mx-auto mb-2"></i>
        Advertisement Space
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Google AdSense ads will appear here
      </p>
      <div className="mt-2 text-xs text-gray-300 dark:text-gray-600">
        Slot: {slot} | Format: {format}
      </div>
    </div>
  );
}
