declare global {

  namespace Chai {

    interface Assert {
      isIterable(val: any, msg?: string): void;
      isNotIterable(val: any, msg?: string): void;

      iteratesOver(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotIterateOver(act: any, exp: Iterable<any>, msg?: string): void;
      deepIteratesOver(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotDeepIterateOver(act: any, exp: Iterable<any>, msg?: string): void;

      iteratesFrom(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotIterateFrom(act: any, exp: Iterable<any>, msg?: string): void;
      deepIteratesFrom(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotDeepIterateFrom(act: any, exp: Iterable<any>, msg?: string): void;

      iteratesUntil(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotIterateUntil(act: any, exp: Iterable<any>, msg?: string): void;
      deepIteratesUntil(act: any, exp: Iterable<any>, msg?: string): void;
      doesNotDeepIterateUntil(act: any, exp: Iterable<any>, msg?: string): void;
    }

    interface Assertion {
      iterable: Assertion;
      iterate: {
        for: Assertion;
        over(values: Iterable<any>): Assertion;
        from(values: Iterable<any>): Assertion;
        until(values: Iterable<any>): Assertion;
      };
    }

    interface Deep {
      iterate: {
        over(values: Iterable<any>): Assertion;
        from(values: Iterable<any>): Assertion;
        until(values: Iterable<any>): Assertion;
      };
    }

  }

}

declare function chaiIterator(chai: any, utils: any): void;

export = chaiIterator;
