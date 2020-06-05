import * as React from "react";
import "./SectionTitle.less";
import Color from "../../widget/Color";

const SectionTitle = (props) => {
  return (
    <div className="sectionTitle">
      <div className="prefix" />
      <div className='sectionTitle-content'>
        <span>{props.title}</span>
        <a className='sectionTitle-content-more'>{props.rightContent}</a>
      </div>
      <hr style={{ borderColor: Color.defaultColor }} />
    </div>
  );
};

export default SectionTitle;
