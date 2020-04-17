import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap"
import { useDropzone } from "react-dropzone"
import '../../assets/scss/plugins/extensions/dropzone.scss'

export default props => {
  const [files, setFiles] = useState(props.image || {})
  const {
    acceptedFiles,
    // rejectedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: "image/jpeg, image/png",
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
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {
          Object.keys(files).length
            ? <>
                <img src={files.preview} className="dz-img" alt={files.name} />
                &nbsp;&nbsp;{files.name}
              </>
            : <p className="mx-1">
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </p>
        }
      </div>
    </section>
  )
}
