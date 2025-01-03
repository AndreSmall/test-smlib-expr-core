import { benchmark, Measurement } from 'kelonio';
import randomIterations from './randomIterations';

export async function runPerformanceTests(numberOfTests: number, iterations: number): Promise<Measurement> {
    return benchmark
      .record(
        () => {
            randomIterations(numberOfTests)
        },
        { iterations}
      );
}
