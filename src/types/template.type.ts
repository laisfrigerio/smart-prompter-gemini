import { SimplifieCategory } from "./category.type";

type UpsertTemplate = {
  title: string;
  content: string;
}

type Simplifiedemplate = {
  id: string;
  title: string;
  content: string;
  categories: SimplifieCategory[]
}

export { UpsertTemplate, Simplifiedemplate };
