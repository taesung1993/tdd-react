import { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default function SummaryForms({ setOrderPhase }: any) {
  const [tcChecked, setTcChecked] = useState<boolean>(false);

  function handleSubmit(event: any) {
    event.preventDefault();
    setOrderPhase('completed');
  }

  const popover = (
    <Popover id="termsandconditions-popover">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Check
            id="terms-of-condition-check"
            type="checkbox"
            checked={tcChecked}
            onChange={() => setTcChecked(!tcChecked)}
          />
          <Form.Label htmlFor="terms-of-condition-check">
            {checkboxLabel}
          </Form.Label>
        </Form.Group>
        <Button variant="primary" disabled={!tcChecked} type="submit">
          Confirm Order
        </Button>
      </Form>
    </section>
  );
}
