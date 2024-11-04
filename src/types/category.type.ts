interface UpsertCategory {
  name: string;
  description?: string;
}

type SimplifieCategory = {
  id: string;
  name: string;
  description?: string;
}

export { UpsertCategory, SimplifieCategory };
