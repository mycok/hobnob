function generateValidationErrorMessages(errors, pathPrefix = '') {
  const error = errors[0];

  switch (error.keyword) {
    case 'required':
      return `The '${pathPrefix}${error.dataPath}.${error.params.missingProperty}' field is missing`;
    case 'type':
      return `The '${pathPrefix}${error.dataPath}' field must be of type ${error.params.type}`;
    case 'format':
      return `The '${pathPrefix}${error.dataPath}' field must be a valid ${error.params.format}`;
    case 'additionalProperties':
      return `The '${pathPrefix}${error.dataPath}' object does not support the field '${error.params.additionalProperty}'`;
    case 'pattern':
      return `The '${pathPrefix}${error.dataPath}' field should contain atleast 8 characters with a lowercase, uppercase, a number and a special character`;

    default:
      return 'Invalid error object';
  }
}

export default generateValidationErrorMessages;
