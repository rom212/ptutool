import {
  FC,
  ReactNode,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";

import { MODELS } from "../../constants";
import { datapoint } from "../../types";

import styles from "./Settings.module.css";

type Props = {
  children?: ReactNode;
  setData: (data: datapoint[]) => void;
};

enum Models {
  GPT4_8K = "GPT4_8K",
  GPT4_32K = "GPT4_32K",
  GPT35_TURBO_4K = "GPT35_TURBO_4K",
  GPT35_TURBO_16K = "GPT35_TURBO_16K",
}

const Settings: FC<Props> = ({ setData }) => {
  const costInputRef = useRef<HTMLInputElement>(null);
  const costOutputRef = useRef<HTMLInputElement>(null);
  const inputOutputRatioRef = useRef<HTMLInputElement>(null);
  const expectedTPMRef = useRef<HTMLInputElement>(null);
  const ptuCostRef = useRef<HTMLInputElement>(null);
  const monthlyMinutesRef = useRef<HTMLInputElement>(null);
  const scalingIncrementSizeRef = useRef<HTMLInputElement>(null);

  const [currentModel, setCurrentModel] = useState<Models>(Models.GPT4_8K);

  const [InputOutputRatio, setInputOutputRatio] = useState<string>("75");

  const modelData = MODELS.find((item) => item.name === currentModel);

  const lowRange = modelData?.lowRange;
  const midRange = modelData?.midRange;
  const highRange = modelData?.highRange;

  const [expectedTPM, setExpectedTPM] = useState<string>(midRange as string);

  const [monthlyMinutes, setMonthlyMinutes] = useState<string>("43800");

  const handleModelChange = (newModel: Models) => {
    setCurrentModel(newModel);
  };

  useEffect(() => {
    if (costInputRef.current) {
      costInputRef.current.value = modelData?.costInput as string;
    }
    if (costOutputRef.current) {
      costOutputRef.current.value = modelData?.costOutput as string;
    }
    if (scalingIncrementSizeRef.current) {
      scalingIncrementSizeRef.current.value = modelData?.increment as string;
    }
    setExpectedTPM(modelData?.midRange as string);
  }, [modelData]);

  const handleSlideTPM = (e: ChangeEvent<HTMLInputElement>) => {
    setExpectedTPM(e.target.value);
  };

  const handleSlideInputOutputRatio = (e: ChangeEvent<HTMLInputElement>) => {
    setInputOutputRatio(e.target.value);
  };

  const handleSlideMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    setMonthlyMinutes(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = [];
    for (let i = 0; i < 8; i++) {
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
        "PTU Cost":
          i *
          +ptuCostRef.current!.value *
          +scalingIncrementSizeRef.current!.value,
        "PayGo Cost": payGoCost,
      });
      data.push({
        TPM: i * +expectedTPMRef.current!.value + 1,
        "PTU Cost":
          (i + 1) *
          +ptuCostRef.current!.value *
          +scalingIncrementSizeRef.current!.value,
        "PayGo Cost": payGoCost,
      });
    }
    setData(data);
  };

  return (
    <div className={styles.container}>
      <h2>{modelData?.displayName}</h2>
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
        <label htmlFor="TPUCost">Cost in $ per PTU:</label>
        <input
          type="text"
          id="TPUCost"
          name="TPUCost"
          defaultValue={312}
          ref={ptuCostRef}
        />
        <label htmlFor="scalingIncrementSize">
          Scaling increment size in PTU:
        </label>
        <input
          type="text"
          id="scalingIncrementSize"
          name="scalingIncrementSize"
          defaultValue={100}
          ref={scalingIncrementSizeRef}
          disabled
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
        <label htmlFor="expectedTPM">Expected TPM for the increment:</label>
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
        <label htmlFor="monthlyMinutes">Minutes of usage per month:</label>
        <div>
          <input
            type="range"
            min={0}
            max={43800}
            id="monthlyMinutes"
            name="monthlyMinutes"
            value={monthlyMinutes}
            onChange={handleSlideMinutes}
            ref={monthlyMinutesRef}
          />
          <span>{monthlyMinutes}</span>
        </div>
        <div className={styles.visualize}>
          <button type="submit">Update Graph</button>
        </div>
        <div className={styles.presets}>
          <h2>Presets:</h2>
          {MODELS.map((model) => {
            return (
              <button
                type="button"
                onClick={() => handleModelChange(model.name as Models)}
              >
                {model.displayName}
              </button>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default Settings;
