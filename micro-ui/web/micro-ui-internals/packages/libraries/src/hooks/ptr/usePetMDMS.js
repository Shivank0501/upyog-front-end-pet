import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const usePetMDMS = (tenantId, moduleCode, type, config = {}) => {
  
  
  
  const useDocumentsRequiredScreen = () => {
    return useQuery("PT_DOCUMENT_REQ_SCREEN", () => MdmsService.getDocumentsRequiredScreen(tenantId, moduleCode), config);
  };
  
  

  const _default = () => {
    return useQuery([tenantId, moduleCode, type], () => MdmsService.getMultipleTypes(tenantId, moduleCode, type), config);
  };

  switch (type) {
    
    case "PetDocuments":
      return useDocumentsRequiredScreen();
    
    default:
      return _default();
  }
};

export default usePetMDMS;