import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Property, Form, Section } from "../components";
import { createGeneralMessage } from "../redux/actions";
import {
  FormError,
  // getContactFormErrorObject,
  contactFormErrors,
} from "../helpers/form_validation";

const ContactAgentContainer = ({ property }) => {
  const dispatch = useDispatch();

  const formInitialDetails = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, message: false });
  const [errors, setErrors] = useState(formInitialDetails);

  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  useEffect(() => {
    setSubmitted(false);
  }, []);

  const validateField = (name, value) => {
    if (name === "name") {
      return /^[A-Za-z0-9 ']{5,}$/g.test(value)
      ? ""
      : "Invalid name provided"
    }
    if (name === "email") {
      return /^[A-Za-z0-9 ']{5,}$/g.test(value)
      ? ""
      : "Invalid email provided"
    }
    if (name === "phone") {
      return /^[A-Za-z0-9 ']{5,}$/g.test(value)
      ? ""
      : "Invalid phone provided"
    }
    if (name === "message") {
      return /^[A-Za-z0-9 ']{5,}$/g.test(value)
      ? ""
      : "Invalid message provided"
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formDetails.name),
      email: validateField("email", formDetails.email),
      phone: validateField("phone", formDetails.phone),
      message: validateField("message", formDetails.message),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(e => e === "");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails(prev => ({...prev, [name]: value}));

    if (touched[name]) {
      setErrors(prev => ({...prev, [name]: validateField(name, value)}));
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({...prev, [name]: true}));
    setErrors(prev => ({...prev, [name]: validateField(name, value)}));
  }

  const saveGeneralMessage = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setButtonText("Sending...");
    dispatch(createGeneralMessage(formDetails));
    setSubmitted(true);
    setTimeout(() => {
      setButtonText("Send");
      setFormDetails(formInitialDetails);
      setSubmitted(false);
    }, 5000);
  };

  return (
    <Property.Contact>
      <Property.ContactHeader>
        <Property.ContactItem>
          <Property.AgentImage
            // source={
            //   property.agent.image ? property.agent.image : property.agent.photo
            // }
            // https://www.pravatar.cc/
            // source="https://i.pravatar.cc/150?img=51"
            source="https://assets.jlscloud.net/account/tessagold.png"
          />
        </Property.ContactItem>
        <Property.ContactItem>
          {/* <Property.Subtitle>{property.agent.name}</Property.Subtitle> */}
          <Property.Subtitle>Tessa Goldy</Property.Subtitle>
          <Property.ContactList>
            <Property.ListItem>
              <Property.Icon name="fas fa-phone-alt"></Property.Icon>
              <Property.Text>+254720843306</Property.Text>
            </Property.ListItem>
          </Property.ContactList>
        </Property.ContactItem>
      </Property.ContactHeader>
      <Property.ContactContent>
        <Property.ContactContainer>
          {!submitted ? (
            <Form>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <FormError msg={contactFormErrors["name"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && (
                  <FormError msg={contactFormErrors["email"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Input
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.phone && errors.phone && (
                  <FormError msg={contactFormErrors["phone"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.TextArea
                  placeholder="Your Message"
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Form.TextArea>
                {formDetails.message.length < 25 && (
                  <div>
                    ({25 - formDetails.message.length} characters still needed)
                  </div>
                )}
                {touched.message && errors.message && (
                  <FormError msg={contactFormErrors["message"].error} />
                )}
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.SubmitInput
                  type="submit"
                  value="Send Message"
                  onClick={(e) => saveGeneralMessage(e)}
                />
              </Form.FormGroup>
            </Form>
          ) : (
            <Section.Flex>
              {/* <Section.FlexItem width="50%"> */}
              <Section.FlexItem width="100%">
                <Section.SubTitle>
                  Thank you for submitting your contact message.
                </Section.SubTitle>
                <Section.Text>I will get in touch shortly.</Section.Text>
              </Section.FlexItem>
            </Section.Flex>
          )}
        </Property.ContactContainer>
      </Property.ContactContent>
    </Property.Contact>
  );
};

export default ContactAgentContainer;
