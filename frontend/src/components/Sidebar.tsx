import SidebarItem from './SidebarItem';

interface SidebarProps {
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

function Sidebar({ counts, selectedType, onSelectType }: SidebarProps) {
  return (
    <aside className="w-56 bg-white border-r border-gray-200 h-[calc(100vh-44px)] sticky top-11 pt-4 hidden md:block">
      <div className="px-3 py-2">
        <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Filters</h2>
      </div>
      
      <nav className="mt-2 flex flex-col gap-1 px-2">
        <SidebarItem 
          icon="🌐" 
          label="All" 
          count={counts.All} 
          active={selectedType === null}
          onClick={() => onSelectType(null)} 
        />
        <SidebarItem 
          icon="🎬" 
          label="Youtube" 
          count={counts.Youtube} 
          active={selectedType === "Youtube"}
          onClick={() => onSelectType("Youtube")}  
        />
        <SidebarItem 
          icon="𝕏" 
          label="X" 
          count={counts.X} 
          active={selectedType === "X"}
          onClick={() => onSelectType("X")}  
        />
        <SidebarItem 
          icon="📄" 
          label="Articles" 
          count={counts.Article} 
          active={selectedType === "Article"}
          onClick={() => onSelectType("Article")}  
        />
        <SidebarItem 
          icon="🔗" 
          label="Other" 
          count={counts.Other} 
          active={selectedType === "Other"}
          onClick={() => onSelectType("Other")}  
        />
      </nav>
    </aside>
  );
}

export default Sidebar;