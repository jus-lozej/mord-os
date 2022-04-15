import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import Window from "../Window";
import Button from "../Button/Button";
import { saveFile } from "../../utils/filesystem";
import { useWindows } from "../../providers/windowManager";

const CreateFileWindow = ({ id, route, file, callback = () => {} }) => {
  const [name, setName] = useState("");

  const { closeWindow } = useWindows();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const confirmName = () => {
    saveFile(route + "/" + name, file);
    callback();
    closeWindow(id, true);
  };

  return (
    <Window name="Select a file name" id={id} size="mini" autoClose={true}>
      <div className="naming">
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="name"
        ></Input>
        <Button onClick={confirmName}>Confirm</Button>
      </div>
    </Window>
  );
};
CreateFileWindow.propTypes = {
  id: PropTypes.string,
  route: PropTypes.string,
  file: PropTypes.object,
  callback: PropTypes.func,
};

export default CreateFileWindow;
