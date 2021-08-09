import React from 'react';
import { FiChevronDown, FiPlus, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { GrPlayFill } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import './PreviewModalControls.css';

const PreviewModalControls = () => {
    return (
        <div className="action-items">
            {/* <div> */}
            <Link to="/" className="link">
                <button className="action-buttons action-buttons--fill">
                    <div className="small-btn ">
                        <GrPlayFill viewBox="0 0 24 24" />
                    </div>
                </button>
            </Link>
            <div className="link">
                <button className="action-buttons">
                    <div className="small-btn ">
                        <FiPlus viewBox="0 0 24 24" />
                    </div>
                </button>
            </div>
            <div className="link">
                <button className="action-buttons">
                    <div className="small-btn ">
                        <FiThumbsUp viewBox="0 0 24 24" />
                    </div>
                </button>
            </div>
            <div className="link">
                <button className="action-buttons">
                    <div className="small-btn ">
                        <FiThumbsDown viewBox="0 0 24 24" />
                    </div>
                </button>
            </div>
            <div className="link link--last">
                <button className="action-buttons">
                    <div className="small-btn ">
                        <FiChevronDown viewBox="0 0 24 24" />
                    </div>
                </button>
            </div>
            {/* </div> */}

            {/*  <div>
                <Link to="/" className="link link--last">
                    <button className="action-buttons">
                        <FiChevronDown />
                    </button>
                </Link>
            </div> */}
        </div>
    );
};

export default PreviewModalControls;
