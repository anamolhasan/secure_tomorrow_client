import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsFillHouseAddFill, BsGraphUp } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
    <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Application'
        address='manage-application'
      />
      <MenuItem icon={BsGraphUp} label="Statistics" address="" />
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Manage Polices"
        address="adminPolicyPage"
      />
      {/* <MenuItem
        icon={FaUserCog}
        label="Manage Polices"
        address="manage-policies"
      /> */}
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
    </>
  );
};

export default AdminMenu;
