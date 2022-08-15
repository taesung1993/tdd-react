import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import ScoopOption from './ScoopOption';
import Row from 'react-bootstrap/Row';

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

  if (Array.isArray(items) && items.length) {
    const ItemComponent = ScoopOption;
    const optionItems = items.map((item, index) => (
      <ItemComponent key={index} name={item.name} imagePath={item.imagePath} />
    ));
    return <Row>{optionItems}</Row>;
  }

  return <div>hello</div>;
}
