import assert from 'assert';

import ValidationError from '../../../errors/validation-error';
import generateResSpy from '../../../tests/spies/res';
import generateCreateEngineStubs,
{ CREATE_USER_RESPONSE, VALIDATION_ERROR_MSG, GENERIC_ERROR_MSG } from '../../../tests/stubs/engines/user/create';
import createUser from '.';

describe('createUser controller functionality', function () {
  const req = {};
  const db = {};
  const validator = {};

  let res;
  let engine;

  beforeEach(function () {
    res = generateResSpy();
  });

  describe('when invoked', function () {
    beforeEach(function () {
      engine = generateCreateEngineStubs().success;
      return createUser(req, res, db, engine, validator, ValidationError);
    });

    describe('should call the create engine function', function () {
      it('once', function () {
        assert(engine.calledOnce);
      });

      it('with req, db, validator and ValidationError as arguments', function () {
        assert(engine.calledWithExactly(req, db, validator, ValidationError));
      });
    });
  });
  describe('when invoked with a valid request object', function () {
    beforeEach(function () {
      engine = generateCreateEngineStubs().success;
      return createUser(req, res, db, engine, validator, ValidationError);
    });

    describe('should call res.status()', function () {
      it('once', function () {
        assert(res.status.calledOnce);
      });
      it('with a 201 status code', function () {
        assert(res.status.calledWithExactly(201));
      });
    });

    describe('should call res.set()', function () {
      it('once', function () {
        assert(res.set.calledOnce);
      });

      it('with "Content-Type" and "plain/text" arguments', function () {
        assert(res.set.calledWithExactly('Content-Type', 'text/plain'));
      });
    });

    describe('should call res.send()', function () {
      it('once', function () {
        assert(res.send.calledOnce);
      });

      it('should resolve with a user ID result', function () {
        assert(res.send.calledWithExactly(CREATE_USER_RESPONSE._id));
      });
    });
  });

  describe('when invoked with an invalid request object, it rejects with an error', function () {
    beforeEach(function () {
      engine = generateCreateEngineStubs().validationError;
      return createUser(req, res, db, engine, validator, ValidationError);
    });

    describe('should call res.status()', function () {
      it('once', function () {
        assert(res.status.calledOnce);
      });
      it('with a 400 status code', function () {
        assert(res.status.calledWithExactly(400));
      });
    });

    describe('should call res.set()', function () {
      it('once', function () {
        assert(res.set.calledOnce);
      });

      it('with "Content-Type" and "application/json" arguments', function () {
        assert(res.set.calledWithExactly('Content-Type', 'application/json'));
      });
    });

    describe('should call res.json()', function () {
      it('once', function () {
        assert(res.json.calledOnce);
      });

      it('with an error message', function () {
        assert(res.json.calledWithExactly({ message: VALIDATION_ERROR_MSG }));
      });
    });
  });

  describe('when createUser controller throws a generic error', function () {
    beforeEach(function () {
      engine = generateCreateEngineStubs().genericError;
      return createUser(req, res, db, engine, validator, ValidationError);
    });

    describe('should call res.status()', function () {
      it('once', function () {
        assert(res.status.calledOnce);
      });
      it('with a 500 status code', function () {
        assert(res.status.calledWithExactly(500));
      });
    });

    describe('should call res.set()', function () {
      it('once', function () {
        assert(res.set.calledOnce);
      });

      it('with "Content-Type" and "application/json" arguments', function () {
        assert(res.set.calledWithExactly('Content-Type', 'application/json'));
      });
    });

    describe('should call res.json()', function () {
      it('once', function () {
        assert(res.json.calledOnce);
      });

      it('with an error message', function () {
        assert(res.json.calledWithExactly({ message: GENERIC_ERROR_MSG }));
      });
    });
  });
});
