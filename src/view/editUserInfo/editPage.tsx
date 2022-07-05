import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./editPage.scss";
type NavItem = {
  name: string;
  path: string;
};
export default function EditPage() {
  let navigate = useNavigate();
  let [activeIndex, setActiveIndex] = useState<number>(0)
  // 左侧nav
  let nav = [
    { name: "个人信息", path: "/dataAdmin/edit/editUserInfo" },
    { name: "账户绑定", path: "/dataAdmin/edit/editUserInfo" }
];
  const selectNavItem = (item: NavItem, index: number) => {
    setActiveIndex(index)
    navigate(item.path);
  };
  return (
    <div className="edit-container">
      <div className="left-nav">
        <ul>
          {nav?.map((item, index) => (
            <li className={activeIndex === index? 'active nav-item' : 'nav-item'} onClick={() => selectNavItem(item, index)}>{item.name}</li>
          ))}
        </ul>
      </div>
      <div className="right-contain">
        <Outlet />
      </div>
    </div>
  );
}
