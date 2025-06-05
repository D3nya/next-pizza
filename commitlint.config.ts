/*
Type:
  build: Changes that affect the build system or external dependencies
  chore: Used for miscellaneous changes that don't affect the main codebase(configuring development tools, setting up project-specific settings)
  ci: Changes to our CI configuration files and scripts
  docs: Documentation only changes
  feat: A new feature
  fix: A bug fix
  perf: A code change that improves performance
  refactor: A code change that neither fixes a bug nor adds a feature
  style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  test: Adding missing tests or correcting existing tests
  translation: Changes related to translations or language localization. This includes adding or updating translations in the codebase.
  security: Changes that address security vulnerabilities, implement security measures, or enhance the overall security of the codebase.
Scope:
  setup: Project setup
  config: Configuration files
  deps: Dependency updates
  feature: Feature-specific changes
  bug: Bug fixes
  docs: Documentation
  style: Code style/formatting
  refactor: Code refactoring
  test: Tests
  build: Build scripts or configuration
  ci: Continuous integration
  release: Release related changes
  other: Other changes
Format:
  <type>(optional-scope): <short description>
Example:
  feat(cart): add removeItem button
*/

import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
};

export default Configuration;
