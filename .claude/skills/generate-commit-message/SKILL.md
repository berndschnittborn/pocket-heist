---
name: generate-commit-message
description: Generate semantic commit messages based on staged git changes
disable-model-invocation: true
allowed-tools:
  - Bash(git *)
---

# Generate Commit Message Skill

You are tasked with analyzing staged git changes and generating a semantic commit message.

## Staged Changes

### Changed Files
```
!`git diff --staged --name-only`
```

### Change Statistics
```
!`git diff --staged --stat`
```

### Full Diff
```
!`git diff --staged`
```

## Instructions

Analyze the staged changes above and generate a commit message following the **Semantic Commit Convention**.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

### Type
Choose the most appropriate type:
- **feat**: New feature or functionality
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without changing functionality
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, build config, etc.)

### Scope (optional)
Provide context about what part of the codebase is affected:
- For changes in `app/(public)/` or `app/(dashboard)/`: use route name (e.g., `login`, `heists`, `signup`)
- For changes in `components/`: use component name (e.g., `Navbar`, `HeistCard`)
- For changes in `tests/`: use tested component/feature name
- For changes in config files: use config type (e.g., `vitest`, `tailwind`)

### Subject
- Use imperative mood ("add" not "added" or "adds")
- Start with lowercase
- No period at the end
- Maximum 50 characters
- Clearly describe WHAT changed

### Body (optional)
Include a body when:
- The changes are complex or non-obvious
- Multiple files are affected
- Context or reasoning would help future developers

Body guidelines:
- Explain WHY the change was made, not WHAT (the diff shows what)
- Wrap at 72 characters
- Separate from subject with a blank line
- Can include multiple paragraphs
- Can include bullet points with `-` or `*`

## Next.js Specific Patterns

This is a Next.js 16 project with:
- **App Router** with route groups: `(public)` and `(dashboard)`
- **Tailwind CSS 4** for styling
- **CSS Modules** for component-specific styles
- **Vitest** for testing

Consider these patterns when determining type and scope:
- New route/page → `feat(route-name)`
- Component updates → `feat(component-name)` or `fix(component-name)`
- Styling changes → `style(component-name)` or `style(page-name)`
- Test additions → `test(component-name)`
- Config changes → `chore(config-type)`

## Examples

### Example 1: New Feature
```
feat(heists): add filter functionality to heist list

Implement client-side filtering for active, assigned, and expired heists.
Adds filter buttons and updates HeistsPage component to support dynamic
filtering based on heist status.
```

### Example 2: Bug Fix
```
fix(navbar): correct logout button alignment on mobile

The logout button was overlapping with the menu icon on screens smaller
than 768px. Updated flexbox layout to prevent overlap.
```

### Example 3: Refactor
```
refactor(auth): migrate login page to new file structure

Move LoginPage component to components/LoginPage/ following the
established component structure pattern with barrel exports.
```

### Example 4: Simple Change
```
chore(deps): update tailwind to v4.1.2
```

### Example 5: Test Addition
```
test(navbar): add tests for mobile menu toggle
```

## Output

Provide:
1. A brief analysis of what changed (2-3 sentences)
2. The recommended commit message in a code block
3. If applicable, an alternative message if there are multiple valid interpretations

Do NOT execute any git commands. Only analyze and suggest the message.
