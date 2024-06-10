import React, { useEffect, useMemo, useRef, useState } from "react";
import { PAGINATE } from "../../models/pagination";
import PaginatedItems from "../PaginatedItems";
import { BsFillClipboardCheckFill } from "react-icons/bs";

export interface ColumnsTableCustom {
  field: string;
  title: string;
  columns?: {
    colmRender?: (name: string) => JSX.Element;
    className?: string;
  };
  rows?: {
    rowRender?: (row: any, field: string) => JSX.Element;
    onClick?: (e, row: any) => void;
    className?: string;
  };
}

export interface OptionTableCustom {
  placeholder?: string;
  select?: {
    show: boolean;
    field: string; // field ที่จะ validate ว่าเป็น รายการนี้ถูก Select หรือไม่ (แนะนำให้เลือก field ที่ unique)
    importSelectedRows?: any;
    onChange?: (selectedRows: any) => void;
    initialSelectedRows?: any;
    selectRowDisabled?: (row: any) => boolean;
  };
  tableLayout?: "fixed" | "auto";
}

interface TableProps {
  columns: ColumnsTableCustom[];
  data: any;
  paging?: PAGINATE;
  // totalElements?: number;
  hidePagination?: boolean;
  // hover?: boolean;
  onChange?: (page: any) => any;
  option?: OptionTableCustom;
}

const TableCustom: React.FC<TableProps> = ({
  columns,
  data,
  paging,
  // totalElements,
  hidePagination = false,
  // hover = false,
  onChange,
  option,
}) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [selectedRows, setSelectedRows] = useState<any>(
    option?.select?.initialSelectedRows ?? []
  );
  const [paginate, setPaginate] = useState(() => paging);

  function onPageChange(page: PAGINATE) {
    onChange && onChange({ ...paginate, ...page });
  }

  const toggleRowSelection = (row: any) => {
    setSelectedRows((prev: any) => {
      if (
        prev.find((r) => r[option?.select?.field ?? ""] === row[option?.select?.field ?? ""])
      ) {
        return prev.filter(
          (r) => r[option?.select?.field  ?? ""] !== row[option?.select?.field  ?? ""]
        );
      }
      return [...prev, row];
    });
  };

  const selectAllRows = () => {
    if (checkSelectedAllRows) {
      setSelectedRows((prev) =>
        prev.filter(
          (row) =>
            !data.find(
              (r) => r[option?.select?.field  ?? ""] === row[option?.select?.field  ?? ""]
            )
        )
      );
    } else {
      setSelectedRows((prev) => [
        ...prev,
        ...data.filter((row) => {
          const check =
            option?.select?.selectRowDisabled &&
            option.select.selectRowDisabled(row);
          const checkRow = prev.find(
            (r) => r[option?.select?.field  ?? ""] === row[option?.select?.field  ?? ""]
          );
          return !check && !checkRow;
        }),
      ]);
    }
  };

  const checkSelectedAllRows = useMemo(() => {
    if (selectedRows.length === 0) return false;
    if (data.length === 0) return false;
    return data?.every((row) =>
      selectedRows?.find((r) => {
        const check =
          option?.select?.selectRowDisabled &&
          option.select.selectRowDisabled(row);
        const checkRow = r[option?.select?.field  ?? ""] === row[option?.select?.field  ?? ""];
        return check || checkRow;
      })
    );
  }, [selectedRows, data, paging?.pageNumber]);

  const checkSelectedRows = (row: any): boolean => {
    const check = selectedRows?.find(
      (r) => r[option?.select?.field  ?? ""] === row[option?.select?.field  ?? ""]
    );
    return check ?? false;
  };

  // const totalSelectedRows = () => {
  //     return data?.filter((row) => selectedRows.includes(row)).length;
  // };

  const tableLayout = useMemo(() => {
    if (!option?.tableLayout) {
      return "table-auto";
    }

    return option.tableLayout === "fixed" ? "table-fixed" : "table-auto";
  }, [option?.tableLayout]);

  useEffect(() => {
    if (
      option?.select?.importSelectedRows &&
      option?.select?.importSelectedRows.length !== selectedRows?.length
    ) {
      setSelectedRows(option.select.importSelectedRows);
    }
  }, [option?.select?.importSelectedRows]);

  useEffect(() => {
    if (paginate == paging) return;
    setPaginate(paging);
  }, [paging?.pageNumber, paging?.totalPages]);

  // useEffect(() => {
  //     if (paginate == paging) return;
  //     onChange && onChange(paginate);
  // }, [paginate]);

  useEffect(() => {
    option?.select?.onChange && option.select.onChange(selectedRows);
  }, [selectedRows]);

  // useEffect(() => {
  //     if (selectAllRef?.current) {
  //         selectAllRef.current.indeterminate =
  //             selectedRows?.length > 0 && selectedRows?.length < data.length;
  //     }
  // }, [selectedRows, data]);

  return (
    <>
      <div className="overflow-x-auto">
        {selectedRows?.length > 0 && (
          <div className="absolute badge bg-success border-success drop-shadow-md  -top-[9px] left-5 z-50 py-3 text-justify justify-center items-center font-semibold text-xs text-white animate-bounce">
            <BsFillClipboardCheckFill className="w-[17px] h-[17px] mr-1 " />
            {selectedRows?.length < 100 ? selectedRows?.length : "+99"}
          </div>
        )}
        <table className={`table table-sm ${tableLayout}`}>
          <thead className="font-bold bg-base-100 text-gray-300">
            <tr className="bg-base-100">
              {option?.select?.show && (
                <th className="w-10">
                  <input
                    className="checkbox checkbox-sm [--chkbg:theme(colors.success)] [--chkfg:white]"
                    type="checkbox"
                    ref={selectAllRef}
                    onChange={selectAllRows}
                    checked={checkSelectedAllRows}
                    disabled={data.length === 0}
                  />
                </th>
              )}

              {columns?.map((col) => (
                <th key={col.field}>
                  <div className={`${col.columns?.className}`}>
                    {col.columns?.colmRender ? (
                      col.columns?.colmRender(col.title)
                    ) : (
                      <div>{col.title}</div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length === 0
              ? option?.placeholder && (
                  <tr key={"placeholder"}>
                    <td colSpan={columns.length} key={"placeholder"}>
                      <div className="flex justify-center text-sm text-gray-300 py-2 font-medium">
                        {option?.placeholder}
                      </div>
                    </td>
                  </tr>
                )
              : data?.map((row) => (
                  <tr
                    key={row.no}
                    className={` hover:bg-base-200
                                    ${
                                      option?.select?.show &&
                                      (checkSelectedRows(row)
                                        ? "bg-slate-100"
                                        : "")
                                    }
                                    `}
                  >
                    {option?.select?.show && (
                      <td>
                        <input
                          className="checkbox checkbox-sm [--chkbg:theme(colors.success)] [--chkfg:white]"
                          type="checkbox"
                          disabled={
                            option?.select?.selectRowDisabled &&
                            option?.select.selectRowDisabled(row)
                          }
                          checked={checkSelectedRows(row)}
                          onChange={() => toggleRowSelection(row)}
                        />
                      </td>
                    )}
                    {columns?.map((col) => (
                      <td
                        key={`${row.no}-${col.field}`}
                        className={`text-sm font-normal ${
                          col.rows?.className
                        } ${col.rows?.onClick ? "cursor-pointer" : ""}`}
                        onClick={(e) =>
                          col.rows?.onClick && col.rows?.onClick(e, row)
                        }
                      >
                        {col.rows?.rowRender ? (
                          col.rows?.rowRender(row, col.field)
                        ) : (
                          <div>{row[col.field] ? row[col.field] : "-"}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {!hidePagination && data?.length > 0 && (
        <>
          <div className="flex flex-row space-x-4">
            <div className="self-center mr-auto text-sm text-gray-500">
              Show: {paging?.totalElements} items
            </div>
            <div className="self-center">
              <PaginatedItems
                initPage={paginate?.pageNumber}
                itemsPerPage={paginate?.pageSize ?? 10}
                items={paging?.totalElements ?? 0}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TableCustom;
