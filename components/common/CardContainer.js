import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const CardContainer = ({ name, email, contact_no, ownershop, handleCardClicked }) => {
  const [ownerPicked, setOwnerPicked] = useState(false);

  const checkCardClicked = () => {
    handleCardClicked()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            {" "}
            {ownershop ? ownershop?.shopName : "un-known"}
          </Heading>
        </CardHeader>
        <CardBody>
          <Text>{email}</Text>
          <Text>{contact_no}</Text>
        </CardBody>
        <CardFooter>
        <Button onClick={checkCardClicked}>{name}</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardContainer;
