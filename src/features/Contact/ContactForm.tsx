import React, { useState } from "react";
import { Stack, Button, useToast } from "@chakra-ui/react";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";

import { ContactFormInput, ContactFormTextarea } from "features/Contact";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Encode form data for sending as post data
  const encode = (data: { [x: string]: string | number | boolean }) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...form }),
    })
      .then(
        () => (
          setForm({
            name: "",
            email: "",
            message: "",
          }),
          toast({
            title: "Message sent.",
            description: "Your message has been sent.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        )
      )
      .catch((error) => console.log(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="contact"
      method="POST"
      data-netlify-recaptcha="true"
      data-netlify="true"
    >
      {/* For Netlify forms */}
      <input type="hidden" name="form-name" value="contact" />
      <Stack gap={5}>
        <ContactFormInput
          name="name"
          icon={HiOutlineUser}
          value={form.name}
          handleChange={handleChange}
        />
        <ContactFormInput
          name="email"
          icon={HiOutlineMail}
          value={form.email}
          handleChange={handleChange}
        />
        <ContactFormTextarea value={form.message} handleChange={handleChange} />
        <div data-netlify-recaptcha="true"></div>
        <Button colorScheme="teal" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
