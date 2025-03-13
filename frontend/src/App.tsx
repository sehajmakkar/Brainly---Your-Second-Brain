import { useState } from 'react';
import Button from "./components/Button";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import { Plus } from "./icons/Plus";
import { Share } from "./icons/Share";
import content from "./data/content";
import MobileFilters from './components/MobileFilters';

function App() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  
  const filteredContent = selectedType 
    ? content.filter(item => item.type === selectedType) 
    : content;

  
  const counts = {
    Youtube: content.filter(item => item.type === "Youtube").length,
    X: content.filter(item => item.type === "X").length,
    Article: content.filter(item => item.type === "Article").length,
    Other: content.filter(item => item.type === "Other").length,
    All: content.length
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-md font-semibold text-gray-800">Second Brain</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" text="Share Brain" icon={<Share />} />
            <Button variant="primary" text="Add Content" icon={<Plus />} />
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar 
          counts={counts} 
          selectedType={selectedType} 
          onSelectType={setSelectedType} 
        />

        {/* Main content */}
        <main className="flex-1 p-4">
          {/* Mobile filter options */}
          <MobileFilters 
            counts={counts} 
            selectedType={selectedType} 
            onSelectType={setSelectedType} 
          />

          {/* Card grid */}
          <div className="flex flex-wrap gap-4">
            {filteredContent.map(item => (
              <div key={item.id} className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]">
                <Card 
                  title={item.title} 
                  type={item.type} 
                  url={item.url} 
                />
              </div>
            ))}
            
            {filteredContent.length === 0 && (
              <div className="w-full py-16 text-center text-gray-500">
                No items found for the selected filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;