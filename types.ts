export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export type ImageSize = '1K' | '2K' | '4K'; // Only available for gemini-3-pro-image-preview

export interface GeneratedImage {
  url: string;
  prompt: string;
}
