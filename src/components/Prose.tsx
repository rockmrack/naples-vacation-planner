interface ProseProps {
    children: React.ReactNode;
    className?: string;
}

export function Prose({ children, className = "" }: ProseProps) {
    return (
        <div
            className={`
        prose prose-slate max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-4
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-20
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-relaxed
        prose-a:text-ocean-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900
        prose-ul:my-4 prose-ol:my-4
        prose-li:my-1
        prose-img:rounded-xl prose-img:shadow-lg
        prose-blockquote:border-l-ocean-500 prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:rounded-xl
        ${className}
      `}
        >
            {children}
        </div>
    );
}
