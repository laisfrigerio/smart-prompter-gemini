import { v4 as uuidv4 } from 'uuid';
import { Category } from "./category.entity"

export class Template {
  private id: string;
  private title: string;
  private content: string;
  private categories: Category[];

  constructor(id: string, title: string, content: string, categories: Category[] = []) {
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

  removeCategory(category: Category) {
    if (this.findByCategory(category)) {
      const newCategories = this.getCategories().filter(cat => cat.getId() !== category.getId());
      this.setCategories(newCategories);
      category.removeTemplate(this);
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

  setCategories (categories: Category[]) {
    this.categories = categories;
  }

  private findByCategory (category: Category) {
    return this.categories.find((c: Category) => category.getId() === c.getId());
  }
};