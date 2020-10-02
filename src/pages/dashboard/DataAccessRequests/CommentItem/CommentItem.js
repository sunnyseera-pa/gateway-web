import React from 'react';

export default ({text, title}) => {
  return (
    <div className="comment">
      <h1>{title}</h1>
      <div className="comment-wrapper">
          <div className="comment-item">
              <div className="comment-item-header">
                  {/* <h2>Gauthier Drewitt</h2>
                  <div>03 Jun 2020</div> */}
              </div>
              <div className="comment-item-body">
                  {text}
              </div>
          </div>
      </div>
    </div>
  )
}