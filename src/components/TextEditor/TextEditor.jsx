import React, { useState } from "react";
import PropTypes from "prop-types";
import Window from "../Window";
import { Textarea } from "../Input/Input";
import { getFile, saveFile, deleteFile } from "../../utils/filesystem";
import "./style.scss";
import Icon from "../Icon";
import { useWindows } from "../../providers/windowManager";
const TextEditor = ({ id, fileRoute = "" }) => {
  const file = getFile(fileRoute);
  const [text, setText] = useState(file.text);
  const { closeWindow } = useWindows();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const saveFileChanges = () => {
    saveFile(fileRoute, { ...file, text: text });
    closeWindow(id, true);
  };

  const deleteTextfile = () => {
    deleteFile(fileRoute);
    closeWindow(id, true);
  };

  return (
    <Window name={`Text editor (${fileRoute})`} id={id}>
      <div className="text-editor">
        <div className="text-editor-actions">
          <div className="action" onClick={saveFileChanges}>
            <Icon name="save"></Icon> Save
          </div>
          <div className="action" onClick={deleteTextfile}>
            <Icon name="times"></Icon> Delete
          </div>
        </div>
        <div className="text-editor-field">
          <Textarea value={text} onChange={handleTextChange}></Textarea>
        </div>
      </div>
    </Window>
  );
};
TextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  fileRoute: PropTypes.string,
};

export default TextEditor;
