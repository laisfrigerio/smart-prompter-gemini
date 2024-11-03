import { v4 as uuidv4 } from 'uuid';
import Category from "./category.entity"

export class Template {
  private id: string;
  private title: string;
  private content: string;
  private categories: Category[];

  private constructor(id: string, title: string, content: string, categories: Category[] = []) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.categories = categories;
  }

  static create(title: string, content: string, categories: Category[] = []): Template {
    const id = uuidv4();
    return new Template(id, title, content, categories);
  }

  addCategory(category: Category) {
    if (!this.findByCategory(category)) {
      this.categories.push(category);
      category.addTemplate(this);
    }
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  setTitle (title: string) {
    this.title = title;
  }

  setContent (content: string) {
    this.content = content;
  }

  private findByCategory (category: Category) {
    return this.categories.find((c: Category) => category.getId() === c.getId());
  }
};