export const configSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "@nuee/ui configuration",
  type: "object",
  required: ["aliases"],
  additionalProperties: false,
  properties: {
    $schema: { type: "string" },
    version: { type: "string", minLength: 1, description: "Installed foundation version." },
    components: {
      type: "object",
      propertyNames: { minLength: 1 },
      additionalProperties: { type: ["string", "null"], minLength: 1 },
      description: "Installed component versions; null means the source version is unknown.",
    },
    aliases: {
      type: "object",
      required: ["ui", "styles"],
      additionalProperties: false,
      properties: {
        ui: { type: "string", minLength: 1, default: "@/components/ui" },
        styles: { type: "string", minLength: 1, default: "@/styles" },
      },
    },
    accessibility: {
      type: "object",
      required: ["respectReducedMotion"],
      additionalProperties: false,
      properties: {
        respectReducedMotion: {
          type: "boolean",
          default: true,
          description: "Deprecated compatibility field. OS motion rules are always retained.",
        },
      },
    },
    theme: {
      type: "object",
      additionalProperties: false,
      description: "Generated defaults. Apply changes with nuee init --force.",
      properties: {
        density: {
          anyOf: [
            { type: "string", enum: ["default", "compact"] },
            { type: "number", exclusiveMinimum: 0, maximum: 2 },
          ],
          default: "default",
        },
        unit: { type: "string", enum: ["rem", "px"], default: "rem" },
        motion: {
          type: "string",
          enum: ["system", "off"],
          default: "system",
          description:
            "Follow OS reduced motion or disable motion. Runtime choices take precedence.",
        },
        fonts: {
          type: "object",
          additionalProperties: false,
          properties: {
            body: { type: "string", minLength: 1, description: "CSS font-family list." },
            heading: { type: "string", minLength: 1, description: "CSS font-family list." },
          },
        },
      },
    },
  },
} as const;
