import { Template } from "../entities/template.entity";
import { SimplifiedTemplate } from "../types/template.type";

export const getSimplifiedTemplate = (template: Template): SimplifiedTemplate => {
    // Uma versão sem referências circulares
    const simplifiedTemplate = {
      id: template.getId(),
      title: template.getTitle(),
      content: template.getContent(),
      categories: template.getCategories().map((category) => ({
        id: category.getId(),
        name: category.getName(),
        description: category.getDescription(),
      })),
    };

    return simplifiedTemplate;
}