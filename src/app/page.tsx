"use client"

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Measurement } from "kelonio";
import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';

import Image from "next/image";
import styles from "./page.module.css";
import { runPerformanceTests } from "./logic";
//   import SurveyLogic from '@sm/survey-logic'
// import { sample1 as surveyQuestions } from "./sample-data/questions";
// import { sample1 as responseData } from './sample-data/responses';
// import { contactAndQuestion } from "./contactAndQuestion";

const dataGridColumns = [
  { key: 'id', name: 'ID' },
  { key: 'start', name: 'Start DT', width: 200 },
  { key: 'min', name: 'Min (ms)' },
  { key: 'max', name: 'Max (ms)' },
  { key: 'mean', name: 'Mean (ms)' },
  { key: 'total', name: 'Total Duration (ms)' },
  { key: 'stddev', name: 'Std. Deviation (ms)' },
];

export default function Home() {
  const workerRef = useRef<Worker>()
  const [result, setResult] = useState<({ measurement: Measurement, startDateTime: Date})[]>([])
  
  useEffect(() => {
    workerRef.current = new Worker('/workers/test.js?ts=' + new Date().getTime(), {
      type: 'module',
    })
    workerRef.current.onmessage = (event) => {
      console.log('Message received from worker:', event.data)
    }
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error.message, error)
    }

    workerRef.current.postMessage('Hello from main script!')
    
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate()
      }
    }
  }, [])

  const mainThreadPerformanceTest = async (event: SyntheticEvent) => {
    event.preventDefault();

    const startDateTime = new Date()
    const runResult = await runPerformanceTests(10)
    
    const newResult = [...result, {
      measurement: runResult,
      startDateTime,
    }];

    setResult(newResult)
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
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p>
          Testing the expr library.
        </p>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Run tests using web worker
          </a>
          <button
            className={styles.secondary}
            onClick={(event) => mainThreadPerformanceTest(event)}
          >
            Run tests in main thread
          </button>
        </div>
        <div>
          <h2>Performance Results from last run</h2>
          <DataGrid style={{width: "100%"}} columns={dataGridColumns} rows={rows} />
        </div>
      </main>
      <footer className={styles.footer}>
        Build on {new Date().getFullYear()}
      </footer>
    </div>
  );
}
