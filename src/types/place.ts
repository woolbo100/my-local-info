export interface Place {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  image?: string;
  link?: string;
  tags?: string[];
}
