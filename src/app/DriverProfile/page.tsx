"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { pictureVideoDataOfVehicleT } from "@/types/videoType";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import "./driver.css";
import {
  postDriverDataByClientId,
  GetDriverDataByClientId,
  GetRfIdByClientId,
  AssignRfidtodriver,
} from "@/utils/API_CALLS";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// import Select from "react-select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-100%)",
  // width: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function DriverProfile() {
  const { data: session } = useSession();
  const [DriverData, setDriverData] = useState<pictureVideoDataOfVehicleT[]>(
    []
  );
  const router = useRouter();
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPages, setRowsPerPages] = React.useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [inputs, setInputs] = useState("");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [getRfid, setRfid] = useState([]);
  const [selectedRFID, setSelectedRFID] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [inactiveRFIDs, setInactiveRFIDs] = useState<any>([]);
 
  const handleClose = () => {
    setOpen(false);
    setSelectedRFID("");
    setShowCardNumber(false);
    setFormData({
      id: "",
      clientId: "",
      driverNo: "",
      driverfirstName: "",
      driverMiddleName: "",
      driverLastName: "",
      driverContact: "",
      driverIdNo: "",
      driverAddress1: "",
      driverAddress2: "",
      driverRFIDCardNumber: "",
      isAvailable: "",
    });
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setShowCardNumber(false);
  };
  const [formData, setFormData] = useState<any>({
    id: "",
    clientId: "",
    driverNo: "",
    driverfirstName: "",
    driverMiddleName: "",
    driverLastName: "",
    driverContact: "",
    driverIdNo: "",
    driverAddress1: "",
    driverAddress2: "",
    driverRFIDCardNumber: "",
    isAvailabl: "",
  });
  const handleEdit = (id: any) => {
    if (!id.driverRFIDCardNumber) {
      setShowCardNumber(false);
    } else {
      setShowCardNumber(true);
    }

    if (id.isAvailable == true) {
      setOpenEdit(true);
    } else {
      toast.error("Please Driver Deasign");
    }

    // DriverData.map((item) => {
    //   if (item.isAvailable === false) {
    //     alert("test");
    //   } else {
    //     setOpenEdit(true);
    //   }
    // });
    // if (editdataFilter.isAvailable == false) {
    //   alert("please Deasign Driver");
    // } else {
    // }
    const filterData: any = DriverData.find((item: any) => item.id == id?.id);
    setSelectedData(filterData);
    vehicleListData();
  };
  const [singleFormData, setSingleFormData] = useState<any>({
    id: "",
    DriverId: "",
    driverNo: "",
    driverfirstName: "",
    driverMiddleName: "",
    driverLastName: "",
    driverContact: "",
    driverIdNo: "",
    driverAddress1: "",
    driverAddress2: "",
    driverRFIDCardNumber: "",
    isAvailabl: false,
  });
  useEffect(() => {
    if (selectedData) {
      setSingleFormData({
        id: selectedData.id,
        DriverId: selectedData?.id,
        driverNo: selectedData.driverNo,
        driverfirstName: selectedData.driverfirstName,
        driverMiddleName: selectedData.driverMiddleName,
        driverLastName: selectedData.driverLastName,
        driverContact: selectedData.driverContact,
        driverIdNo: selectedData.driverIdNo,
        driverAddress1: selectedData.driverAddress1,
        driverAddress2: selectedData.driverAddress2,
        driverRFIDCardNumber: selectedData.driverRFIDCardNumber,
        isAvailable: selectedData.isAvailable,
      });
    }
  }, [selectedData]);

  // Rest of your component code...

  const handleOpen = () => {
    setOpen(true);
    RFid();
  };
  const AddDriverRfid = () => {
    setShowCardNumber(!showCardNumber);
  };

  // const lastIndex = rowsPerPages * currentPage;
  // const firstIndex = currentPage * rowsPerPages + rowsPerPages;
  const filteredData: any = DriverData?.filter((item: any) => {
    if (item === "") {
      return item;
    } else if (
      // item.driverMiddleName?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverfirstName?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverLastName?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverContact?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverIdNo?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverAddress1?.toLowerCase().includes(inputs.toLowerCase()) ||
      item.driverRFIDCardNumber?.toLowerCase().includes(inputs.toLowerCase())

      // item.isDeleted?.toLowerCase().includes(inputs.toLowerCase())

      // item.driverRFIDCardNumber.toLowerCase().includes(inputs.toLowerCase())
    ) {
      return item;
    }
    if (
      inputs.toLowerCase() == "u" ||
      inputs.toLowerCase() == "un" ||
      inputs.toLowerCase() == "una" ||
      inputs.toLowerCase() == "unas" ||
      inputs.toLowerCase() == "unass" ||
      inputs.toLowerCase() == "unassi" ||
      inputs.toLowerCase() == "unassig" ||
      inputs.toLowerCase() == "unassign"
    ) {
      return item.isAvailable === true;
    }
    if (
      inputs.toLowerCase() === "a" ||
      inputs.toLowerCase() === "ac" ||
      inputs.toLowerCase() === "act" ||
      inputs.toLowerCase() === "acti" ||
      inputs.toLowerCase() === "activ" ||
      inputs.toLowerCase() === "active"
    ) {
      return !item.isDeleted;
    }

    if (
      inputs.toLowerCase() === "a" ||
      inputs.toLowerCase() === "as" ||
      inputs.toLowerCase() === "ass" ||
      inputs.toLowerCase() === "assi" ||
      inputs.toLowerCase() === "assign"
    ) {
      return item.isDeleted === false;
    }

    return false;
  });
  const startIndexs: any = currentPage * rowsPerPages;
  const endIndex: any = startIndexs + rowsPerPages;
  const result = filteredData.slice(startIndexs, endIndex);
  // const result: any = filteredData.slice(
  //   rowsPerPages * currentPage,
  //   currentPage * rowsPerPages + rowsPerPages
  // );

  const totalCount = DriverData.length / currentPage;

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPages(+event.target.value);
    setCurrentPage(0);
  };

  const handleChangeDriver = (key: any, e: any) => {
    // let { value } = e;
    // if (key == "driverRFIDCardNumber") {
    //   setFormData({ ...formData, [key]: value });
    // } else {
    setFormData({ ...formData, [key]: e.trim() });
    // }
    setSelectedRFID(e);
  };
  
  const handleEditDriver = (key: any, e: any) => {
  
    // let { value } = e;
    // if (key == "driverRFIDCardNumber") {
    //   setFormData({ ...singleFormData, [key]: e.value });
    // } else {
    setSelectedData({ ...singleFormData, [key]: e });
    // }
  };
  const id: any = selectedData?._id;
  const handleDriverEditedSubmit = async (e: React.FormEvent, value: any) => {
    e.preventDefault();
    const payLoad: any = {
      id: selectedData.id,
      driverNo: selectedData.driverNo,
      driverfirstName: selectedData.driverfirstName,
      DriverId: selectedData?.id,
      driverMiddleName: selectedData.driverMiddleName,
      driverLastName: selectedData.driverLastName,
      driverContact: selectedData.driverContact,
      driverIdNo: selectedData.driverIdNo,
      driverAddress1: selectedData.driverAddress1,
      driverAddress2: selectedData.driverAddress2,
      // driverRFIDCardNumber: showCardNumber
      //   ? selectedData.driverRFIDCardNumber
      //   : "",
      isAvailable: selectedData.isAvailable,
    };
    if (showCardNumber && !selectedData.driverRFIDCardNumber) {
      toast.error("please Enter RFID Card Number");
    } else {
      try {
        if (session) {
          const newformdata = {
            ...payLoad,
            clientId: session?.clientId,
          };

          const response = await toast.promise(
            postDriverDataByClientId({
              token: session?.accessToken,
              newformdata: newformdata,
            }),
            {
              loading: "Saving data...",
              success: "Data saved successfully!",
              error: "Error saving data. Please try again.",
            },
            {
              style: {
                border: "1px solid #00B56C",
                padding: "16px",
                color: "#1A202C",
              },
              success: {
                duration: 2000,
                iconTheme: {
                  primary: "#00B56C",
                  secondary: "#FFFAEE",
                },
              },
              error: {
                duration: 2000,
                iconTheme: {
                  primary: "#00B56C",
                  secondary: "#FFFAEE",
                },
              },
            }
          );
          let findRfid: any = getRfid.find(
            (item: any) =>
              item?.RFIDCardNo === selectedData?.driverRFIDCardNumber
          );
          const newShowCardNum = !showCardNumber;
          if (
            selectedData?.driverRFIDCardNumber !== previousValue ||
            newShowCardNum
          ) {
            const response2 = await toast.promise(
              AssignRfidtodriver(session?.accessToken, {
                RFIDid: getRfid?.find((i: any) => {
                  return i.RFIDCardNo === selectedData?.driverRFIDCardNumber;
                })._id,
                DriverId: selectedData?.id || singleFormData?.id,
              }),
              {
                loading: "Saving data...",
                success: "Data saved successfully!",
                error: "Error saving data. Please try again.",
              },
              {
                style: {
                  border: "1px solid #00B56C",
                  padding: "16px",
                  color: "#1A202C",
                },
                success: {
                  duration: 2000,
                  iconTheme: {
                    primary: "#00B56C",
                    secondary: "#FFFAEE",
                  },
                },
                error: {
                  duration: 2000,
                  iconTheme: {
                    primary: "#00B56C",
                    secondary: "#FFFAEE",
                  },
                },
              }
            );
            setPreviousValue(selectedData?.driverRFIDCardNumber);
            setShowCardNumber(newShowCardNum);
          }
        }
      } catch (error) {
        console.error("Error fetching zone data:", error);
      }
      vehicleListData();
      RFid();
      setOpenEdit(false);
    }
  };

  const handleDriverSubmit = async (e: any) => {
    e.preventDefault();
    const existingDriver = DriverData.find(
      (driver: any) => driver.driverContact === formData.driverContact
    );
    if (existingDriver) {
      alert("This Driver Number Is Already Exit");
    } else {
      // if (!formData.driverfirstName) {
      //   alert("please Fill The First Name");
      // }

      // if (!formData.driverLastName) {
      //   alert("please Fill The Last Name");
      // }

      // if (!formData.driverNo) {
      //   alert("please Fill The Last Name");
      // }

      setOpen(false);
      if (session) {
        const newformdata: any = {
          ...formData,
          clientId: session?.clientId,
        };

        const response = await toast.promise(
          postDriverDataByClientId({
            token: session?.accessToken,
            newformdata: newformdata,
          }),

          {
            loading: "Saving data...",
            success: "Data saved successfully!",
            error: "Error saving data. Please try again.",
          },
          {
            style: {
              border: "1px solid #00B56C",
              padding: "16px",
              color: "#1A202C",
            },
            success: {
              duration: 2000,
              iconTheme: {
                primary: "#00B56C",
                secondary: "#FFFAEE",
              },
            },
            error: {
              duration: 2000,
              iconTheme: {
                primary: "#00B56C",
                secondary: "#FFFAEE",
              },
            },
          }
        );
        vehicleListData();
        RFid();
      }

      setFormData({
        id: "",
        clientId: "",
        driverNo: "",
        driverfirstName: "",
        driverMiddleName: "",
        driverLastName: "",
        driverContact: "",
        driverIdNo: "",
        driverAddress1: "",
        driverAddress2: "",
        driverRFIDCardNumber: "",
        isAvailable: "",
      });
    }
  };

  const vehicleListData = async () => {
    try {
      if (session) {
        const response = await GetDriverDataByClientId({
          token: session?.accessToken,
          clientId: session?.clientId,
        });
        setDriverData(response.filter((item: any) => item.isDeleted === false));
      }
      
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
  };

  const RFid = async () => {
    try {
      if (session) {
        const response = await GetRfIdByClientId({
          token: session?.accessToken,
          ClientId: session?.clientId,
        });
        setRfid(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching zone data:", error);
    }
  };

  useEffect(() => {
    vehicleListData();
    RFid();
  }, [session]);

  const handleSearch = (event: any) => {
    const newSearchTerm = event.target.value;
    setInputs(newSearchTerm);
  };
  const handleCloseInput = () => {
    setInputs("");
  };
  const handleDelete = async (data: any) => {
    if (data.isAvailable == true) {
      const payLoad: any = {
        id: data.id,
        driverNo: data.driverNo,
        driverfirstName: data.driverfirstName,
        driverMiddleName: data.driverMiddleName,
        driverLastName: data.driverLastName,
        driverContact: data.driverContact,
        driverIdNo: data.driverIdNo,
        driverAddress1: data.driverAddress1,
        driverAddress2: data.driverAddress2,
        driverRFIDCardNumber: data.driverRFIDCardNumber,
        isAvailable: false,
        isDeleted: true,
      };

      try {
        // Show a custom confirmation toast with "OK" and "Cancel" buttons

        const { id }:any = toast.custom((t) => (
          <div className="bg-white p-2 rounded-md">
            <p>Are you sure you want to InActive this Driver?</p>
            <button
              onClick={async () => {
                // Check if the user is authenticated
                if (session) {
                  const newformdata = {
                    ...payLoad,
                    clientId: session?.clientId,
                  };

                  // Send a request to delete the zone
                  const response = await toast.promise(
                    postDriverDataByClientId({
                      token: session?.accessToken,
                      newformdata: newformdata,
                    }),
                    {
                      loading: "Saving data...",
                      success: "User successfully InActive!",
                      error: "Error saving data. Please try again.",
                    },
                    {
                      style: {
                        border: "1px solid #00B56C",
                        padding: "16px",
                        color: "#1A202C",
                      },
                      success: {
                        duration: 2000,
                        iconTheme: {
                          primary: "#00B56C",
                          secondary: "#FFFAEE",
                        },
                      },
                      error: {
                        duration: 2000,
                        iconTheme: {
                          primary: "#00B56C",
                          secondary: "#FFFAEE",
                        },
                      },
                    }
                  );

                  // Refresh vehicle list and RFid data after deletion
                  vehicleListData();
                  RFid();
                }
              }}
              className="text-green pr-5 font-popins font-bold"
            >
              Yes
            </button>
            <button
              onClick={() => {
                // Dismiss the confirmation toast without deleting
                toast.dismiss(id);
                // Optionally, you can show a cancellation message
                toast("Deletion canceled", {
                  duration: 3000,
                  position: "top-center",
                });
              }}
              className="text-red font-popins font-bold"
            >
              No
            </button>
          </div>
        ));
      } catch (error) {
        // Show an error toast
        toast.error("Failed to delete zone", {
          duration: 3000,
          position: "top-center",
        });
        
      }
    } else {
      toast.error("Please Driver Deasign");
    }
  };

  const handleActive = async (data: any) => {
    const { driverRFIDCardNumber } = data;
    delete data.driverRFIDCardNumber;
    const payLoad: any = {
      id: data.id,
      driverNo: data.driverNo,
      driverfirstName: data.driverfirstName,
      driverMiddleName: data.driverMiddleName,
      driverLastName: data.driverLastName,
      driverContact: data.driverContact,
      driverIdNo: data.driverIdNo,
      driverAddress1: data.driverAddress1,
      driverAddress2: data.driverAddress2,
      driverRFIDCardNumber: "",
      isAvailable: data.isAvailable,
      isDeleted: false,
    };
    if (session) {
      const newformdata: any = {
        ...payLoad,
        clientId: session?.clientId,
      };
      await AssignRfidtodriver(session?.accessToken, {
        DriverId: data.data._id,
        RFIDid: driverRFIDCardNumber,
      });
      const response = await toast.promise(
        postDriverDataByClientId({
          token: session?.accessToken,
          newformdata: newformdata,
        }),

        {
          loading: "Saving data...",
          success: "Data saved successfully!",
          error: "Error saving data. Please try again.",
        },
        {
          style: {
            border: "1px solid #00B56C",
            padding: "16px",
            color: "#1A202C",
          },
          success: {
            duration: 2000,
            iconTheme: {
              primary: "#00B56C",
              secondary: "#FFFAEE",
            },
          },
          error: {
            duration: 2000,
            iconTheme: {
              primary: "#00B56C",
              secondary: "#FFFAEE",
            },
          },
        }
      );

      vehicleListData();
      RFid();
    }
    // await vehicleListData();
  };

  // const handleNoEdit = () => {
  //   toast.error("Please Driver UnAssign", {
  //     duration: 3000, // Toast will be shown for 3 seconds
  //   });
  // };

  // const test = 20;
  // const optionsRfid = getRfid
  //   .filter((item: any) => item.DriverId === "")
  //   .map((item: any) => ({
  //     value: item.RFIDCardNo,
  //     label: item.RFIDCardNo,
  //   }));
    if (
      session?.userRole === "Controller" ||
      (session?.userRole == "Admin" && session?.driverProfile === false)
    ) {
      router.push("/signin");
      return null;
    }
  return (
    <div className="main_driver">
      <p className="bg-green px-4 py-1   text-center text-2xl text-white font-bold font-popins drivers_text">
        Driver Profile
      </p>
      <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-12  sm:grid-cols-2  p-4  bg-bgLight drivers_add_popup">
        <div className="xl:col-span-8 lg:col-span-5 md:col-span-5  sm:col-span-2  lg:mb-0  driver_add_new ">
          <button
            onClick={handleOpen}
            className="bg-green px-4 py-1 mr-4  text-white rounded-md font-popins font-bold add_new_driver_btn"
          >
            Add New Driver
          </button>

          <button
            onClick={() => router.push("/ActiveDriver")}
            className="bg-red px-4 py-1 xl:mx-3 lg:mx-3  text-white rounded-md font-popins font-bold md:mt-2"
          >
            InActive Driver List
          </button>
        </div>
        <div
          className="xl:col-span-2 lg:col-span-3 md:col-span-3 sm:col-span-1 text-center total_driver_text"
          // id="hover_bg"
        >
          <h1
            // style={{ fontSize: "19px" }}
            className=" font-popins font-bold xl:text-xl text-green pt-2 text_total_driver"
          >
            Total Active Drivers: {DriverData.length}
          </h1>
        </div>
        <div
          className="xl:col-span-2  lg:col-span-3 md:col-span-3 sm:col-span-1 border-b border-grayLight mb-10  text-center lg:mx-5 search_driver"
          id="hover_bg"
        >
          <div className="grid grid-cols-12">
            <div className="xl:col-span-1 lg:col-span-2 md:col-span-2">
              <svg
                className="h-5  w-5 text-gray mt-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="10" cy="10" r="7" />{" "}
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </div>
            <div className="xl:col-span-10 lg:col-span-9 md:col-span-9 col-span-9">
              <input
                type="text"
                className=" border-none outline-none bg-transparent "
                placeholder="Seacrch"
                onChange={handleSearch}
                value={inputs}
              />
            </div>
            <div
              className="xl:col-span-1 lg:col-span-1 md:col-span-1 cursor-pointer"
              onClick={handleCloseInput}
            >
              <svg
                className="h-5 w-5 text-gray mt-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="popup_style">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="text-black"
            >
              <div className="grid grid-cols-12 bg-green">
                <div className="lg:col-span-11 md:col-span-11 sm:col-span-10 col-span-10">
                  <p className="p-3 text-white w-full font-popins font-bold ">
                    Add Driver
                  </p>
                </div>
                <div className="col-span-1 ms-5" onClick={handleClose}>
                  <svg
                    className="h-6 w-6 text-white mt-3 cursor-pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </Typography>
            <form onSubmit={handleDriverSubmit}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <div className="grid grid-cols-12 mx-2 ">
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2">
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span> First Name
                    </label>
                    <input
                      type="text"
                      value={formData.driverfirstName}
                      className="border border-grayLight w-full outline-green hover:border-green transition duration-700 ease-in-out "
                      onChange={(e: any) =>
                        handleChangeDriver("driverfirstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2">
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span> Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.driverLastName}
                      className="border border-grayLight w-full  outline-green hover:border-green transition duration-700 ease-in-out "
                      onChange={(e: any) =>
                        handleChangeDriver("driverLastName", e.target.value)
                      }
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2">
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span> Driver Contact
                    </label>
                    <input
                      value={formData.driverContact}
                      type="text"
                      className="border border-grayLight w-full  outline-green hover:border-green transition duration-700 ease-in-out "
                      onChange={(e: any) => {
                        const value = e.target.value.match(/\d+/g);
                        if (value) {
                          const numberOnly = value.join("");
                          handleChangeDriver("driverContact", numberOnly);
                        } else {
                          handleChangeDriver("driverContact", "");
                        }
                      }}
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2">
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span> Driver ID
                    </label>
                    <input
                      type="text"
                      value={formData.driverIdNo}
                      className="border border-grayLight w-full outline-green hover:border-green transition duration-700 ease-in-out "
                      onChange={(e: any) => {
                        const value = e.target.value.match(/\d+/g);
                        if (value) {
                          const numericValue = value.join(""); // Join the array into a single string
                          handleChangeDriver("driverIdNo", numericValue);
                        } else {
                          handleChangeDriver("driverIdNo", "");
                        }
                      }}
                      // onChange={(e: any) => {
                      //   handleChangeDriver(
                      //     "driverIdNo",
                      //     e.target.value
                      //   );
                      // }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 m-2  ">
                  <div className="lg:col-span-6 md:col-span-6 col-span-6   mx-2">
                    <label className="text-sm text-black font-popins font-medium">
                      Address
                    </label>
                    <br></br>
                    <textarea
                      value={formData?.driverAddress1}
                      className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-16 "
                      onChange={(e: any) =>
                        handleChangeDriver("driverAddress1", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="lg:col-span-4 md:col-span-4 col-span-6 mx-2 ">
                    <div
                      className="grid grid-cols-12  "
                      // style={{ display: "flex", justifyContent: "start" }}
                    >
                      <div className="lg:col-span-3 col-span-1 w-full ">
                        <label className="text-sm text-black font-popins font-medium "></label>
                        RFID
                        <input
                          type="checkbox"
                          onClick={AddDriverRfid}
                          style={{ accentColor: "green" }}
                          className="border border-green outline-green cursor-pointer ms-2"
                        />
                      </div>
                      {showCardNumber ? (
                        <div
                          className="lg:col-span-12 col-span-12 -mt-2"
                          style={{ width: "100%" }}
                        >
                          <label className="text-sm text-black font-popins font-medium">
                            Card Number
                          </label>
                          <br></br>
                          {/* <input
                          type="text"
                          value={formData.driverRFIDCardNumber}
                          className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                          onChange={(e: any) =>
                            handleChangeDriver("driverRFIDCardNumber", e)
                          }
                        /> */}
                          <Select
                            onChange={(e: any) =>
                              handleChangeDriver(
                                "driverRFIDCardNumber",
                                e.target.value
                              )
                            }
                            value={selectedRFID}
                            style={{ width: "100%" }}
                            className="h-6 w-full  border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-outoutline-none color-gray"
                            displayEmpty
                          >
                            <MenuItem
                              value={
                                formData.driverfirstName ||
                                formData.driverLastName ||
                                formData.driverNo ||
                                formData.driverIdNo ||
                                formData.driverAddress1 ||
                                ""
                              }
                              selected
                              hidden
                              disabled
                            >
                              Select RFID
                            </MenuItem>
                            {getRfid.map(
                              (item: any) =>
                                item.DriverId == "" && (
                                  <MenuItem
                                    key={item?.RFIDCardNo}
                                    value={item?.RFIDCardNo}
                                    className="assign_driver_hover"
                                  >
                                    {item?.RFIDCardNo}
                                  </MenuItem>
                                )
                            )}
                          </Select>
                          {/* <Select
                            onChange={(e: any) =>
                              handleChangeDriver("driverRFIDCardNumber", e)
                            }
                            options={optionsRfid}
                            className="   rounded-md w-full  outline-green border border-grayLight  hover:border-green select_vehicle"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                border: "none",
                                boxShadow: state.isFocused ? null : null,
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected
                                  ? "#00B56C"
                                  : state.isFocused
                                  ? "#e1f0e3"
                                  : "transparent",
                                color: state.isSelected
                                  ? "white"
                                  : state.isFocused
                                  ? "black"
                                  : "black",
                                "&:hover": {
                                  backgroundColor: "#e1f0e3",
                                  color: "black",
                                },
                              }),
                            }}
                          /> */}
                          {/* <button onClick={handleInactiveClick}>
                              Active
                            </button>

                            <div>
                              <h3>Inactive RFIDs:</h3>
                              <ul>
                                {inactiveRFIDs.map((rfid: any) => (
                                  <li key={rfid.RFIDCardNo}>
                                    {rfid?.RFIDCardNo}{" "}
                                    <button
                                      onClick={() => handleActivateClick(rfid)}
                                    >
                                      InActive
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div> */}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-2 md:col-span-2 col-span-4  px-3 lg:-mt-0 md:-mt-0 sm:-mt-0  -mt-8">
                    <button
                      className="bg-green text-white font-bold font-popins  w-full  py-2  rounded-md shadow-md  hover:shadow-gray transition duration-500"
                      type="submit"
                      style={{
                        float: "right",
                        marginTop: "40%",
                        cursor:
                          formData.driverfirstName.trim() === "" ||
                          formData.driverLastName.trim() === "" ||
                          formData.driverContact.trim() === ""
                            ? "not-allowed"
                            : "",
                      }}
                      disabled={
                        formData.driverfirstName.trim() === "" ||
                        formData.driverLastName.trim() === "" ||
                        formData.driverContact.trim() === ""
                          ? true
                          : false
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Typography>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEdit}>
          <Box sx={style} className="popup_style">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="text-black"
            >
              <div className="grid grid-cols-12 bg-green">
                <div className="col-span-11">
                  <p className="p-3 text-white w-full font-popins font-bold">
                    Edit Driver
                  </p>
                </div>
                <div
                  className="col-span-1 ms-5 cursor-pointer"
                  onClick={handleCloseEdit}
                >
                  <svg
                    className="h-6 w-6 text-white mt-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </Typography>
            <form onSubmit={handleDriverEditedSubmit}>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <div
                  className="grid grid-cols-12 m-6 mt-8 gap-1 "
                  // style={{ display: "flex", justifyContent: "center" }}
                >
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2 ">
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span>First Name
                    </label>
                    <input
                      type="text"
                      value={singleFormData.driverfirstName}
                      className="border border-grayLight w-full  outline-green hover:border-green px-2 transition duration-700 ease-in-out "
                      onChange={(e: any) =>
                        handleEditDriver("driverfirstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2 ">
                    {/* <label className="text-sm text-labelColor">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverMiddleName}
                        className="border border-grayLight w-full outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverMiddleName", e)
                        }
                      /> */}
                    <label className="text-sm text-black font-popins font-medium">
                      <span className="text-red">*</span> Last Name
                    </label>
                    <input
                      type="text"
                      value={singleFormData.driverLastName}
                      className="border px-2 border-grayLight w-full  outline-green hover:border-green transition duration-700 ease-in-out "
                      onChange={(e: any) =>
                        handleEditDriver("driverLastName", e.target.value)
                      }
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2 ">
                    <label className="text-sm text-black font-popins font-medium">
                      {/*   <span className="text-red">*</span> */}
                      Contact No
                    </label>
                    <input
                      value={singleFormData.driverContact}
                      type="text"
                      className="border px-2 border-grayLight  w-full outline-green hover:border-green transition duration-700 ease-in-out "
                      // onChange={(e: any) => {
                      //   const value = e.target.value.match(/\d+/g);
                      //   handleEditDriver("driverNo", e);
                      // }}
                      // onChange={(e: any) => {
                      //   const value = e.target.value.match(/\d+/g);
                      //   if (value) {
                      //     const numberOnly = value.join("");
                      //     handleChangeDriver("driverNo", numberOnly);
                      //   } else {
                      //     handleChangeDriver("driverNo", "");
                      //   }
                      // }}

                      onChange={(e: any) => {
                        const value = e.target.value.match(/\d+/g);
                        if (value) {
                          const numberOnly = value.join("");
                          handleEditDriver("driverContact", numberOnly);
                        } else {
                          handleEditDriver("driverContact", "");
                        }
                      }}
                    />
                  </div>
                  <div className="lg:col-span-3 md:col-span-3 col-span-6 mx-2 ">
                    <label className="text-sm text-black font-popins font-medium">
                      {/* <span className="text-red">*</span> */}
                      Driver ID
                    </label>
                    <input
                      type="text"
                      value={singleFormData.driverIdNo}
                      className="border px-2 border-grayLight w-full outline-green hover:border-green transition duration-700 ease-in-out "
                      // onChange={(e: any) => handleEditDriver("driverIdNo", e)}
                      onChange={(e: any) => {
                        const value = e.target.value.match(/\d+/g);
                        if (value) {
                          const numberOnly: any = value.join("");
                          handleEditDriver("driverIdNo", numberOnly);
                        } else {
                          handleEditDriver("driverIdNo", "");
                        }
                      }}
                    />
                  </div>
                </div>

                {/* <div
                    className="grid grid-cols-12 m-6 mt-8 gap-8 "
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Driver Number
                      </label>
                      <input
                        value={singleFormData.driverNo}
                        type="text"
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) => handleEditDriver("driverNo", e)}
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverContact}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) =>
                          handleEditDriver("driverContact", e)
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 col-span-1 ">
                      <label className="text-sm text-labelColor">
                        ID Number
                      </label>
                      <input
                        type="text"
                        value={singleFormData.driverIdNo}
                        className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                        onChange={(e: any) => handleEditDriver("driverIdNo", e)}
                      />
                    </div>
                  </div> */}
                <div className="grid grid-cols-12 m-6 mt-2 gap-4 ">
                  <div className="lg:col-span-6 md:col-span-6 col-span-6   mx-2 ">
                    <label className="text-sm text-black font-popins font-medium">
                      Address
                    </label>
                    <br></br>
                    <textarea
                      value={singleFormData.driverAddress1}
                      className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-16 "
                      onChange={(e: any) =>
                        handleEditDriver("driverAddress1", e.target.value)
                      }
                    ></textarea>
                  </div>

                  {/* <div className="col-span-4">
                      <div
                        className="grid grid-cols-12   gap-4 "
                      >
                        {showCardNumber ? (
                          <div className="lg:col-span-8 col-span-1 ">
                            <label className="text-sm text-labelColor">
                              Card Number
                            </label>
                            <br></br>
                            <input
                              type="text"
                              value={singleFormData.driverRFIDCardNumber}
                              className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                              onChange={(e: any) =>
                                handleEditDriver("driverRFIDCardNumber", e)
                              }
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="lg:col-span-1 col-span-1 ">
                          <label className="text-sm text-labelColor ">
                            RFID
                            <input
                              type="checkbox"
                              onClick={() => setShowCardNumber(!showCardNumber)}
                              style={{ accentColor: "green" }}
                              className="border border-green  outline-green  cursor-pointer  ms-2"
                            />
                          </label>
                        </div>
                      </div>
                    </div> */}
                  <div className="lg:col-span-4 md:col-span-4 col-span-6 mx-2 ">
                    <div
                      className="grid grid-cols-12  "
                      // style={{ display: "flex", justifyContent: "start" }}
                    >
                      <div className="lg:col-span-3 col-span-1 w-full ">
                        <label className="text-sm text-black font-popins font-medium ">
                          RFID
                        </label>
                        <input
                          type="checkbox"
                          onClick={() => setShowCardNumber(!showCardNumber)}
                          style={{ accentColor: "green" }}
                          className="border border-green  outline-green  cursor-pointer  ms-2 "
                          checked={showCardNumber ? true : false}
                        />
                      </div>
                      {showCardNumber ? (
                        <div
                          className="lg:col-span-11 col-span-12 -mt-2"
                          style={{ width: "100%" }}
                        >
                          <label className="text-sm text-black font-popins font-medium">
                            Card Number
                          </label>
                          <br></br>
                          {/* <input
                          type="text"
                          value={formData.driverRFIDCardNumber}
                          className="border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                          onChange={(e: any) =>
                            handleChangeDriver("driverRFIDCardNumber", e)
                          }
                        /> */}
                          {showCardNumber ? (
                            <div className="lg:col-span-8 col-span-1 custom-dropdown">
                              {/* <input
                                  type="text"
                                  value={singleFormData.driverRFIDCardNumber}
                                  className="border px-2 w-full border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out "
                                  onChange={(e: any) =>
                                    handleEditDriver("driverRFIDCardNumber", e)
                                  }
                                /> */}
                              <select
                                value={
                                  singleFormData.driverRFIDCardNumber || "none"
                                }
                                onChange={(e: any) =>
                                  handleEditDriver(
                                    "driverRFIDCardNumber",
                                    e.target.value
                                  )
                                }
                                style={{
                                  width: "100%",
                                  padding: "1%",
                                  borderRadius: "5px",
                                  border: "1px solid lightgray",
                                }}
                                className="h-6 text-black border  w-full  outline-green"
                              >
                                <option
                                  value="none"
                                  className="text-black"
                                  selected
                                  hidden
                                >
                                  {singleFormData.driverRFIDCardNumber}
                                </option>
                                {getRfid.map(
                                  (item: any) =>
                                    item.DriverId === "" && (
                                      <option
                                        key={item?.RFIDCardNo}
                                        value={item?.RFIDCardNo}
                                        className={
                                          "bg-green text-white option-item"
                                        }
                                      >
                                        {item?.RFIDCardNo}
                                      </option>
                                    )
                                )}
                              </select>
                              {/* 
                              <Select
                                value={singleFormData.driverRFIDCardNumber}
                                onChange={(e: any) =>
                                  handleEditDriver(
                                    "driverRFIDCardNumber",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                              >
                                {getRfid.map(
                                  (item: any) =>
                                    item.DriverId === "" && (
                                      <MenuItem
                                        key={item?.RFIDCardNo}
                                        value={item?.RFIDCardNo}
                                        className={
                                          "bg-green text-white option-item w-full"
                                        }
                                      >
                                        {item?.RFIDCardNo}
                                      </MenuItem>
                                    )
                                )}
                              </Select> */}
                              {/* {singleFormData.driverRFIDCardNumber} */}
                              {/* <Select
                                options={optionsRfid}
                                // value={singleFormData.driverRFIDCardNumber}
                                onChange={(e) =>
                                  handleEditDriver("driverRFIDCardNumber", e)
                                }
                                className="rounded-md w-full  outline-green border border-grayLight  hover:border-green select_vehicle"
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    border: "none",
                                    boxShadow: state.isFocused ? null : null,
                                  }),
                                  option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                      ? "#00B56C"
                                      : state.isFocused
                                      ? "#e1f0e3"
                                      : "transparent",
                                    color: state.isSelected
                                      ? "white"
                                      : state.isFocused
                                      ? "black"
                                      : "black",
                                    "&:hover": {
                                      backgroundColor: "#e1f0e3",
                                      color: "black",
                                    },
                                  }),
                                }}
                              /> */}
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <button onClick={handleInactiveClick}>
                              Active
                            </button>

                            <div>
                              <h3>Inactive RFIDs:</h3>
                              <ul>
                                {inactiveRFIDs.map((rfid: any) => (
                                  <li key={rfid.RFIDCardNo}>
                                    {rfid?.RFIDCardNo}{" "}
                                    <button
                                      onClick={() => handleActivateClick(rfid)}
                                    >
                                      InActive
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div> */}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-2 md:col-span-2 col-span-6   lg:-mt-0 md:-mt-0 sm:-mt-0 -mt-8">
                    {/* <label className="text-sm text-labelColor">
                        Address 2
                      </label>
                      <br></br>
                      <textarea
                        value={singleFormData.driverAddress2}
                        className="w-full border border-grayLight  outline-green hover:border-green transition duration-700 ease-in-out h-20 "
                        onChange={(e: any) =>
                          handleEditDriver("driverAddress2", e)
                        }
                      ></textarea> */}
                    <button
                      style={{ float: "right" }}
                      className="bg-green text-white font-popins w-full font-bold lg:mt-12 mt-6  py-2 rounded-md shadow-md  hover:shadow-gray transition duration-500"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Typography>
            </form>
          </Box>
        </Fade>
      </Modal>
      {inactiveRFIDs.map((rfid: any) => (
        <li key={rfid.RFIDCardNo}>
          {rfid?.RFIDCardNo}{" "}
          {/* <button onClick={() => handleActivateClick(rfid)}>InActive</button> */}
        </li>
      ))}
      <TableContainer component={Paper}>
        <div className="table_driver_profile">
          <Table aria-label="custom pagination table">
            <TableHead
              className="sticky top-0 bg-white"
              // style={{ zIndex: "1", backgroundColor: "white" }}
            >
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={2}
                  id="table_head"
                  className="font-popins  font-bold text-black"
                >
                  S.NO
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  First Name
                </TableCell>
                {/* <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Middle Name
                </TableCell> */}
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Last Name
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Driver ID
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Driver Contact
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  RFID Card
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Address
                </TableCell>
                {/* <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Address 2
                </TableCell> */}
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Availaibilty
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black"
                  colSpan={2}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  id="table_head"
                  className="font-popins  font-bold text-black "
                  colSpan={2}
                >
                  Actions
                </TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody className="bg-bgLight cursor-pointer ">
              {result
                .filter((row: any) => row.isDeleted === false)
                ?.map((row: any, index: any) => (
                  <TableRow className="hover:bg-bgHoverTabel text-black">
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {currentPage * rowsPerPages + index + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverfirstName}
                    </TableCell>
                    {/* <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverMiddleName}
                    </TableCell> */}
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverLastName}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverIdNo}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverContact}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverRFIDCardNumber}
                      {/* {inactiveRFIDs
                        .filter((rfid: any) => rfid.driverId === row.id)
                        .map((rfid: any) => (
                          <li key={rfid.RFIDCardNo}>{rfid?.RFIDCardNo}</li>
                        ))} */}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverAddress1}
                    </TableCell>
                    {/* <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.driverAddress2}
                    </TableCell> */}
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.isAvailable === true ? "UnAssign" : "Assign"}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      {row.isDeleted === true ? "InActive" : "Active"}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      className="table_text"
                    >
                      <button
                        className="text-white bg-green p-1 rounded-md shadow-md hover:shadow-gray transition duration-500 "
                        onClick={() => handleEdit(row)}
                      >
                        <BorderColorIcon className="" />
                      </button>
                      {/* {row.isAvailable === false ? (
                        <button
                          className="text-white bg-green p-1 rounded-md shadow-md hover:shadow-gray transition duration-500 "
                          onClick={() => handleEdit(row.id)}
                        >
                          <BorderColorIcon className="" />
                        </button>
                      ) : (
                        <button
                          className="text-white bg-green p-1 rounded-md shadow-md hover:shadow-gray transition duration-500 "
                          onClick={handleNoEdit}
                        >
                          <BorderColorIcon className="" />
                        </button>
                      )}{" "} */}
                      &nbsp;&nbsp;{" "}
                      {/* <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red  text-sm px-2 hover:border-red border-b border-bgLight"
                      >
                        InActive
                      </button> */}
                      {row.isDeleted ? (
                        <button
                          className="text-green hover:border-green border-b border-bgLight"
                          onClick={() => handleActive(row)}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="text-red hover:border-red border-b border-bgLight"
                          onClick={() => handleDelete(row)}
                        >
                          InActive
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]} // Add 11 to the rowsPerPageOptions array
        component="div"
        count={DriverData.length}
        rowsPerPage={rowsPerPages} // Set rows per page to 11
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="bg-bgLight table_pagination"
      />

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
