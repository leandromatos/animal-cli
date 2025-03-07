import { existsSync } from 'fs'
import { readFile } from 'fs-extra'
import path from 'path'

import { Config } from '@/core/config/types'

/**
 * Provides functionality to read and parse configuration files from various formats.
 */
export class ConfigReader {
  /**
   * Reads a config file from the provided file path.
   * Supports multiple file types including .json, .js, .cjs, and .mjs.
   *
   * @template T - The type of configuration to return
   * @param filePath - The path to the config file
   * @returns A promise that resolves with the config object
   * @throws Error if the file cannot be read or parsed
   */
  async readConfigFile<T extends Config = Config>(filePath: string): Promise<T> {
    try {
      const ext = path.extname(filePath)
      if (this.isJsonFile(ext)) return await this.readJsonFile<T>(filePath)

      return await this.importJsModule<T>(filePath)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  /**
   * Determines if a file is a JSON file based on its extension.
   *
   * @param extension - The file extension to check
   * @returns True if the file is a JSON file
   */
  private isJsonFile(extension: string): boolean {
    return extension === '.json'
  }

  /**
   * Reads and parses a JSON file.
   *
   * @template T - The type of configuration to return
   * @param filePath - Path to the JSON file
   * @returns Parsed JSON content
   * @throws Error if the file cannot be read or parsed
   */
  private async readJsonFile<T>(filePath: string): Promise<T> {
    const data = await readFile(filePath, 'utf8')

    return JSON.parse(data) as T
  }

  /**
   * Imports a JavaScript module.
   *
   * @template T - The type of configuration to return
   * @param filePath - Path to the module file
   * @returns The exported configuration
   * @throws Error if the module cannot be imported
   */
  private async importJsModule<T>(filePath: string): Promise<T> {
    try {
      const imported = await import(filePath)
      const config = imported.default || imported

      return config as T
    } catch (error) {
      console.error('Error importing module:', error)
      throw new Error(`Failed to import module ${filePath}: ${(error as Error).message}`)
    }
  }

  /**
   * Finds a config file at the project root with one of the supported extensions.
   *
   * @returns The path to the config file if found, otherwise undefined
   */
  public findRootConfigFile(): string | undefined {
    const possiblePaths = [
      `${process.cwd()}/animal-cli.config.js`,
      `${process.cwd()}/animal-cli.config.mjs`,
      `${process.cwd()}/animal-cli.config.cjs`,
      `${process.cwd()}/animal-cli.config.json`,
    ]

    return possiblePaths.find(path => existsSync(path))
  }
}
