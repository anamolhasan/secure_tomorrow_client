import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      {/* <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Plant'
        address='add-plant'
      /> */}
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
      {/* <MenuItem icon={MdHomeWork} label="add-blog" address="add-blog" />
      <MenuItem icon={MdHomeWork} label="edit-blog" address="edit-blog" /> */}

      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Blogs"
        address="manage-blogs"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Assigned Customers"
        address="Assigned-customers"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Policy Clearance"
        address="Policy-clearance"
      />
      {/* <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      /> */}
    </>
  );
};

export default SellerMenu;
