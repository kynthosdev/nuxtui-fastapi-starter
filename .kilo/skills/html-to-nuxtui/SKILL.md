---
name: html-to-nuxtui
description: Converts raw HTML markup snippets into fully functional, accessible Vue 3 components built with Nuxt UI and Tailwind CSS. Use when the user provides HTML or code wireframes and asks to "convert to nuxt ui", "make a vue component using nuxtui", or "refactor this HTML into nuxt components".
------

# HTML to Nuxt UI Converter

This skill transforms standard HTML into highly optimized Vue 3 components utilizing the `@nuxt/ui` component library, modern TypeScript, and Tailwind CSS.

## 🛠️ Tool Integration (Nuxt UI MCP)

Prior to performing any conversion, always check if the **Nuxt UI MCP Server** is available in the current environment.

1. **MCP Discovery**: Search the MCP registry or active tools for `nuxtui` or `nuxt-ui` helper tools.
2. **Component Verification**: Use the MCP tool to look up the exact props, slots, and configuration options for target components (e.g., `UButton`, `UInput`, `UModal`).
3. **Fallback**: If the MCP server is unavailable, default to the standard Nuxt UI v3 documentation schema, ensuring components use native props instead of raw Tailwind utility classes where applicable.

## 📐 Best Practices & Architecture

### 1. Script Setup & TypeScript
* Always use `<script setup lang="ts">`.
* Explicitly type all reactive states, component props (`defineProps`), and events (`defineEmits`).
* Use `ref()` for primitive types and `reactive()` for deeply nested objects or form data.

### 2. Semantic Component Mapping
* Map structural layout elements to design-system equivalents:
  * Forms → `<UForm>` with a schema-backed reactive state.
  * Inputs → `<UInput>`, `<UTextarea>`, `<UCheckbox>`, `<URadioGroup>`.
  * Lists/Dropdowns → `<USelectMenu>` or `<UDropdown>`.
  * Layout Containers → `<UCard>`, `<UContainer>`.
* Leverage Nuxt UI native props (`color`, `size`, `variant`, `icon`) instead of rewriting them via Tailwind utility classes.

### 3. Form Validation (Zod)
* When converting `<form>` elements, always implement **Zod** schema validation.
* Bind the form state using `:state="state"` and validation using `:schema="schema"` on the `<UForm>` wrapper.

### 4. Accessibility (a11y)
* Ensure generated components maintain or improve original HTML accessibility.
* Map native attributes like `aria-label`, `required`, and `disabled` to their respective Nuxt UI component props.

**Constraints:**
*   Output only valid, compiling Vue 3 template and script code.
*   Strictly avoid placeholder functions or text; all event handlers (like `onSubmit`) must have a functional console log or basic state update.
*   Do not leave standard HTML structural layouts or input fields unmapped if a Nuxt UI replacement exists.
*   Ensure all generated code adheres to Nuxt 3 and Nuxt UI v3 best practices for maintainability and performance.

## Steps

1. Check for the availability of the **Nuxt UI MCP Server** tool in the current session. Use it to discover the exact specification of components needed for the target layout.
2. Parse the input HTML snippet to isolate layout blocks, forms, static components, typography classes, and interface elements.
3. Construct the `<script>` section. Import `z` from `zod` for forms, declare reactive states using `ref()` or `reactive()`, and implement necessary types or interfaces.
4. Convert the HTML structure inside the `<template>` block into semantic Nuxt UI wrapper elements and functional interactive components.
5. Review the final component structure against all **Development Guidelines** and verification checks before printing the final block.