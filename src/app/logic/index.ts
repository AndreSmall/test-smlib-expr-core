import { benchmark, Measurement } from 'kelonio';
import randomIterations from './randomIterations';

export async function runPerformanceTests(iterations: number): Promise<Measurement> {
    return benchmark
      .record(
        () => {
            randomIterations(1)
        },
        { iterations}
      );
}
