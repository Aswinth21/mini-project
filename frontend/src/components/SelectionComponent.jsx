import React, { useState } from 'react';

const SelectionComponent = ({ onExamChange }) => {
  const [exam, setExam] = useState("");

  const CIAExam = () => {
    setExam("CIA");
    onExamChange("CIA");
  };

  const moduleExam = () => {
    setExam("Module");
    onExamChange("Module");
  };

  return (
    <div>
      <form>
        <button type="button" onClick={CIAExam}>CIA</button>
        <button type="button" onClick={moduleExam}>Module</button>
      </form>
    </div>
  );
};

export default SelectionComponent;
