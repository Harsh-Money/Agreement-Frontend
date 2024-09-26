import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import ClientAgreementForm from "../AgreementForm/ClientAgreement";
import OwnerAgreementForm from "../AgreementForm/OwnerAgreement";

function ModalContainer({ownerId, ownerEmail, isOpen, onClose, isOwner=false, clientName, cloudinaryUrl, isSubmit }) {

  const submitClicked = () => {
    isSubmit()
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
    <ModalContent>
      <ModalHeader>Agreement form</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        { !isOwner ? 
        <ClientAgreementForm ownerId={ownerId} ownerEmail={ownerEmail} onClose={onClose} />
        :
        <OwnerAgreementForm clientName={clientName} cloudinaryUrl={cloudinaryUrl} submitClicked={submitClicked} />
        }
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
  }

  export default ModalContainer;