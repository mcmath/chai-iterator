declare module "chai/lib/Assert" {

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

}

declare module "chai/lib/Assertion" {

  interface Assertion {
    iterable: Assertion;
    iterate: Assertion;
    over(values: any[]): Assertion;
    from(values: any[]): Assertion;
    until(values: any[]): Assertion;
  }

  interface Deep {
    iterate: Assertion;
  }

}

declare function chaiIterator(chai: any, utils: any): void;

export = chaiIterator;
