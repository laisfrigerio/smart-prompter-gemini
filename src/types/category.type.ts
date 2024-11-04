interface UpsertCategory {
  name: string;
  description?: string;
}

type SimplifiedTemplate = {
  id: string;
  title: string;
  content: string;
}

type SimplifieCategory = {
  id: string;
  name: string;
  description?: string;
  templates: SimplifiedTemplate[];
}

export { UpsertCategory, SimplifieCategory };
