import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import FormData from 'form-data';
import { ReactComponent as UploadSVG } from '../../../../images/upload.svg';
import readXlsxFile from 'read-excel-file';
import { Row, Col, Button, Alert, Table } from 'react-bootstrap';
import { baseURL } from '../../../../configs/url.config';
import './StructuralMetadata.scss';

const StructuralMetadata = ({ onStructuralMetaDataUpdate, structuralMetaData, structuralMetaDataErrors }) => {
	// 10mb - 10485760
	// 2mb - 2097152
	const maxSize = 10485760;
	// name, size, location, id
	const [uploadFiles, setUploadFiles] = useState([]);
	const [newStructuralMetaData, setNewStructuralMetaData] = useState(structuralMetaData);
	const [newStructuralMetaDataErrors, setNewStructuralMetaDataErrors] = useState(structuralMetaDataErrors);
	const [submitted, setSubmitted] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [download, showDownload] = useState(true);

	/* const onRemoveFile = (file) => {
    const newFiles = [...uploadFiles].filter((f) => {
      return f.fileId !== file.fileId
    });
    setUploadFiles(newFiles);
  }

  const onDropAccepted = (acceptedFiles) => {
    const formattedFiles = formatFiles(acceptedFiles);
    setUploadFiles((uploadFiles) => ([...uploadFiles, ...formattedFiles]));
  };

  const onDropRejected = (rejectedFiles) => {
    const rejected = formatRejectedFiles(rejectedFiles);
    const newFiles= [...uploadFiles, ...rejected];
    setUploadFiles(newFiles);
  } */

	/* const formatFiles = (acceptedFiles) => {
    if(!_.isEmpty(acceptedFiles)) { 
      return [...acceptedFiles].map((file) => {
        return {
          error: '',
          fileId: uuidv4(),
          description: '',
          size: file.size,
          name: file.path,
          status: fileStatus.NEWFILE,
          file: Object.assign(file)
        }
      });
    }
    return [];
  } */

	/* const formatRejectedFiles = (rejectedFiles) => {
    if(!_.isEmpty(rejectedFiles)) { 
      return [...rejectedFiles].map((f) => {
        let { file } = f; 
        return {
          error: 'File exceeds limit',
          fileId: uuidv4(),
          description: '',
          size: file.size,
          name: file.path,
          status: fileStatus.ERROR,
          file: ''
        }
      });
    }
    return [];
  } */

	/* const onDescriptionChange = event => {
    event.preventDefault();
    let {name, value} = event.currentTarget;
    let [key, uniqueId = ''] = name.split('_');
    if(!_.isEmpty(uniqueId)) {
      const allFiles = [...uploadFiles].map((file) => {
        if(file.fileId === uniqueId) 
          return Object.assign(file, {...file, description : value});

        return file;
      });
      setUploadFiles(allFiles);
    }
  } */

	/* const onUploadFiles = async () => {
    setSubmitted(true);
    // 1. filter out files that have description and newFile to upload
    const acceptedFiles = [...uploadFiles].filter(f => !_.isEmpty(f.description) && f.status === fileStatus.NEWFILE);
    if(!_.isEmpty(acceptedFiles)) {
      // 2. setup new formData array for axios
      let formData = new FormData();
      // 3. append our files to formData
      const fileObjects = [...acceptedFiles].map(f => {
        let { file } = f;
        formData.append('assets', file);
        formData.append('descriptions', f.description);
        formData.append('ids', f.fileId);
      });
      // 4. Set up headers for axios
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };
      setLoading(true);
      await axios.post(`${baseURL}/api/v1/data-access-request/${id}/upload`, formData, config)
        .then(response => {
          // set submission false
          setSubmitted(false);
          let {data: {mediaFiles = []}} = response;
          // update file state
          if(!_.isEmpty(mediaFiles)) {
            // returned files and initialFilesLoad = false
            onFilesUpdate(mediaFiles, false);
            // wipe upload false
            setUploadFiles([]);
            // set loading false
            setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
  } */

	/* const downloadFile = async (file)  => {
    if(!_.isEmpty(file)) {
      let { fileId, name } = file;
      await axios.get(`${baseURL}/api/v1/data-access-request/${id}/file/${fileId}`, {responseType: 'blob'})
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          // must be the file name ie me.jpeg, my.pdf
          link.setAttribute('download', name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(err => {
          console.log(err);
        });
    }
  } */

	/* const updateDARFileState = (files, initalLoading) => {
    onFilesUpdate(files, initalLoading);
  } */

	/* useEffect(() => {
    let timer;
    if(!initialFilesLoad) {
      showDownload(false);
      timer = setTimeout(() => {
        showDownload(true);
        updateDARFileState(files, false);
       }, 45000);
      }
      return () =>  {
        if(!initialFilesLoad) {
          clearTimeout(timer);
        }
      };
  }, [files, initialFilesLoad]) */

	// dropzone setup
	/* const { getRootProps, getInputProps } = useDropzone({
    noDrop: true,
    onDropAccepted,
    onDropRejected,
    minSize: 0,
    maxSize
  }); */

	const schema = {
		'Table Name': {
			prop: 'tableName',
			type: String,
			required: true,
		},
		'Table Description': {
			prop: 'tableDescription',
			type: String,
		},
		'Column Name': {
			prop: 'columnName',
			type: String,
			required: true,
		},
		'Column Description': {
			prop: 'columnDescription',
			type: String,
			required: true,
		},
		'Data Type': {
			prop: 'dataType',
			type: String,
			required: true,
		},
		Sensitive: {
			prop: 'sensitive',
			type: Boolean,
			required: true,
		},
	};

	const onDescriptionChange = event => {
		if (maxSize < event.target.files[0].size) {
			setNewStructuralMetaDataErrors([{ error: 'fileSizeError' }]);
		} else {
			//event.target.files[0].type
			//debugger
			readXlsxFile(event.target.files[0], { schema }).then(({ rows, errors }) => {
				if (errors.length > 0) setNewStructuralMetaDataErrors(errors);
				else setNewStructuralMetaDataErrors([]);

				setNewStructuralMetaData(rows);

				if (rows.length > 0 && errors.length === 0) {
					//all good so update
					debugger;
				}

				//console.table(rows);

				/* for (let i in rows){
            for (let j in rows[i]){
                //console.dir(rows[i][j]);
            }
        } */
			});
		}
		event.target.value = null;
	};

	useEffect(() => {
		onStructuralMetaDataUpdate(newStructuralMetaData, newStructuralMetaDataErrors);
	}, [newStructuralMetaData, newStructuralMetaDataErrors]);

	const hiddenFileInput = React.useRef(null);

	const handleClick = event => {
		hiddenFileInput.current.click();
	};

	return (
		<div className='files'>
			<div className='files-header'>
				<div>
					<input type='file' id='input' hidden ref={hiddenFileInput} onChange={onDescriptionChange} />
					<p className='black-20-semibold margin-bottom-16'>Upload</p>
					<div className='upload'>
						<button className='button-tertiary' onClick={handleClick}>
							<UploadSVG /> Select file...
						</button>
						<span className='gray700-alt-13'>Excel or SVG. Max 10MB per file.</span>
					</div>
				</div>
			</div>
			<div className='files-area'>
				{structuralMetaDataErrors.length > 0 ? (
					structuralMetaDataErrors[0].error === 'fileSizeError' ? (
						'Test'
					) : (
						<Row>
							<Col xs={12} s={12} md={12}>
								<Alert variant='danger'>
									There are errors in the data you uploaded. Please correct these and try again. Errors are listed below.
								</Alert>
							</Col>
						</Row>
					)
				) : (
					''
				)}

				{structuralMetaDataErrors.length !== 0 ? (
					<Row>
						<p className='dark-red-semibold-20'>Uploaded data errors</p>
						<Col xs={12} s={12} md={12}>
							<Alert variant='danger'>
								{structuralMetaDataErrors.map(errors => {
									return (
										<>
											Error in row {errors.row}: "{errors.column}" is {errors.value} = {errors.error} = {errors.type} <br />
										</>
									);
								})}
							</Alert>
						</Col>
					</Row>
				) : (
					''
				)}

				<Table bordered responsive size='sm' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
					{structuralMetaData.length !== 0 ? (
						<thead>
							<tr className='gray800-14-bold'>
								<th>Table name</th>
								<th>Table description</th>
								<th>Column name</th>
								<th>Column description</th>
								<th>Data type</th>
								<th>Sensitive</th>
							</tr>
						</thead>
					) : (
						''
					)}
					<tbody>
						{structuralMetaData.map((data, index) => {
							const filtered = structuralMetaDataErrors.filter(dat => dat.row === index + 1);

							//const reviewCount = data.filter(dat => dat.activeflag === 'review').length

							let test = structuralMetaDataErrors;
							//debugger

							return (
								<tr className='gray800-14'>
									<td className={data.tableName ? "" : "invalid-info"}>{data.tableName}</td>
									<td className={data.tableDescription ? "" : "invalid-info"}>{data.tableDescription}</td>
									<td className={data.columnName ? "" : "invalid-info"}>{data.columnName}</td>
									<td className={data.columnDescription ? "" : "invalid-info"}>{data.columnDescription}</td>
									<td className={data.dataType ? "" : "invalid-info"}>{data.dataType}</td>
									<td className={data.sensitive ? "" : "invalid-info"}>{String(data.sensitive)}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default StructuralMetadata;
