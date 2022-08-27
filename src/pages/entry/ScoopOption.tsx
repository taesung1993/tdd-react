import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ChangeEvent, useState } from 'react';

interface Props {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}

export default function ScoopOption({
  name,
  imagePath,
  updateItemCount,
}: Props) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const currentValue = target.value;
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);

    if (valueIsValid) {
      updateItemCount(name, +currentValue);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column cd="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
