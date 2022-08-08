import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SummaryForms() {
  const [tcChecked, setTcChecked] = useState<boolean>(false);
  const checkboxLabel = 'Terms and Conditions';

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
