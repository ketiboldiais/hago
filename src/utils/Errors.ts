class HagoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HagoError';
  }
}

class DataTypeError extends HagoError {
  expectedFormat: string;
  constructor(expectedFormat: string) {
    super('Improper data format.');
    this.name = 'TypeError';
    this.expectedFormat = expectedFormat;
  }
}

class MissingObjectProperty extends DataTypeError {
  missingProperty: string;
  constructor(missingProperty: string) {
    super('Missing object property: ' + missingProperty);
    this.name = 'MissingPropertyError';
    this.missingProperty = missingProperty;
  }
}
