import randomIterations from '../app/logic/randomIterations';

self.onmessage = (e) => {
    console.log('Message received from main script', e);

    const { numberOfTests, iterations } = e.data;

    
    quickRunner(numberOfTests, iterations);
    
};

function quickRunner(numberOfTests: number, iterations: number) {
    const startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
        randomIterations(numberOfTests);
    }

    const duration = performance.now() - startTime;

    self.postMessage({
        complete: true,
        startTime,
        duration
    });
}