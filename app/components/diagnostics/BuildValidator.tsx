'use client';

import type React from 'react';
import { useState, useEffect } from 'react';

interface BuildValidatorProps {
  onValidationComplete: (success: boolean) => void;
}

const BuildValidator: React.FC<BuildValidatorProps> = ({ onValidationComplete }) => {
  const [buildStatus, setBuildStatus] = useState<string>('idle');
  const [lintStatus, setLintStatus] = useState<string>('idle');
  const [testStatus, setTestStatus] = useState<string>('idle'); // Added test status

  useEffect(() => {
    const runBuild = async () => {
      setBuildStatus('running');
      try {
        const process = Deno.run({
          cmd: ['npm', 'run', 'build'], // Updated to npm
          stdout: 'piped',
          stderr: 'piped',
        });

        const { code } = await process.status();
        const stdout = new TextDecoder().decode(await process.output());
        const stderr = new TextDecoder().decode(await process.stderrOutput());

        console.log('Build stdout:', stdout);
        console.error('Build stderr:', stderr);

        if (code === 0) {
          setBuildStatus('success');
        } else {
          setBuildStatus('failure');
        }
        process.close();
      } catch (error) {
        console.error('Build failed:', error);
        setBuildStatus('failure');
      }
    };

    const runLint = async () => {
      setLintStatus('running');
      try {
        const process = Deno.run({
          cmd: ['npm', 'run', 'lint'], // Updated to npm
          stdout: 'piped',
          stderr: 'piped',
        });

        const { code } = await process.status();
        const stdout = new TextDecoder().decode(await process.output());
        const stderr = new TextDecoder().decode(await process.stderrOutput());

        console.log('Lint stdout:', stdout);
        console.error('Lint stderr:', stderr);

        if (code === 0) {
          setLintStatus('success');
        } else {
          setLintStatus('failure');
        }
        process.close();
      } catch (error) {
        console.error('Lint failed:', error);
        setLintStatus('failure');
      }
    };

    const runTests = async () => {
      setTestStatus('running');
      try {
        const process = Deno.run({
          cmd: ['npm', 'run', 'test'], // Assuming 'test' script exists, update if needed
          stdout: 'piped',
          stderr: 'piped',
        });

        const { code } = await process.status();
        const stdout = new TextDecoder().decode(await process.output());
        const stderr = new TextDecoder().decode(await process.stderrOutput());

        console.log('Test stdout:', stdout);
        console.error('Test stderr:', stderr);

        if (code === 0) {
          setTestStatus('success');
        } else {
          setTestStatus('failure');
        }
        process.close();
      } catch (error) {
        console.error('Test failed:', error);
        setTestStatus('failure');
      }
    };

    const runAllChecks = async () => {
      await runBuild();
      await runLint();
      await runTests(); // Run tests as part of the validation

      if (buildStatus === 'success' && lintStatus === 'success' && testStatus === 'success') {
        onValidationComplete(true);
      } else {
        onValidationComplete(false);
      }
    };

    runAllChecks();
  }, [onValidationComplete]);

  return (
    <div>
      <p>Build Status: {buildStatus}</p>
      <p>Lint Status: {lintStatus}</p>
      <p>Test Status: {testStatus}</p> {/* Display test status */}
    </div>
  );
};

export default BuildValidator;
