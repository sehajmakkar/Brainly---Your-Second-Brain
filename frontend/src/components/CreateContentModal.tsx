import { Cross } from "../icons/Cross";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional callback for refreshing content after adding
}

export function CreateContentModal({ open, onClose, onSuccess }: CreateContentModalProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState("Youtube");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!link.trim()) {
      setError('Link is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        title, 
        link, 
        type,
        tags: tags || []
      }, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      });

      // Reset form
      setTitle('');
      setLink('');
      setType('Youtube');
      setTags([]);
      
      // Close modal and notify parent
      onClose();
      if (onSuccess) onSuccess();
      alert("Content added successfully!");
    } catch (err: any) {
      console.error("Error adding content:", err);
      setError(err.response?.data?.message || "Failed to add content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Content</h2>
          <button className="cursor-pointer" onClick={onClose} aria-label="Close">
            <Cross />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title" 
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Link</label>
            <input 
              type="text" 
              value={link} 
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter URL..." 
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Youtube">Youtube</option>
              <option value="X">X</option>
              <option value="Articles">Articles</option>
              <option value="Others">Others</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <div className="flex">
              <input 
                type="text" 
                value={tagInput} 
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag..." 
                className="flex-1 border border-gray-300 rounded-l-md p-2"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <button 
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-3 rounded-r-md"
              >
                Add
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                    {tag}
                    <button 
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveTag(index)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button 
            variant="secondary" 
            text="Cancel" 
            onClick={onClose} 
          />
          <Button 
            variant="primary" 
            text={isLoading ? "Saving..." : "Save"} 
            onClick={handleSubmit}
            // disabled={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}