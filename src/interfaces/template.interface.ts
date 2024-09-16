interface Template {
  id: string;
  title: string;
  content: string;
}

interface UpsertTemplate {
  title: string;
  content: string;
}

export { Template, UpsertTemplate };
