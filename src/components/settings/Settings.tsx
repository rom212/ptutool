import { FC, ReactNode, useRef, useState, ChangeEvent } from "react";

import { GPT4_32K, GPT4_8K } from "../../constants";

import styles from "./Settings.module.css";

type Props = {
  children?: ReactNode;
};

enum Models {
  gpt4_8k = "GPT4 (8K)",
  gpt4_32k = "GPT4 (32K)",
}

const Settings: FC<Props> = () => {
  const costInputRef = useRef<HTMLInputElement>(null);
  const costOutputRef = useRef<HTMLInputElement>(null);

  const [currentModel, setCurrentModel] = useState<Models>(Models.gpt4_8k);
  const [expectedTPM, setExpectedTPM] = useState<string>("48000");
  const [InputOutputRatio, setInputOutputRatio] = useState<string>("75");

  let lowRange;
  let highRange;
  let midRange;

  if (currentModel === Models.gpt4_8k) {
    lowRange = GPT4_8K.lowRange;
    highRange = GPT4_8K.highRange;
    midRange = GPT4_8K.midRange;
  } else if (currentModel === Models.gpt4_32k) {
    lowRange = GPT4_32K.lowRange;
    highRange = GPT4_32K.highRange;
    midRange = GPT4_32K.midRange;
  }

  const handleClickGPT48k = () => {
    setCurrentModel(Models.gpt4_8k);
    if (costInputRef.current) {
      costInputRef.current.value = GPT4_8K.costInput;
    }
    if (costOutputRef.current) {
      costOutputRef.current.value = GPT4_8K.costOutput;
    }
  };

  const handleClickGPT432k = () => {
    setCurrentModel(Models.gpt4_32k);
    if (costInputRef.current) {
      costInputRef.current.value = GPT4_32K.costInput;
    }
    if (costOutputRef.current) {
      costOutputRef.current.value = GPT4_32K.costOutput;
    }
  };

  const handleSlideTPM = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setExpectedTPM(e.target.value);
  };

  const handleSlideInputOutputRatio = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputOutputRatio(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>{`Selected Model: ${currentModel}`}</h2>
      <form>
        <label htmlFor="costInput">Cost in $ for 1k input tokens:</label>
        <input
          type="text"
          id="costInput"
          name="costInput"
          ref={costInputRef}
          defaultValue={0.03}
        />
        <label htmlFor="costOutput">Cost in $ for 1k output tokens:</label>
        <input
          type="text"
          id="costOutput"
          name="costOutput"
          defaultValue={0.06}
          ref={costOutputRef}
        />
        <label htmlFor="InputOutputRatio">
          Input token to output token ratio:
        </label>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={InputOutputRatio}
            id="InputOutputRatio"
            name="InputOutputRatio"
            value={InputOutputRatio}
            onChange={handleSlideInputOutputRatio}
          />
          <span>{`${InputOutputRatio}%`}</span>
        </div>
        <label htmlFor="expectedTPM">Expected TPM for 100 PTU:</label>
        <div>
          <input
            type="range"
            min={lowRange}
            max={highRange}
            defaultValue={midRange}
            id="expectedTPM"
            name="expectedTPM"
            value={expectedTPM}
            onChange={handleSlideTPM}
          />
          <span>{expectedTPM}</span>
        </div>
        <label htmlFor="TPUCost">Cost in $ per TPU:</label>
        <input type="text" id="TPUCost" name="TPUCost" defaultValue={312} />
        <label htmlFor="monthlyMinutes">Minutes of usage per month:</label>
        <input
          type="text"
          id="monthlyMinutes"
          name="monthlyMinutes"
          defaultValue={43800}
        />
      </form>
      <div className={styles.presets}>
        <h2>Presets:</h2>
        <button onClick={handleClickGPT48k}>GPT-4 (8K)</button>
        <button onClick={handleClickGPT432k}>GPT-4 (32K)</button>
      </div>
    </div>
  );
};

export default Settings;
