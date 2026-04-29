type TestFn = () => void | Promise<void>;

const tests: Array<{ name: string; fn: TestFn }> = [];

export function test(name: string, fn: TestFn): void {
  tests.push({ name, fn });
}

export async function run(): Promise<void> {
  const start = Date.now();
  let passed = 0;

  for (const { name, fn } of tests) {
    try {
      await fn();
      passed++;
      console.log(`ok ${passed} - ${name}`);
    } catch (error) {
      console.error(`not ok ${passed + 1} - ${name}`);
      console.error(error);
      process.exitCode = 1;
      return;
    }
  }

  console.log('');
  console.log(`1..${tests.length}`);
  console.log(`# pass ${passed}`);
  console.log(`# fail ${tests.length - passed}`);
  console.log(`# duration_ms ${Date.now() - start}`);
}
