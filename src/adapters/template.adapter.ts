import { Template } from "../entities/template.entity";
import { Simplifiedemplate } from "../types/template.type";

export const getSimplifiedTemplate = (template: Template): Simplifiedemplate => {
    // Criar uma versão sem referências circulares
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