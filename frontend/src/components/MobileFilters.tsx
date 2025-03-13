interface MobileFiltersProps {
  counts: {
    All: number;
    Youtube: number;
    X: number;
    Article: number;
    Other: number;
  };
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

function MobileFilters({ counts, selectedType, onSelectType }: MobileFiltersProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-3 md:hidden">
      <button 
        onClick={() => onSelectType(null)} 
        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedType === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        All ({counts.All})
      </button>
      <button 
        onClick={() => onSelectType("Youtube")} 
        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedType === "Youtube" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        🎬 Youtube ({counts.Youtube})
      </button>
      <button 
        onClick={() => onSelectType("X")} 
        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedType === "X" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        𝕏 X ({counts.X})
      </button>
      <button 
        onClick={() => onSelectType("Article")} 
        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedType === "Article" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        📄 Articles ({counts.Article})
      </button>
      <button 
        onClick={() => onSelectType("Other")} 
        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedType === "Other" ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
      >
        🔗 Other ({counts.Other})
      </button>
    </div>
  );
}

export default MobileFilters;