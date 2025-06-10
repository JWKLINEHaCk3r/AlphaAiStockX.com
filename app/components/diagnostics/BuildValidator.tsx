"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface BuildValidatorProps {
  onValidationComplete: (isValid: boolean) => void
}

const BuildValidator: React.FC<BuildValidatorProps> = ({ onValidationComplete }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const validateBuild = async () => {
      try {
        // Check if npm is installed
        const npmCheck = await runCommand("npm", ["-v"])
        if (!npmCheck.success) {
          setErrorMessage("npm is not installed. Please install npm to proceed.")
          setIsValid(false)
          return
        }

        // Check if node_modules exists
        if (!(await fileExists("node_modules"))) {
          setErrorMessage("node_modules folder does not exist. Please run `npm install` to install dependencies.")
          setIsValid(false)
          return
        }

        // Check if package-lock.json exists
        if (!(await fileExists("package-lock.json"))) {
          setErrorMessage("package-lock.json does not exist. Please run `npm install` to generate it.")
          setIsValid(false)
          return
        }

        // Validate build command
        const packageJson = await readPackageJson()
        if (!packageJson.scripts || !packageJson.scripts.build) {
          setErrorMessage('Build script is not defined in package.json. Please add a "build" script.')
          setIsValid(false)
          return
        }

        // Run build command
        const buildResult = await runCommand("npm", ["run", "build"])
        if (!buildResult.success) {
          setErrorMessage(`Build failed. Error: ${buildResult.error}`)
          setIsValid(false)
          return
        }

        setIsValid(true)
        setErrorMessage(null)
      } catch (error: any) {
        setIsValid(false)
        setErrorMessage(`An unexpected error occurred: ${error.message}`)
      }
    }

    validateBuild().then(() => {
      if (isValid !== null) {
        onValidationComplete(isValid)
      }
    })
  }, [onValidationComplete, isValid])

  // Helper functions (moved outside useEffect for clarity)
  const runCommand = async (
    command: string,
    args: string[],
  ): Promise<{ success: boolean; output?: string; error?: string }> => {
    try {
      const process = Deno.run({
        cmd: [command, ...args],
        stdout: "piped",
        stderr: "piped",
      })

      const { code } = await process.status()
      const rawOutput = await process.output()
      const rawError = await process.stderrOutput()

      const output = new TextDecoder().decode(rawOutput)
      const error = new TextDecoder().decode(rawError)

      process.close()

      return { success: code === 0, output, error }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const fileExists = async (path: string): Promise<boolean> => {
    try {
      await Deno.stat(path)
      return true
    } catch (error) {
      return false
    }
  }

  const readPackageJson = async (): Promise<any> => {
    try {
      const file = await Deno.readTextFile("package.json")
      return JSON.parse(file)
    } catch (error: any) {
      throw new Error(`Failed to read package.json: ${error.message}`)
    }
  }

  return (
    <div>
      {isValid === null && <p>Validating build...</p>}
      {isValid === true && <p style={{ color: "green" }}>Build validation successful!</p>}
      {isValid === false && <p style={{ color: "red" }}>Build validation failed: {errorMessage}</p>}
    </div>
  )
}

export default BuildValidator
