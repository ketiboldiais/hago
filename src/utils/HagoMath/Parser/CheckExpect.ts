type TestSubject = [object, object];

function Eval(actual: object, expected: object, testName = 'Test') {
  const success = `${testName}: All assertions passed.\n`;
  const fail = `${testName}: Assertions failed.\n`;

  const result = DeepEqual(actual, expected);

  result ? console.log(success) : console.log(fail);

  function DeepEqual(a: object, b: object) {
    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (Object.keys(a).length != Object.keys(b).length) return false;
      for (var key in a) if (!DeepEqual(a[key], b[key])) return false;
      return true;
    } else return a === b;
  }
}

interface TestArgs {
  /**
   * An array of test subjects.
   * - [actual-output-object, expected-output-object]
   */
  subjects: TestSubject[];
  /**
   * Optional test name
   */
  testName?: string;
}

export function CheckExpect({ subjects, testName }: TestArgs) {
  const name = testName ? testName : 'Test';
  const subjectCount = subjects.length;
  for (let i = 0; i < subjectCount; i++) {
    const actual = subjects[i][0];
    const expect = subjects[i][1];
    Eval(actual, expect, `${name} ${i}`);
  }
}
