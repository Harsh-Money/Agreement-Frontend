import {
  Badge,
  Box,
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

const CardContainer = ({ name, email="abc@gmail.com", contact_no='123456789', ownershop,status, handleCardClicked }) => {
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
          <Box>
            {status  && (
              status == 'APPLIED' ?
              <Badge>{status}</Badge> :
              <Badge colorScheme='green'>{status}</Badge>
            )}
          </Box>
        </CardBody>
        <CardFooter>
        <Button onClick={checkCardClicked}>{name ? name : "un-known"}</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardContainer;
