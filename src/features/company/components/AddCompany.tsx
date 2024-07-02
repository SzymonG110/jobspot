"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
import { createCompany } from "#/features/company/actions/createCompany";

export default function AddCompany() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: createCompanyMutate, isPending: isCreating } = useMutation({
    mutationKey: ["createCompany"],
    onMutate: createCompany,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      logo_buffer: "",
    },
    onSubmit: (values) => createCompanyMutate(values),
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files![0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        formik.setFieldValue("logo_buffer", result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="success">
        Create company
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        onClose={formik.resetForm}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Add company
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Company name"
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <Input
                  type="file"
                  accept="image/jpeg, image/png"
                  name="logo_buffer"
                  onChange={handleFileChange}
                />
                {formik.values.logo_buffer !== "" && (
                  <Image
                    src={formik.values.logo_buffer}
                    alt="Avatar Preview"
                    className="mt-4"
                    width={200}
                    height={200}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" isDisabled={isCreating}>
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
