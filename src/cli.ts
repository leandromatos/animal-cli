#!/usr/bin/env node

import 'reflect-metadata'

import { ProviderManager } from '@leandromatos/provider-manager'
import { cyan } from 'colorette'
import { Command } from 'commander'
import { textSync } from 'figlet'

import { ConfigManager } from '@/core/config-manager'
import { BirdController } from '@/modules/bird/bird.controller'
import { registerBirdModule } from '@/modules/bird/bird.module'
import { CatController } from '@/modules/cat/cat.controller'
import { registerCatModule } from '@/modules/cat/cat.module'
import { DogController } from '@/modules/dog/dog.controller'
import { registerDogModule } from '@/modules/dog/dog.module'
import { registerGlobalModule } from '@/modules/global/global.module'
import { CommandOptions } from '@/types'

/**
 * Main CLI class that handles command registration and execution
 */
class CLI {
  private providerManager: ProviderManager
  private program: Command

  /**
   * Creates a new CLI instance and initializes it
   */
  constructor() {
    this.providerManager = new ProviderManager()
    this.program = new Command()
    this.initialize()
  }

  /**
   * Runs the CLI application
   */
  run(): void {
    if (!process.argv.slice(2).length) this.program.help()
    this.program.parse(process.argv)
  }

  /**
   * Registers all modules with the provider manager
   * @returns {CLI} The CLI instance for method chaining
   */
  private registerModules(): CLI {
    registerGlobalModule(this.providerManager)
    registerBirdModule(this.providerManager)
    registerCatModule(this.providerManager)
    registerDogModule(this.providerManager)

    return this
  }

  /**
   * Sets up the CLI program with basic configuration
   * @returns {CLI} The CLI instance for method chaining
   */
  private setup(): CLI {
    console.log(cyan(textSync('ANIMAL CLI', { horizontalLayout: 'full' })))

    this.program
      .version('1.0.0')
      .description('ANIMAL CLI')
      .option('--config [path]', 'Path to configuration file')
      .option('--verbose', 'Enable verbose logging')
      .option('--emoji', 'Enable emoji on output')
      .hook('preAction', async thisCommand => {
        const { config, ...commandOptions } = thisCommand.opts<CommandOptions>()
        const configManager: ConfigManager = ConfigManager.getInstance()
        await configManager.load(commandOptions, config)
      })

    return this
  }

  /**
   * Registers all commands with the program
   * @returns {CLI} The CLI instance for method chaining
   */
  private registerCommands(): CLI {
    this.program
      .command('cat:hello')
      .description('Output a greeting from a cat')
      .action(() => {
        const catController = this.providerManager.get(CatController)
        catController.getHello()
      })

    this.program
      .command('dog:hello')
      .description('Output a greeting from a dog')
      .action(() => {
        const dogController = this.providerManager.get(DogController)
        dogController.getHello()
      })

    this.program
      .command('bird:hello')
      .description('Output a greeting from a bird')
      .action(() => {
        const birdController = this.providerManager.get(BirdController)
        birdController.getHello()
      })

    return this
  }

  /**
   * Configures error handling and default behavior for the CLI
   * @returns {CLI} The CLI instance for method chaining
   */
  private configureErrorHandling(): CLI {
    this.program.allowUnknownOption(false)

    this.program.exitOverride(error => {
      if (error.code !== 'commander.help') {
        process.exit(error.exitCode || 1)
      }
    })

    return this
  }

  /**
   * Initializes the CLI by setting up all required components
   * @returns {CLI} The CLI instance for method chaining
   * @private
   */
  private initialize(): CLI {
    return this.registerModules().setup().registerCommands().configureErrorHandling()
  }
}

// Create and run the CLI
const cli = new CLI()
cli.run()

export * from '@/core/config/types'
