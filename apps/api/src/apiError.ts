class ApiError extends Error {
  statusCode?: number;
  field?: string;
  value: any;

  constructor(message: string, statusCode?: number, field?: string, value: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.field = field;
    this.value = value;
  }
}

export default ApiError;
  