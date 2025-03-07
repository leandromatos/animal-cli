import { defaultConfig } from '@/core/config/default.config'
import { Config } from '@/core/config/types'
import { ConfigReader } from '@/core/config-reader'
import { LoggerService } from '@/core/log/log.service'

/**
 * Manages the configuration for the application
 */
export class ConfigManager {
  private static instance: ConfigManager
  private readonly defaultConfig: Config = defaultConfig
  private readonly configReader: ConfigReader = new ConfigReader()
  private readonly logger: LoggerService = new LoggerService('ConfigManager')
  private config: Config = this.defaultConfig

  /**
   * Retrieves the singleton instance of ConfigManager
   * @returns {ConfigManager} The singleton instance
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) ConfigManager.instance = new ConfigManager()

    return ConfigManager.instance
  }

  /**
   * Loads the config from a file and command line options.
   * @param commandOptions - Options from the command line
   * @param configPath - Optional explicit path to a config file
   */
  async load(commandOptions: Partial<Config>, configPath?: string): Promise<void> {
    try {
      if (!configPath) {
        const rootPath = this.configReader.findRootConfigFile()
        if (rootPath) configPath = rootPath
      }
      if (!configPath) throw new Error('No config file path provided')
      const configFromFile = await this.configReader.readConfigFile(configPath)
      this.config = { ...this.defaultConfig, ...configFromFile, ...commandOptions }
      if (this.config.verbose) {
        this.logger.log('Loaded config from %s.', configPath)
        this.logger.log('Config: %o', this.config)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.config = { ...this.defaultConfig, ...commandOptions }
      if (this.config.verbose) {
        this.logger.log('Failed to load config: %s.', errorMessage)
        this.logger.log('Using default config instead.')
      }
    }
  }

  /**
   * Retrieves a config value by key.
   * @template T
   * @param key - The config key to retrieve.
   * @returns The config value if found, otherwise undefined.
   */
  get<T>(key: keyof Config): T | undefined {
    const configValue = this.config[key]
    if (configValue === undefined) {
      this.logger.log(`Config value for key '%s' not found`, key)

      return undefined
    }

    return configValue as T
  }
}
