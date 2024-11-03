import { v4 as uuidv4 } from 'uuid';
import { Template } from './template.entity';

class Category {
  private id: string;
  private name: string;
  private description: string;
  private templates: Template[];

  constructor(id: string, name: string, description: string, templates: Template[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.templates = templates;
  }

  static create(name: string, description: string, templates: Template[] = []): Category {
    const id = uuidv4();
    return new Category(id, name, description, templates);
  }

  addTemplate(template: Template) {
    if (!this.findByTemplate(template)) {
      this.templates.push(template);
      template.addCategory(this);
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getTemplates(): Template[] {
    return this.templates;
  }

  private findByTemplate (template: Template) {
    return this.templates.find((t: Template) => template.getId() === t.getId());
  }
}

export default Category;
