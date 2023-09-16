"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "./CeateserverModel";
import { InviteModal } from "./InviteModel";
import { EditServerModal } from "./EditserverModel";
import { MembersModal } from "./MemberModel";
import { CreateChannelModal } from "./CreateModel";
import { DeleteServerModal } from "./DeleteServerModel";
import { LeaveServerModal } from "./LeavserverModel";
import { DeleteChannelModal } from "./DeleteChanalModel";
import { EditChannelModal } from "./EditChannelModal";
import { MessageFileModal } from "./MssageFileModel";
import { DeleteMessageModal } from "./DeletMassageModel";

 const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }
  
    return (
      <>
        <CreateServerModal />
        <InviteModal/>
        <EditServerModal/>
        <MembersModal/>
        <CreateChannelModal/>
        <DeleteServerModal/>
        <LeaveServerModal/>
        <DeleteChannelModal/>
        <EditServerModal/>
        <EditChannelModal/>
        <MessageFileModal/>
        <DeleteMessageModal/>
      </>
    )
  }
  export default ModalProvider