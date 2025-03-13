export interface ContentItem {
  id: number;
  title: string;
  type: 'Youtube' | 'X' | 'Article' | 'Other';
  url: string;
}

// Sample content data
const content: ContentItem[] = [
  { id: 1, title: "Trump Election", type: "Youtube", url: "https://www.youtube.com/watch?v=W6dZ-0ZhoyU" },
  { id: 2, title: "Twitter Update", type: "X", url: "https://x.com/perpetuallonerX/status/1900082242908721233" },
  { id: 3, title: "AI News", type: "Youtube", url: "https://www.youtube.com/watch?v=W6dZ-0ZhoyU" },
  { id: 4, title: "Tech Article", type: "Article", url: "https://example.com/article" },
  { id: 5, title: "Science Video", type: "Youtube", url: "https://www.youtube.com/watch?v=W6dZ-0ZhoyU" },
  { id: 6, title: "Health Tweet", type: "X", url: "https://x.com/perpetuallonerX/status/1900082242908721233" },
  { id: 7, title: "Book Summary", type: "Article", url: "https://example.com/book-summary" },
  { id: 8, title: "Other Link", type: "Other", url: "https://example.com/resource" }
];

export default content;