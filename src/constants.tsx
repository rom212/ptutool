export const MODELS = [
  {
    name: "GPT4_8K",
    costInput: "0.03",
    costOutput: "0.06",
    lowRange: "24000",
    midRange: "48000",
    highRange: "72000",
    increment: "100",
    displayName: "GPT4 (8K)",
  },
  {
    name: "GPT4_32K",
    costInput: "0.06",
    costOutput: "0.12",
    lowRange: "36000",
    midRange: "72000",
    highRange: "108000",
    increment: "200",
    displayName: "GPT4 (32K)",
  },
  {
    name: "GPT4_TURBO_80K",
    costInput: "0.01",
    costOutput: "0.03",
    lowRange: "112000",
    midRange: "256000",
    highRange: "400000",
    increment: "100",
    displayName: "GPT4 Turbo (80K)",
  },
  {
    name: "GPT35_TURBO_16K",
    costInput: "0.0005",
    costOutput: "0.0015",
    lowRange: "112000",
    midRange: "221000",
    highRange: "330000",
    increment: "50",
    displayName: "GPT3.5 Turbo (16K)",
  },
  {
    name: "GPT4_o",
    costInput: "0.005",
    costOutput: "0.015",
    lowRange: "112000",
    midRange: "256000",
    highRange: "400000",
    increment: "50",
    displayName: "GPT4 o",
  },
];

export const DEFAULT_DATA = [
  {
    TPM: 0,
    "PTU Cost": 0,
    "PayGo Cost": 0,
  },
  {
    TPM: 1,
    "PTU Cost": 31200,
    "PayGo Cost": 0,
  },
  {
    TPM: 48000,
    "PTU Cost": 31200,
    "PayGo Cost": 78840,
  },
  {
    TPM: 48001,
    "PTU Cost": 62400,
    "PayGo Cost": 78840,
  },
  {
    TPM: 96000,
    "PTU Cost": 62400,
    "PayGo Cost": 157680,
  },
  {
    TPM: 96001,
    "PTU Cost": 93600,
    "PayGo Cost": 157680,
  },
  {
    TPM: 144000,
    "PTU Cost": 93600,
    "PayGo Cost": 236520,
  },
  {
    TPM: 144001,
    "PTU Cost": 124800,
    "PayGo Cost": 236520,
  },
  {
    TPM: 192000,
    "PTU Cost": 124800,
    "PayGo Cost": 315360,
  },
  {
    TPM: 192001,
    "PTU Cost": 156000,
    "PayGo Cost": 315360,
  },
  {
    TPM: 240000,
    "PTU Cost": 156000,
    "PayGo Cost": 394200,
  },
  {
    TPM: 240001,
    "PTU Cost": 187200,
    "PayGo Cost": 394200,
  },
  {
    TPM: 288000,
    "PTU Cost": 187200,
    "PayGo Cost": 473040,
  },
  {
    TPM: 288001,
    "PTU Cost": 218400,
    "PayGo Cost": 473040,
  },
];
