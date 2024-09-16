class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { BadRequestException };
