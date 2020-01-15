function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
    res.status(err.status);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'Payload should be in JSON format' });
  }
  return next();
}

export default errorHandler;
