interface CardProps {
  title: string;
  type: string;
  url: string;
}

function Card({ title, type, url }: CardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Youtube':
        return '🎬';
      case 'X':
        return '𝕏';
      case 'Article':
        return '📄';
      default:
        return '🔗';
    }
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden mb-3 shadow-sm hover:shadow transition-shadow ">
      {/* Minimalist header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center">
            <span className="mr-1 text-xs">{getTypeIcon(type)}</span>
            <span className="text-xs">{type}</span>
          </span>
          <h3 className="text-sm font-medium text-gray-800 truncate max-w-[150px]">{title}</h3>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      {/* Embedded content - smaller */}
      <div className="px-2 py-2">
        {type === "Youtube" && (
          <div className="aspect-video rounded overflow-hidden bg-gray-50">
            <iframe 
              className="w-full h-full" 
              src={url.replace("watch?v=", "embed/")} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
        )}
        {type === "X" && (
          <div className="rounded bg-gray-50 p-2 ">
            <blockquote className="twitter-tweet" data-cards="hidden" data-conversation="none">
              <a href={url.replace("x.com/", "twitter.com/")}></a>
            </blockquote>
          </div>
        )}
        {type === "Article" && (
          <div className="px-2 py-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <p className="text-sm text-gray-600 mt-2">{url}</p>
          </div>
        )}
        {type === "Others" && (
          <div className="px-2 py-2">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <p className="text-sm text-gray-600 mt-2">{url}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;