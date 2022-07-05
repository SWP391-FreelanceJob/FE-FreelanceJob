import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const CustomDropzone = ({ maxSize, filter, multiple, acceptedFile }) => {
  const [isFileTooLarge, setIsFileTooLarge] = useState(false);
  // Lazy things
  const [isWrongExtension, setIsWrongExtension] = useState(false);
  const onDrop = useCallback((files) => {
    // console.log(files);
    acceptedFile(files);
  }, []);

  //   const maxSize = 2097152;
  const MBSize = 1024 * 1024;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    multiple: multiple,
    maxSize: maxSize, // 2MB
    minSize: 0,
    accept: filter,
  });

  useEffect(() => {
    setIsFileTooLarge(
      fileRejections.length > 0 && fileRejections[0].file.size > maxSize
    );
    // setIsWrongExtension(
    //     fileRejections.length > 0 && fileRejections[0].errors
    // )
  }, [fileRejections]);

  return (
    <>
      {" "}
      <div
        className="border-2 border-dashed rounded-md w-72 h-28 flex justify-center flex-col items-center mt-2"
        {...getRootProps({})}
      >
        <input {...getInputProps()} />

        {isDragAccept && <p>Thả file vào ô</p>}
        {isDragReject && <p>File bị từ chối</p>}
        {!isDragActive && <p>Kéo file vào đây hoặc nhấn để chọn...</p>}
      </div>
      {isFileTooLarge && <p className="text-red-500">File không được lớn hơn {maxSize / MBSize}MB</p>}
    </>
  );
};

export default CustomDropzone;
