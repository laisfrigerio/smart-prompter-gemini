interface Category {
  id: string;
  name: string;
  description?: string;
}

interface UpsertCategory {
  name: string;
  description?: string;
}

export { Category, UpsertCategory };
