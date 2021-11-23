import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { useFormContext } from "react-hook-form"
import {
  Box,
  FormLabel,
  Input,
  Text,
  Image
} from '@chakra-ui/react'

export const FileInput = props => {
  const { name, label = name } = props
  const { register, unregister, setValue, watch } = useFormContext()
  const files = watch(name)

  const onDrop = useCallback(
    droppedFiles => {
      setValue(name, droppedFiles, { shouldValidate: true })
    },
    [setValue, name]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    maxFiles: 1
  })

  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])

  return (
    <>
      <FormLabel className=" " htmlFor={name}>
        {label}
      </FormLabel>
      <Box
        {...getRootProps()}
        type="file"
        role="button"
        aria-label="image upload"
        id={name}
      >
        <Input {...props} {...getInputProps()} />
        <Box
          style={{
            width: "100%",
            border: "rgba(255,255,255,0.3) dashed 2px",
            borderRadius: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
            backgroundColor: isDragActive ? "rgba(255,255,255,0.3)" : "transparent",
          }}
        >
          <Text className=" ">Carregue a sua imagem aqui ...</Text>

          {!!files?.length && (
            <Box className=" ">
              {files.map(file => {
                return (
                  <Box key={file.name}>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      height="200px"
                    />
                  </Box>
                )
              })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}