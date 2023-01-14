import { SetStateAction, Dispatch, FormEvent, useState } from "react";
import { TableContents } from "../Table/Table";

interface AlertModalProps {
  useContents: Dispatch<SetStateAction<TableContents>>;
}

export default function AlertModal({ useContents }: AlertModalProps) {
  const [alert, setAlert] = useState("");

  function onSubmitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAlert = {
      alert,
      status: "",
      updates: [],
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContents((prevState: TableContents) => {
      return {
        ...prevState,
        rowContents: [...prevState.rowContents, newAlert],
      };
    });
    setAlert("");
  }

  return (
    <form data-testid="form" onSubmit={onSubmitEvent}>
      <label> Add new alert: </label>
      <input
        type="text"
        id="alert"
        name="alert"
        value={alert}
        onChange={(e) => setAlert(e.target.value)}
      />
      <button type="submit"> Add </button>
    </form>
  );
}
