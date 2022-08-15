import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

interface Props {
  optionType: string;
}

export default function Options({ optionType }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState(false);
  // optionType is 'scoops' and 'toppings'
  useEffect(() => {
    axios
      .get<any>(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: handle error response
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  // TODO: replace 'null' with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItems = items.map((item, index) => (
    <ItemComponent key={index} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
