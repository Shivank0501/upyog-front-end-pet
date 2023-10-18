import {
    CardLabel,
    CardLabelError,
    Dropdown,
    LabelFieldPair,
    LinkButton,
    //MobileNumber,
    TextInput,
    Toast,
  } from "@egovernments/digit-ui-react-components";
  import _ from "lodash";
  import React, { useEffect, useMemo, useState } from "react";
  import { Controller, useForm } from "react-hook-form";
  import { useTranslation } from "react-i18next";
  import { useLocation } from "react-router-dom";
  import { stringReplaceAll, CompareTwoObjects } from "../utils";
  
  const createAddressDetails = () => ({

    houseNo:"",
    houseName:"",
    houseType:"",
    addressLinefirst:"",
    addressLinesecond:"",
    streetName:"",
    landmark:"",
    locality:"",
    cityName:"",
    pincode:"",
    
   
    key: Date.now(),
  });
  
  const PTRSelectAddress = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
    const { t } = useTranslation();
  
    const { pathname } = useLocation();
    const isEditScreen = pathname.includes("/modify-application/");
    const [address, setAddress] = useState(formData?.address || [createAddressDetails()]);
    const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });
  
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    const { data: mdmsData, isLoading } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", [
      // "UsageCategory",
      // "OccupancyType",
      //"Floor",
      "OwnerType",
      //"OwnerShipCategory",
      // "Documents",
      // "SubOwnerShipCategory",
      // "OwnerShipCategory",
    ]);
  
    const { data: Menu } = Digit.Hooks.pt.usePTGenderMDMS(stateId, "common-masters", "GenderType");
  console.log("address",address)
    let menu = [];
  
    Menu &&
      Menu.map((formGender) => {
        menu.push({ i18nKey: `PT_FORM3_${formGender.code}`, code: `${formGender.code}`, value: `${formGender.code}` });
      });
  
    // const addNewOwner = () => {
    //   const newOwner = createAddressDetails();
    //   setAddress((prev) => [...prev, newOwner]);
    // };
  
    // const removeOwner = (pata) => {
    //   setAddress((prev) => prev.filter((o) => o.key != pata.key));
    // };
  
    useEffect(() => {
      onSelect(config?.key, address);
    }, [address]);
  
    const commonProps = {
      focusIndex,
      allOwners: address,
      setFocusIndex,
      //removeOwner,
      formData,
      formState,
      setAddress,
      mdmsData,
      t,
      setError,
      clearErrors,
      config,
      menu,
      isEditScreen,
    };
  
    return  (
      <React.Fragment>
        {address.map((pata, index) => (
          <OwnerForm key={pata.key} index={index} pata={pata} {...commonProps} />
        ))}
        
      </React.Fragment>
    ) 
  };
  
  const OwnerForm = (_props) => {
    const {
      pata,
      index,
      focusIndex,
      allOwners,
      setFocusIndex,
      //removeOwner,
      setAddress,
      t,
      mdmsData,
      formData,
      config,
      setError,
      clearErrors,
      formState,
      menu,
      isEditScreen,
    } = _props;
    const { originalData = {} } = formData;
    const { institution = {} } = originalData;
    const [uuid, setUuid] = useState(null);
    const [showToast, setShowToast] = useState(null);
    const {
      control,
      formState: localFormState,
      watch,
      setError: setLocalError,
      clearErrors: clearLocalErrors,
      setValue,
      trigger,
    } = useForm();
    const formValue = watch();
    const { errors } = localFormState;
    const tenantId = Digit.ULBService.getCurrentTenantId();
  
    const isIndividualTypeOwner = useMemo(
      () => formData?.ownershipCategory?.code.includes("INDIVIDUAL"),
      [formData?.ownershipCategory?.code],
    );
  
    const [part, setPart] = React.useState({});
  
    useEffect(() => {
      let _ownerType = isIndividualTypeOwner ? {} : { ownerType: { code: "NONE" } };
  
      if (!_.isEqual(part, formValue)) {
        setPart({ ...formValue });
        setAddress((prev) => prev.map((o) => (o.key && o.key === pata.key ? { ...o, ...formValue, ..._ownerType } : { ...o })));
        trigger();
      }
    }, [formValue]);
  
    useEffect(() => {
      if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors))
        setError(config.key, { type: errors });
      else if (!Object.keys(errors).length && formState.errors[config.key]) clearErrors(config.key);
    }, [errors]);
  
    const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };
  
    return (
      <React.Fragment>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
            {allOwners?.length > 2 ? (
              <div
                // onClick={() => //removeOwner(pata)}
                // style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}
              >
                X
              </div>
            ) : null}
  
            {/*   Actual starting of form */}
  
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_HOUSE_NO.") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"houseNo"}
                  defaultValue={pata?.houseNo}
                  rules={{
                    //required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[A-Z]-?\d+$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) }
                }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "houseNo"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "houseNo" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>{localFormState.touched.houseNo ? errors?.houseNo?.message : ""}</CardLabelError>
  
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_HOUSE_NAME") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"houseName"}
                  defaultValue={pata?.houseName}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "houseName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "houseName" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>{localFormState.touched.houseName ? errors?.houseName?.message : ""}</CardLabelError>
  
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_HOUSE_TYPE") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"houseType"}
                  defaultValue={pata?.houseType}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "houseType"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "houseType" });
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                      placeholder="Resident / Official"
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>{localFormState.touched.houseType ? errors?.houseType?.message : ""}</CardLabelError>
  
            
  
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_ADDRESS_LINE_1") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"addressLinefirst"}
                  defaultValue={pata?.addressLinefirst}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "addressLinefirst"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "addressLinefirst" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.addressLinefirst ? errors?.addressLinefirst?.message : ""}
            </CardLabelError>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_ADDRESS_LINE_2") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"addressLinesecond"}
                  defaultValue={pata?.addressLinesecond}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "addressLinesecond"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "addressLinesecond" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.addressLinesecond ? errors?.addressLinesecond?.message : ""}
            </CardLabelError>

            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_STREET_NAME") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"streetName"}
                  defaultValue={pata?.streetName}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "streetName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "streetName" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.streetName ? errors?.streetName?.message : ""}
            </CardLabelError>

            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_LANDMARK") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"landmark"}
                  defaultValue={pata?.landmark}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "landmark"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "landmark" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.landmark ? errors?.landmark?.message : ""}
            </CardLabelError>

            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_LOCALITY") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"locality"}
                  defaultValue={pata?.locality}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "locality"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "locality" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.locality ? errors?.locality?.message : ""}
            </CardLabelError>

            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_CITY") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"cityName"}
                  defaultValue={pata?.cityName}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "cityName"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "cityName" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.cityName ? errors?.cityName?.message : ""}
            </CardLabelError>

            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("PTR_PINCODE") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"pincode"}
                  defaultValue={pata?.pincode}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^\d{6}$/.test(val) ? true : t("ERR_INVALID_PINCODE_MSG")) },

                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === pata?.key && focusIndex.type === "pincode"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: pata.key, type: "pincode" });
                      }}
                      onBlur={props.onBlur}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched.pincode ? errors?.pincode?.message : ""}
            </CardLabelError>
  
           
  
            
        </div>
        </div>
        {showToast?.label && (
          <Toast
            label={showToast?.label}
            onClose={(w) => {
              setShowToast((x) => null);
            }}
          />
        )}
      </React.Fragment>
    );
  };
  
  export default PTRSelectAddress;
  