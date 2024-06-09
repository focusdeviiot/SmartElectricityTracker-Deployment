import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { menuData, MenuItem } from "../../models/menuData";
import { AuthContext } from "../../contexts/AuthContext";
import { Role } from "../../models/role";

const MenuItemComponent: React.FC<{
  item: MenuItem;
  roleUser?: string | null;
}> = ({ item, roleUser }) => {
  // const auth = useContext(AuthContext);
  return (
    <li className="relative">
      {item.children ? (
        <span className="flex px-4 py-2 !cursor-default text-gray-500 hover:!bg-transparent active:!bg-transparent ">
          {item.icon && item.icon}
          {item.title}
        </span>
      ) : (
        <NavLink
          to={"/" + item.path}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "active" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
        >
          {item.icon && item.icon}
          {item.title}
        </NavLink>
      )}
      {item.children && (
        <ul className="pl-4 before:w-[2px]">
          {item.children.map((child: MenuItem) => {
            if (
              !item.isNotShow &&
              (!item.role || item.role?.includes(roleUser as Role))
            ) {
              const newChild = { ...child, path: item.path + "/" + child.path };
              return (
                <MenuItemComponent
                  key={child.path}
                  item={newChild}
                  roleUser={roleUser}
                />
              );
            }
          })}
        </ul>
      )}
    </li>
  );
};

const Navbar: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <nav className="">
      <ul className="space-y-2 bg-">
        {menuData.map(
          (item: MenuItem) =>
            !item.isNotShow &&
            (!item.role || item.role?.includes(auth?.role as Role)) && (
              <MenuItemComponent
                key={item.path}
                item={item}
                roleUser={auth?.role}
              />
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
