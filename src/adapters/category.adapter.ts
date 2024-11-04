import { Category } from "../entities/category.entity";
import { SimplifieCategory } from "../types/category.type";

export const getSimplifiedCategory = (category: Category): SimplifieCategory => {
    // Uma versão sem referências circulares
    const simplifiedCategory = {
      id: category.getId(),
      name: category.getName(),
      description: category.getDescription(),
      templates: category.getTemplates().map((template) => ({
        id: template.getId(),
        title: template.getTitle(),
        content: template.getContent(),
      })),
    };

    return simplifiedCategory;
}