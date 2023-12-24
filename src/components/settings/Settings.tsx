import { FC, ReactNode, useRef, useState, ChangeEvent, FormEvent } from "react";

import { GPT4_32K, GPT4_8K } from "../../constants";
import { datapoint } from "../../types";

import styles from "./Settings.module.css";

type Props = {
  children?: ReactNode;
  setData: (data: datapoint[]) => void;
};

enum Models {
  gpt4_8k = "GPT4 (8K)",
  gpt4_32k = "GPT4 (32K)",
}

const Settings: FC<Props> = ({ setData }) => {
  const costInputRef = useRef<HTMLInputElement>(null);
  const costOutputRef = useRef<HTMLInputElement>(null);
  const inputOutputRatioRef = useRef<HTMLInputElement>(null);
  const expectedTPMRef = useRef<HTMLInputElement>(null);
  const ptuCostRef = useRef<HTMLInputElement>(null);
  const monthlyMinutesRef = useRef<HTMLInputElement>(null);

  const [currentModel, setCurrentModel] = useState<Models>(Models.gpt4_8k);

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

  const [expectedTPM, setExpectedTPM] = useState<string>(midRange as string);

  const handleClickGPT48k = () => {
    setCurrentModel(Models.gpt4_8k);
    if (costInputRef.current) {
      costInputRef.current.value = GPT4_8K.costInput;
    }
    if (costOutputRef.current) {
      costOutputRef.current.value = GPT4_8K.costOutput;
    }
    setExpectedTPM(GPT4_8K.midRange);
  };

  const handleClickGPT432k = () => {
    setCurrentModel(Models.gpt4_32k);
    if (costInputRef.current) {
      costInputRef.current.value = GPT4_32K.costInput;
    }
    if (costOutputRef.current) {
      costOutputRef.current.value = GPT4_32K.costOutput;
    }
    setExpectedTPM(GPT4_32K.midRange);
  };

  const handleSlideTPM = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setExpectedTPM(e.target.value);
  };

  const handleSlideInputOutputRatio = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputOutputRatio(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = [];
    for (let i = 0; i < 7; i++) {
      const tokensPerMonth =
        +monthlyMinutesRef.current!.value * i * +expectedTPMRef.current!.value;

      const payGoInputCost =
        (tokensPerMonth / 1000) *
        (+inputOutputRatioRef.current!.value / 100) *
        +costInputRef.current!.value;

      const payGoOutputCost =
        (tokensPerMonth / 1000) *
        (1 - +inputOutputRatioRef.current!.value / 100) *
        +costOutputRef.current!.value;

      const payGoCost = payGoInputCost + payGoOutputCost;

      data.push({
        TPM: i * +expectedTPMRef.current!.value,
        "PTU Cost": i * +ptuCostRef.current!.value * 100,
        "PayGo Cost": payGoCost,
      });
      data.push({
        TPM: i * +expectedTPMRef.current!.value + 1,
        "PTU Cost": (i + 1) * +ptuCostRef.current!.value * 100,
        "PayGo Cost": payGoCost,
      });
    }
    setData(data);
    console.log("DATA : ", data);
  };

  return (
    <div className={styles.container}>
      <h2>{`Selected Model: ${currentModel}`}</h2>
      <form onSubmit={handleFormSubmit}>
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
            id="InputOutputRatio"
            name="InputOutputRatio"
            value={InputOutputRatio}
            onChange={handleSlideInputOutputRatio}
            ref={inputOutputRatioRef}
          />
          <span>{`${InputOutputRatio}%`}</span>
        </div>
        <label htmlFor="expectedTPM">Expected TPM for 100 PTU:</label>
        <div>
          <input
            type="range"
            min={lowRange}
            max={highRange}
            id="expectedTPM"
            name="expectedTPM"
            value={expectedTPM}
            onChange={handleSlideTPM}
            ref={expectedTPMRef}
          />
          <span>{expectedTPM}</span>
        </div>
        <label htmlFor="TPUCost">Cost in $ per TPU:</label>
        <input
          type="text"
          id="TPUCost"
          name="TPUCost"
          defaultValue={312}
          ref={ptuCostRef}
        />
        <label htmlFor="monthlyMinutes">Minutes of usage per month:</label>
        <input
          type="text"
          id="monthlyMinutes"
          name="monthlyMinutes"
          defaultValue={43800}
          ref={monthlyMinutesRef}
        />
        <div className={styles.presets}>
          <h2>Presets:</h2>
          <button type="button" onClick={handleClickGPT48k}>
            GPT-4 (8K)
          </button>
          <button type="button" onClick={handleClickGPT432k}>
            GPT-4 (32K)
          </button>
        </div>
        <div className={styles.visualize}>
          <button type="submit">Update Graph</button>
        </div>
      </form>
      <a
        href={
          "mailto:romanmullier@microsoft.com?subject=Feedback on the PTU/PAYGO price comparison tool"
        }
      >
        Send feedback email
      </a>
    </div>
  );
};

export default Settings;
