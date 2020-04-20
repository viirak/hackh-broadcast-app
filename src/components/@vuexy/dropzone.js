import React, { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'reactstrap'
import '../../assets/scss/plugins/extensions/dropzone.scss'

export default props => {
  const [files, setFiles] = useState(props.image || {})
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 10000000, // image under 10MB only
    onDrop: acceptedFiles => {
      setFiles(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
      );
      props.getImage(acceptedFiles[0]);
    }
  })

  useEffect(
    () => () => {
      // files.forEach(file => URL.revokeObjectURL(file.preview))
      URL.revokeObjectURL(files.preview)
    },
    [files]
  )

  useEffect(() => {
    !props.image && setFiles({})
  }, [props.image])

  return (
    <section className="pb-1">
      <Row>
        <Col sm="8">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {
              !!Object.keys(files).length
                ? <>
                    <img src={files.preview} className="dz-img" alt={files.name} />
                  </>
                : <p className="mx-1">
                  <em><FormattedMessage id="image-preview"/></em>
                </p>
            }
          </div>
        </Col>
        <Col sm="4" className="d-flex">
          <em className="align-self-center" style={{ fontSize: '90%', textAlign: 'center' }}>
            <FormattedMessage id="image-description"/>
          </em>
        </Col>
      </Row>
    </section>
  )
}
