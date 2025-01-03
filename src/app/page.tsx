"use client"
import { join } from "path";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Measurement } from "kelonio";
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

import Image from "next/image";
import styles from "./page.module.css";
import { runPerformanceTests } from "./logic";
import nextConfig from "../../next.config";

const iterations = 100
const numberOfTests = 13000

const dataGridColumns = [
  { key: 'id', name: 'ID' },
  { key: 'start', name: 'Start DT', width: 200 },
  { key: 'min', name: 'Min (ms)' },
  { key: 'max', name: 'Max (ms)' },
  { key: 'mean', name: 'Mean (ms)' },
  { key: 'total', name: 'Total Duration (ms)' },
  { key: 'stddev', name: 'Std. Deviation (ms)' },
];

function assetPath(path: string): string {
  return join(nextConfig.basePath ?? '/', path)
}

export default function Home() {
  const workerRef = useRef<Worker>()
  const [result, setResult] = useState<({ measurement: Measurement, startDateTime: Date})[]>([])
  const [ applicationState, setApplicationState] = useState<'idle' | 'running_main' | 'running_worker'>('idle')  

  useEffect(() => {
    workerRef.current = new Worker(assetPath('/workers/test.js?ts=' + new Date().getTime()), {
      type: 'module',
    })
    workerRef.current.onmessage = (event) => {
      console.log('Message received from worker:', event.data)

      setResult((prevResult) => {
        const { startTime, duration } = event.data
        const newMeasurement = {
          min: -1,
          max: -1,
          mean: -1,
          totalDuration: duration,
          standardDeviation: 0,
        } as Measurement
        
        return [...prevResult, {
          measurement: newMeasurement,
          startDateTime: new Date(new Date().getTime() - startTime)
        }];
      });

      setApplicationState('idle')
    }

    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error.message, error)
    }
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  const mainThreadPerformanceTest = async (event: SyntheticEvent) => {
    event.preventDefault();

    setTimeout(async () => {
      const startDateTime = new Date()
      const runResult = await runPerformanceTests(numberOfTests, iterations)
      
      const newResult = [...result, {
        measurement: runResult,
        startDateTime,
      }];

      setResult(newResult)
      setApplicationState('idle')
    }, 2000)

    setApplicationState('running_main')
  }

  const webWorkerPerformanceTest = (event: SyntheticEvent, workerRef?: Worker) => {
    event.preventDefault();

    if(!workerRef) {
      return alert('Worker not ready');
    }

    setApplicationState('running_worker')

    workerRef.postMessage({
      numberOfTests,
      iterations,
    })
  }

  const rows = result.map((value, index) => ({
    id: index,
    start: value.startDateTime.toISOString(),
    min: value.measurement.min,
    max: value.measurement.max,
    mean: value.measurement.mean,
    total: value.measurement.totalDuration,
    stddev: value.measurement.standardDeviation,
  }))

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src={assetPath("/next.svg")}
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p>
          Testing the Expression Core library.
        </p>
        <p>The buttons below will create a data structure with {numberOfTests} ABL conditions that will be run {iterations} times.</p>

        <div className={styles.ctas}>
          {/* <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src={assetPath("/vercel.svg")}
              alt=""
              width={20}
              height={20}
            />
            Run tests using web worker
          </a> */}
          <button className={styles.primary} onClick={(event) => webWorkerPerformanceTest(event, workerRef.current)}>
            {applicationState === 'running_worker' ? "🟢 Running tests..." : "Run tests using web worker"}
          </button>
          <button
            className={styles.secondary}
            onClick={(event) => mainThreadPerformanceTest(event)}
          >
            {applicationState === 'running_main' ? "🟢 Running tests..." :  "▶ Run tests in main thread"}
          </button>
        </div>
        <div>
          <h2>Performance Results from last run</h2>
          <DataGrid style={{width: "100%"}} columns={dataGridColumns} rows={rows} />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

