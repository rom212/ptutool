export const GPT4_8K = {
  costInput: "0.03",
  costOutput: "0.06",
  lowRange: "24000",
  midRange: "48000",
  highRange: "72000",
};

export const GPT4_32K = {
  costInput: "0.06",
  costOutput: "0.12",
  lowRange: "36000",
  midRange: "72000",
  highRange: "108000",
};

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
