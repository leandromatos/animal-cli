# ANIMAL CLI

> [!NOTE]
> This project is a proof-of-concept (POC) to showcase the architecture and design of a CLI application using TypeScript, Commander, and the Inverse of Control (IoC) and Dependency Injection (DI) patterns using the [Provider Manager](https://github.com/leandromatos/provider-manager).

A modular command-line application that provides various animal-themed greeting services, built on a dependency injection architecture. This project demonstrates a well-structured CLI application with configuration management and modular design.

## Features

- Modular architecture with dependency injection
- Configuration management supporting multiple file formats
- Extensible command-line interface
- Customizable verbosity and emoji outputs
- Comprehensive testing setup

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd cli-poc

# Install dependencies
yarn install

# Link the CLI globally (optional)
yarn link
```

## Usage

The ANIMAL CLI provides several commands for interacting with different animal services.

### Help Command

To see all available commands and options:

```bash
# Display help information
yarn animal-cli --help

# Display help for a specific command
yarn animal-cli cat:hello --help
```

### Running Commands Locally

These commands run directly from the project directory:

```bash
# Cat greeting
yarn animal-cli cat:hello

# Dog greeting
yarn animal-cli dog:hello

# Bird greeting
yarn animal-cli bird:hello
```

### Running Commands Globally

After linking the CLI with `yarn link`, you can run commands from anywhere:

```bash
# Cat greeting
animal-cli cat:hello

# Dog greeting
animal-cli dog:hello

# Bird greeting
animal-cli bird:hello
```

The difference between local and global commands:

- **Local commands** (`yarn animal-cli <command>`) - Run within the project directory using the local package
- **Global commands** (`animal-cli <command>`) - Run from anywhere after linking with `yarn link`, using the globally linked package

### Configuration Options

You can customize the CLI behavior with these flags:

```bash
# Enable verbose logging
yarn animal-cli cat:hello --verbose

# Enable emoji output
yarn animal-cli dog:hello --emoji

# Combine options
yarn animal-cli bird:hello --verbose --emoji

# Use custom configuration file
yarn animal-cli cat:hello --config ./custom-config.js
```

## Configuration

The CLI supports configuration via JavaScript, JSON, or module files.

### Default Configuration

```js
{
  verbose: false,
  emoji: false
}
```

### Custom Configuration File

Create a file named `cli.config.js`, `cli.config.mjs`, `cli.config.cjs`, or `cli.config.json` in your project root:

```js
// cli.config.js
export default {
  verbose: true,
  emoji: true,
}
```

## Architecture

The application is built using a modular architecture based on dependency injection:

- **[Provider Manager](https://github.com/leandromatos/provider-manager)**: Central DI container handling service registration and resolution
- **Modules**: Self-contained feature units that register their services
- **Configuration Management**: Handles loading, merging and accessing configurations

## Development

### Building the Project

```bash
# Clean, compile and resolve aliases
yarn build

# Run the CLI during development
yarn animal-cli
```

### Adding New Features

To create a new animal module:

1. Create a new directory in `src/modules/`
2. Implement a service, controller, and module registration
3. Register the module in `src/cli.ts`
4. Add appropriate commands to the CLI program

## Testing

The project uses Vitest for testing:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:cov

# Run tests with UI
yarn test:ui

# Watch mode
yarn test:watch
```

## License

This project is licensed under the MIT License.
