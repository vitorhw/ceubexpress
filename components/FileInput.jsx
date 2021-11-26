import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import {
  Box,
  FormLabel,
  Input,
  Text,
  useColorMode,
  Image,
} from "@chakra-ui/react";

export const FileInput = (props) => {
  const { colorMode } = useColorMode();
  const { name, label = name } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: props.accept,
    maxFiles: 1,
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

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
            border:
              colorMode === "light"
                ? "rgba(1,1,1,0.3) dashed 2px"
                : "rgba(255,255,255,0.3) dashed 2px",
            borderRadius: "3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
            backgroundColor: isDragActive
              ? colorMode === "light"
                ? "rgba(1,1,1,0.3)"
                : "rgba(255, 255, 255, 0.3)"
              : "transparent",
          }}
        >
          <Text className=" ">Carregue a sua imagem aqui ...</Text>

          {files?.length === 0 ||
            (files?.length === undefined && props.imagePreview && (
              <Image
                alt="preview"
                src={props.imagePreview}
                mt="1rem"
                height="200px"
              />
            ))}
          {!!files?.length && (
            <Box className=" ">
              {files.map((file) => {
                return (
                  <Box key={file.name}>
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      mt="1rem"
                      height="200px"
                    />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
