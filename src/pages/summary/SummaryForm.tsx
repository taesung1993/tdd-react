import { useState } from 'react';
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap';

export default function SummaryForms() {
  const [tcChecked, setTcChecked] = useState<boolean>(false);
  const checkboxLabel = (
    <OverlayTrigger placement="right" overlay={popover}>
      <span>Terms and Conditions</span>
    </OverlayTrigger>
  );

  return (
    <section>
      <Form>
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
        <Button variant="primary" type="submit" disabled={tcChecked}>
          Confirm Order
        </Button>
      </Form>
    </section>
  );
}

function popover() {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );
}
