import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

interface Props {
  optionType: string;
}

export default function Options({ optionType }: Props) {
  const [items, setItems] = useState<any[]>([]);
  // optionType is 'scoops' and 'toppings'
  useEffect(() => {
    axios
      .get<any>(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // TODO: handle error response
        console.log(error);
      });
  }, [optionType]);

  // TODO: replace 'null' with ToppingOption when available

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItems = items.map((item, index) => (
    <ItemComponent key={index} name={item.name} imagePath={item.imagePath} />
  ));

  return <Row>{optionItems}</Row>;
}
