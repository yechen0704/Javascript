const API_URL = 'https://www.googleapis.com/books/v1/volumes';

interface BookItem {
  id: string;
  title: string;
  authors: string[];
}

export const fetchBooks = async (query: string): Promise<BookItem[]> => {
  try {
    const response = await fetch(`${API_URL}?q=${query}&maxResults=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const books: BookItem[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
    }));
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};