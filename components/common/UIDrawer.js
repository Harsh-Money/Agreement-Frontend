import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";

function UIDrawer(props){
    const { isOpen, onClose, heading } = props;

  return (
    <Drawer
      isOpen={isOpen}
      placement={"right"}
      onClose={onClose}
      size={["sm", "md"]}
      h="full"
      blockScrollOnMount={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          left={5}
          top={5}
          _hover={{ bg: "primary.500", color: "black" }}
          color="primary.500"
        />
        {heading && <DrawerHeader>{heading}</DrawerHeader>}
        <DrawerBody bg={"black"} py="20">
          {props.children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default UIDrawer;
