import { model } from "../third-party/gemini";

const chat = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};

export { chat };
