type UpsertTemplate = {
  title: string;
  content: string;
}

type SimplifieCategory = {
  id: string;
  name: string;
  description?: string;
}

type SimplifiedTemplate = {
  id: string;
  title: string;
  content: string;
  categories: SimplifieCategory[]
}

export { UpsertTemplate, SimplifiedTemplate };
