import React, { useEffect, useState } from "react";
import { navRouter } from "@/homeRouterNav";
import { Tooltip, Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { request } from "@/api/request";
import Store from "@/store/store";
import './NavRouter.less'
export default function NavRouter() {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState<number>(0);
  useEffect(() => {
    request.post("/getMessageAccount").then((res) => {
      setReminder(res.data.data);
    });

    Store.subscribe(() => {
      setReminder(Store.getState().reactReducer.value);
    });
  });
  const showNotiffier = (path: string) => {
    setReminder(0);
    request.post("/showAllMessage").then((res) => {
      navigate(path);
    });
  };
  return (
    <div className="view-option-area">
      {navRouter.map((item) => {
        return (
          <Tooltip placement="right" title={item.pathname}>
            {item.path === "/blog/notification" ? (
              <Badge count={reminder}>
                <i
                  className={`iconfont ${item.icon}`}
                  onClick={() => showNotiffier(item.path)}
                ></i>
              </Badge>
            ):(
              <i
                className={`iconfont ${item.icon}`}
                onClick={() => navigate(item.path)}
              ></i>
            ) }
          </Tooltip>
        );
      })}
    </div>
  );
}
