import React, { Fragment, useEffect, useState} from 'react';
import _ from 'lodash';
import { concatFileName, fileStatus, readableFileSize } from './files.util';
import { ReactComponent as PaperSVG } from '../../../../images/paper.svg';
import { ReactComponent as ArrowDownSVG } from '../../../../images/arrow-down.svg';
import { ReactComponent as SmallAttentionSVG } from '../../../../images/small-attention.svg';
import Image from 'react-bootstrap/Image';

export const AllFiles = ({ allFiles, downloadFile}) => {

  const [showDownload, setDownload] = useState(false);

  const getOwner = (file) =>{
    let { owner } = file;
    if(!_.isEmpty(owner)) {
      let {firstname = '', lastname = ''} = owner;
      return `${firstname} ${lastname}`;
    }
    return '-';
  }

  const renderScan = () => {
    return (
      <Fragment>
        <div className="all-files-spinner"><Image width="100px" height="100px" src={require("../../../../images/spinner.gif")} /></div>
      </Fragment>
    );  
  }

  const renderDownload = (file) => {
    if(file.status === fileStatus.ERROR) {
      return '';
    } else {
      return (
      <div className="all-files-download" onClick={e => downloadFile(file)}>
        <ArrowDownSVG />
      </div>
      )
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!');
      setDownload(true);
    }, 45000);
    return () =>  {
      clearTimeout(timer)
      setDownload(false);
    };
  }, [allFiles])
  
  return (
    <div className="all-files">
      <h1 className="black-20-semibold">All Files</h1>
      <div className="all-files file-table header">
        <div className="column gray800-14-bold">File</div>  
        <div className="column gray800-14-bold">File description</div>
        <div className="column gray800-14-bold">Uploaded by</div>
      </div>
      <Fragment>
        { allFiles.length > 0 &&
          allFiles.map((file, index) => (
            <div className="all-files file-table" key={`all-files-${index}`}>
              <div className="column all-files-file">
                <PaperSVG />
                <div className="all-files-file--meta">
                  <span>{concatFileName(file)}</span>
                  <span className="gray700-alt-13">{readableFileSize(file)}</span>
                </div>
              </div> 
              <div className="column all-files-desc">
                {file.status === fileStatus.ERROR ?
                  <Fragment>
                    <div className="error-alert">
                      <SmallAttentionSVG /> {file.error}  
                    </div>
                  </Fragment>
                  :
                  <Fragment>
                    {file.description}
                  </Fragment>
                }
              </div>
              <div className="column all-files-user">
                {file.status === fileStatus.ERROR ? '' : getOwner(file)}
                {showDownload ? renderDownload(file) : renderScan()}
              </div>
          </div>
          ))}
      </Fragment>
     </div>
  )
}

export default AllFiles;