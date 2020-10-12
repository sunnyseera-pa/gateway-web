import React from 'react';

export default ({text, title, subtitle}) => {
  return (
    <div className="comment">
      <h1>{title}</h1>
      <div className="comment-wrapper">
          <div className="comment-item">
              <div className="comment-item-header gray700-13">
                  {/* <h2>Gauthier Drewitt</h2>
                  <div>03 Jun 2020</div> */}
                  {subtitle}
              </div>
              <div className="comment-item-body gray700-14">
                  {text}
              </div>
          </div>
      </div>
    </div>
  )
}