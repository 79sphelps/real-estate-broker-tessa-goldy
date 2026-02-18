import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Section, Form } from "../components";
import { createGeneralMessage } from "../redux/actions";
import {
  FormError,
  // getContactFormErrorObject,
  contactFormErrors,
} from "../helpers/form_validation";

const HomeContactContainer = () => {
  const dispatch = useDispatch();

  const formInitialDetails = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });
  const [errors, setErrors] = useState(formInitialDetails);

  const [submitted, setSubmitted] = useState(false);
  const [buttonText, setButtonText] = useState("Send");

  useEffect(() => {
    setSubmitted(false);
  }, []);

  const validateField = (name, value) => {
    if (name === "name") {
      return /^[A-Za-z0-9 ']{5,}$/g.test(value) ? "" : "Invalid name provided";
    }
    if (name === "email") {
      return /^\S+@\S+\.\S+$/g.test(value) ? "" : "Invalid email provided";
    }
    if (name === "phone") {
      return /^\d{3}-\d{3}-\d{4}$/g.test(value) ? "" : "Invalid phone provided";
    }
    if (name === "message") {
      return /^[A-Za-z0-9 ']{25,}$/g.test(value)
        ? ""
        : "Invalid message provided";
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
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

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
    <Section bgColor="--bs-fade-blue">
      <Section.InnerContainer>
        <Section.Header></Section.Header>
        <Section.Content>
          <Section.Flex>
            <Section.FlexItem width="70%">
              <Section.SubTitle size="1">Contact Us</Section.SubTitle>
              <Section.Text>
                With her experience and position as a local broker in
                conjunction with an extensive marketing background, Tessa has
                significant advantages she can use to sell your house.
                <br /> <br />
                Seasoned sales, marketing and analytical skills established by
                10 years of corporate and agency experience. She has an
                extensive network of brokers as well as local buyers and sellers
                to prospect on your behalf.
                <br /> <br />
                She specializes in all residential areas all across the state,
                doing business in the Greater Portland area, the Oregon Coast,
                Bend to Medford.
              </Section.Text>
              <Section.Flex>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>Meet Tessa</Section.SubTitle>
                  <Section.Text>
                    Tessa Gold takes a concierge approach to real estate. She
                    comes from a background in medical legal work where she
                    brokered physicians for personal injury and medical
                    malpractice cases. Tessa is entrepreneurial and
                    business-minded which lends itself well to real estate. She
                    provides expert analysis and exclusive insights as well as
                    cutting edge strategies based on her local market knowledge.
                    <br /> <br />
                    When you decide to work with Tessa, you get Tessa. She
                    prides herself on being the agent that is front and center
                    every step of the way for her clients. She is an active
                    listener, always anticipating the needs of her clients. She
                    does her homework and stays up-to-date on the latest housing
                    updates. When it comes to a transaction she attends to every
                    detail from start to finish.
                  </Section.Text>
                </Section.FlexItem>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>
                    Get Instant Support From Us
                  </Section.SubTitle>
                  <Section.Text>
                    Moving and purchasing a home is a big transaction. Tessa
                    works with everyone from relocating clients to locals and
                    understands that moving into a new home or community, or
                    even a new state, is a big transition. She currently
                    specializes in the Lake Oswego, West Linn, Dunthorpe,
                    southwest Portland, Wilsonville, Tigard and Tualatin areas.
                    It’s her top priority to help her clients become acquainted
                    with local resources, schools and neighbors around them.
                    <br /> <br />
                    Whether it’s a luxury listing or a single family
                    residential, Tessa always brings in her full arsenal of
                    marketing strategies and customizes every listing’s
                    marketing plan. Finding that right fit is extremely
                    important to her because meeting and exceeding her client’s
                    goals is always her main objective.
                  </Section.Text>
                </Section.FlexItem>
              </Section.Flex>
            </Section.FlexItem>
            <Section.FlexItem width="30%" bg="true">
              {!submitted ? (
                <Form data-testid="contactForm">
                  <Form.FormGroup>
                    <Form.Input
                      name="name"
                      data-testid="name"
                      type="text"
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
                      name="email"
                      data-testid="email"
                      type="text"
                      placeholder="Your Email"
                      value={formDetails.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <FormError msg={contactFormErrors["email"].error} />
                    )}
                  </Form.FormGroup>
                  <Form.FormGroup>
                    <Form.Input
                      name="phone"
                      data-testid="phone"
                      type="text"
                      placeholder="Your Phone Number"
                      value={formDetails.phone}
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
                      data-testid="message"
                      name="message"
                      id=""
                      cols="30"
                      rows="10"
                      alue={formDetails.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Form.TextArea>
                    {formDetails.message.length < 25 && (
                      <div>
                        ({25 - formDetails.message.length} characters still
                        needed)
                      </div>
                    )}
                    {touched.message && errors.message && (
                      <FormError msg={contactFormErrors["message"].error} />
                    )}
                  </Form.FormGroup>
                  <Form.FormGroup>
                    <Form.SubmitInput
                      data-testid="submit"
                      type="submit"
                      value="Send Message"
                      onClick={(e) => saveGeneralMessage(e)}
                    />
                  </Form.FormGroup>
                </Form>
              ) : (
                <Section.Flex style={{ background: "white", padding: "20px" }}>
                  <Section.FlexItem width="100%">
                    <Section.SubTitle>We Will Get In Touch!</Section.SubTitle>
                    <Section.Text>
                      Thank you for submitting your contact message.
                    </Section.Text>
                  </Section.FlexItem>
                </Section.Flex>
              )}
            </Section.FlexItem>
          </Section.Flex>
        </Section.Content>
      </Section.InnerContainer>
    </Section>
  );
};

export default HomeContactContainer;
